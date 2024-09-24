"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";
import { FileUploader } from "@/components/file-uploader";
import { UploadedFilesCard } from "@/components/uploaded-files-card";
import { useUploadFile } from "@/hooks/use-upload-file";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "lucide-react";

// Schema validation using Zod
// Ensures form input adheres to defined rules such as required fields, types, and value limits
const packageSchema = z.object({
  name: z.string().min(1, "Name is required"), // 'name' must be a non-empty string
  imageUrls: z.array(z.instanceof(File)), // 'imageUrls' must be an array of File objects
  price: z.number().positive("Price must be positive"), // 'price' must be a positive number
  location: z.string().min(1, "Location is required"), // 'location' is a required string
  description: z.string().optional(), // 'description' is an optional string
  type: z.enum(["individual", "corporate"]), // 'type' can only be either "individual" or "corporate"
  numberOfAdults: z
    .number()
    .int()
    .positive("Number of adults must be positive"), // 'numberOfAdults' must be a positive integer
  numberOfChildren: z
    .number()
    .int()
    .nonnegative("Number of children must be non-negative"), // 'numberOfChildren' must be a non-negative integer
});

// Infer the type of the form values based on the schema definition
type PackageFormValues = z.infer<typeof packageSchema>;

export default function AddPackageForm() {
  // Initialize React Hook Form with validation schema and default values
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema), // Use Zod schema for form validation
    defaultValues: {
      name: "",
      imageUrls: [],
      price: 0,
      location: "",
      description: "",
      type: "individual",
      numberOfAdults: 1,
      numberOfChildren: 0,
    },
  });

  // Convex mutation hook to call an API function to add the package
  const addPackage = useMutation(api.package.addPackage);

  // Destructure the required values from the custom hook for file uploading
  const { progresses, uploadedFiles } = useUploadFile("packageImage", {
    defaultUploadedFiles: [],
  });

  // Initialize the file uploading process with Uploadthing
  const { startUpload, isUploading } = useUploadThing("packageImage");
  // Handle form submission
  // This function handles both image uploads and package data submission
  async function onSubmit(data: PackageFormValues) {
    try {
      // Display a loading toast to the user while images are being uploaded
      await toast.promise(
        // Start uploading the selected files
        startUpload(data.imageUrls).then(async (res) => {
          // Map over the upload response to extract URLs of uploaded images
          const urls = res?.map((re) => re.url);

          // Check if URLs were successfully retrieved from the upload response
          if (urls) {
            // Call the `addPackage` mutation to save the package details
            await addPackage({
              description: data.description, // Package description (optional)
              type: data.type, // Package type (individual or corporate)
              price: data.price, // Price of the package
              location: data.location, // Location of the package
              numberOfAdults: data.numberOfAdults, // Number of adults for the package
              name: data.name, // Name of the package
              numberOfChildren: data.numberOfChildren, // Number of children for the package
              imageUrls: urls, // Uploaded image URLs
            });
          } else {
            throw new Error("No URLs returned from the upload process."); // Handle case where no URLs are returned
          }
        }),
        {
          loading: "Uploading Images then adding package", // Message to show during the process
          success: "Images uploaded, then package added", // Message on success
          error: "Something went wrong", // Message on error
        }
      );
    } catch (error) {
      console.error("Error in onSubmit:", error); // Log the error for debugging
      toast.error("An unexpected error occurred. Please try again."); // Display a user-friendly error message
    }
  }

  // JSX to render the form and its fields
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)} // Handles form submission and validation
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Package Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter package name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload Field */}
        <div className="">
          <FormField
            control={form.control}
            name="imageUrls"
            render={({ field }) => (
              <div className="space-y-6">
                <FormItem className="w-full">
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <FileUploader
                      value={field.value} // Selected files are stored in form state
                      onValueChange={field.onChange} // Update form state when file selection changes
                      maxFiles={7} // Maximum number of files to upload
                      maxSize={4 * 1024 * 1024} // Max file size set to 4MB
                      progresses={progresses} // Pass in the progress state to show progress bars
                      disabled={isUploading} // Disable the uploader when files are uploading
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>

                {/* Display uploaded images after successful upload */}
                {uploadedFiles.length > 0 ? (
                  <UploadedFilesCard uploadedFiles={uploadedFiles} />
                ) : null}
              </div>
            )}
          />
        </div>

        {/* Package Price Field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))} // Convert input value to float
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Package Location Field */}
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Package Description Field */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Package Type (Radio Group) */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="individual" />
                    </FormControl>
                    <FormLabel className="font-normal">Individual</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="corporate" />
                    </FormControl>
                    <FormLabel className="font-normal">Corporate</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Number of Adults Field */}
        <FormField
          control={form.control}
          name="numberOfAdults"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Adults</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))} // Convert input to integer
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Number of Children Field */}
        <FormField
          control={form.control}
          name="numberOfChildren"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Children</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))} // Convert input to integer
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end items-center lg:col-span-2">
          <Button
            disabled={isUploading || form.formState.isSubmitting}
            type="submit"
            size="sm"
          >
            {isUploading || form.formState.isSubmitting ? (
              <Loader className="animate-spin h-4 w-4" />
            ) : (
              "Add Package"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
