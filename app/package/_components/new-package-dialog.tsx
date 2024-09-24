"use client";

import { Copy, Loader, Plus, PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

const FormSchema = z.object({
  packageName: z.string().min(2, {
    message: "Package name must be at least 2 characters long",
  }),
});

export function NewPackageDialog() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      packageName: "",
    },
  });
  const router = useRouter();

  const createPackage = useMutation(api.package.addPackage);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const newPackage = await createPackage({
        name: data.packageName,
      });

      toast.success(
        `Module created successfully. Redirecting to module page...`
      );
      router.push(`/package/${newPackage}`);
    } catch (error) {
      toast.error("Failed to create module");
      console.error(error);
    }
  }
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="secondary" size="icon">
                <Plus className="size-6" />
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
