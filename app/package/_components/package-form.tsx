"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

const packageSchema = z.object({
  name: z.string().min(1, "Name is required"),
  imageUrls: z.array(z.instanceof(File)),
  price: z.number().positive("Price must be positive"),
  location: z.string().min(1, "Location is required"),
  description: z.string().optional(),
  type: z.enum(["individual", "corporate"]),
  numberOfAdults: z
    .number()
    .int()
    .positive("Number of adults must be positive"),
  numberOfChildren: z
    .number()
    .int()
    .nonnegative("Number of children must be non-negative"),
});

type PackageFormValues = z.infer<typeof packageSchema>;

export default function AddPackageForm() {
  const form = useForm<PackageFormValues>({
    resolver: zodResolver(packageSchema),
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
  const [localImageUrls, setLocalImageUrls] = useState<string[]>([]);

  const addPackage = useMutation(api.package.addPackage);

  const { progresses, uploadedFiles } = useUploadFile("packageImage", {
    defaultUploadedFiles: [],
  });

  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "imageUrls",
  // });

  const { startUpload, isUploading } = useUploadThing("packageImage", {
    onClientUploadComplete: (res) => {
      console.log("Res", res);
      const urls = res.map((res) => res.url);
      setLocalImageUrls(urls);

      toast.success("Document uploaded successfully");
    },
    onUploadError: () => {
      toast.error("Failed to upload image");
    },
    onUploadBegin: (file) => {
      console.log("Upload has begun for image", file);
    },
  });

  async function onSubmit(data: PackageFormValues) {
    console.log(data);

    if (localImageUrls.length > 0) {
      await addPackage({
        description: data.description,
        type: data.type,
        price: data.price,
        location: data.location,
        numberOfAdults: data.numberOfAdults,
        name: data.name,
        numberOfChildren: data.numberOfChildren,
        imageUrls: localImageUrls,
      });

      console.log("urls", localImageUrls);
      toast.success("Added package successfully");
      setLocalImageUrls([]);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
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
                      value={field.value}
                      onValueChange={field.onChange}
                      maxFiles={7}
                      maxSize={4 * 1024 * 1024}
                      progresses={progresses}
                      // pass the onUpload function here for direct upload
                      // onUpload={uploadFiles}
                      disabled={isUploading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {uploadedFiles.length > 0 ? (
                  <UploadedFilesCard uploadedFiles={uploadedFiles} />
                ) : null}
              </div>
            )}
          />
        </div>

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
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center lg:col-span-2">
          <Button disabled={isUploading} type="submit" size="sm">
            {isUploading ? "submiting" : "Add Package"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
