"use client";

import { Copy, Loader, Plus, PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MultiSelect } from "@/components/ui/multi-select";

const FormSchema = z.object({
  packageName: z.string().min(2, {
    message: "Package name must be at least 2 characters long",
  }),
  county: z.array(z.string()),
});

export function NewPackageDialog() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      packageName: "",
    },
  });
  const router = useRouter();
  const [selectedCounties, setSelectedCounties] = useState<string[]>([]);

  const [open, setOpen] = useState(false);
  const createPackage = useMutation(api.package.addPackage);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const newPackage = await createPackage({
        name: data.packageName,
        county: data.county,
      });

      toast.success(
        `Module created successfully. Redirecting to module page...`
      );
      setOpen((prev) => !prev);
      router.push(`/package/${newPackage}`);
    } catch (error) {
      toast.error("Failed to create module");
      console.error(error);
    }
  }
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="secondary" size="icon">
                <Plus className="size-5" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="my-1">Create Package</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Package</DialogTitle>
          <DialogDescription>Create a new package.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-3"
          >
            <FormField
              control={form.control}
              name="packageName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="eg. Diani Package..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This name will be visible to users.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="county"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Package Name</FormLabel>
                  <FormControl>
                    <MultiSelect
                      {...field}
                      options={countiesList}
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={selectedCounties}
                      placeholder="Select county(s)"
                      variant="inverted"
                      animation={2}
                      maxCount={3}
                    />
                  </FormControl>
                  <FormDescription>
                    This name will be visible to users.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:justify-start">
              <DialogClose asChild>
                <Button size="sm" type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
              <Button
                size="sm"
                type="submit"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <Loader className="animate-spin size-4 mx-2" />
                ) : (
                  "Create"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const countiesList = [
  { value: "baringo", label: "Baringo", icon: MapPin },
  { value: "bomet", label: "Bomet", icon: MapPin },
  { value: "bungoma", label: "Bungoma", icon: MapPin },
  { value: "busia", label: "Busia", icon: MapPin },
  { value: "elgeyo-marakwet", label: "Elgeyo-Marakwet", icon: MapPin },
  { value: "embu", label: "Embu", icon: MapPin },
  { value: "garissa", label: "Garissa", icon: MapPin },
  { value: "homa-bay", label: "Homa Bay", icon: MapPin },
  { value: "isiolo", label: "Isiolo", icon: MapPin },
  { value: "kajiado", label: "Kajiado", icon: MapPin },
  { value: "kakamega", label: "Kakamega", icon: MapPin },
  { value: "kericho", label: "Kericho", icon: MapPin },
  { value: "kiambu", label: "Kiambu", icon: MapPin },
  { value: "kilifi", label: "Kilifi", icon: MapPin },
  { value: "kirinyaga", label: "Kirinyaga", icon: MapPin },
  { value: "kisii", label: "Kisii", icon: MapPin },
  { value: "kisumu", label: "Kisumu", icon: MapPin },
  { value: "kitui", label: "Kitui", icon: MapPin },
  { value: "kwale", label: "Kwale", icon: MapPin },
  { value: "laikipia", label: "Laikipia", icon: MapPin },
  { value: "lamu", label: "Lamu", icon: MapPin },
  { value: "machakos", label: "Machakos", icon: MapPin },
  { value: "makueni", label: "Makueni", icon: MapPin },
  { value: "mandera", label: "Mandera", icon: MapPin },
  { value: "marsabit", label: "Marsabit", icon: MapPin },
  { value: "meru", label: "Meru", icon: MapPin },
  { value: "migori", label: "Migori", icon: MapPin },
  { value: "mombasa", label: "Mombasa", icon: MapPin },
  { value: "muranga", label: "Murang'a", icon: MapPin },
  { value: "nairobi", label: "Nairobi", icon: MapPin },
  { value: "nakuru", label: "Nakuru", icon: MapPin },
  { value: "nandi", label: "Nandi", icon: MapPin },
  { value: "narok", label: "Narok", icon: MapPin },
  { value: "nyamira", label: "Nyamira", icon: MapPin },
  { value: "nyandarua", label: "Nyandarua", icon: MapPin },
  { value: "nyeri", label: "Nyeri", icon: MapPin },
  { value: "samburu", label: "Samburu", icon: MapPin },
  { value: "siaya", label: "Siaya", icon: MapPin },
  { value: "taita-taveta", label: "Taita-Taveta", icon: MapPin },
  { value: "tana-river", label: "Tana River", icon: MapPin },
  { value: "tharaka-nithi", label: "Tharaka-Nithi", icon: MapPin },
  { value: "trans-nzoia", label: "Trans-Nzoia", icon: MapPin },
  { value: "turkana", label: "Turkana", icon: MapPin },
  { value: "uasin-gishu", label: "Uasin Gishu", icon: MapPin },
  { value: "vihiga", label: "Vihiga", icon: MapPin },
  { value: "wajir", label: "Wajir", icon: MapPin },
  { value: "west-pokot", label: "West Pokot", icon: MapPin },
];
