"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const FormSchema = z.object({
  flightTicket: z.boolean(),
  trainTicket: z.boolean(),
  days: z.number().positive("Days must be positive number").min(1, {
    message: "Minimum of 1 day",
  }),
  nights: z.number().positive("Nights must be positive number"),
  bedAndBreakfast: z.boolean(),
  tourGuide: z.boolean(),
});

type Props = {
  packageId: Id<"package">;
  inclusion: Doc<"inclusions"> | null;
};

export default function InclusionsSheet({ packageId, inclusion }: Props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      flightTicket: inclusion ? inclusion.flightTicket : false,
      trainTicket: inclusion ? inclusion.trainTicket : false,
      days: inclusion ? inclusion.days : 0,
      nights: inclusion ? inclusion.nights : 0,
      bedAndBreakfast: inclusion ? inclusion.bedAndBreakfast : false,
      tourGuide: inclusion ? inclusion.tourGuide : false,
    },
  });
  const [open, setOpen] = useState(false);

  const createInclusion = useMutation(api.inclusion.addInclusion);
  const updateInclusion = useMutation(api.inclusion.updateInclusion);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (inclusion) {
        await updateInclusion({
          ...data,
          packageId,
        });
        toast.info("Inclusion updated successfully");
        if (form.formState.isSubmitSuccessful) return setOpen((prev) => !prev);
      } else {
        await createInclusion({
          ...data,
          packageId,
        });
        toast.success("Inclusion added successfully");
        if (form.formState.isSubmitSuccessful) return setOpen((prev) => !prev);
      }
    } catch (error) {
      console.error("Error during inclusion operation:", error);
      toast.error("An error occurred. Please try again later.");
      setOpen((prev) => !prev);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Add Inclusion</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add New Inclusion</SheetTitle>
          <SheetDescription>
            Add a new inclusion to your travel package. Click save when you're
            done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="days"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Days</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          defaultValue={inclusion ? inclusion.days : 0}
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nights</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          onChange={(e) =>
                            field.onChange(parseInt(e.target.value))
                          }
                          defaultValue={inclusion ? inclusion.nights : 0}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="bedAndBreakfast"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Bed & Breakfast</FormLabel>
                        <FormDescription>
                          Receive emails about your account security.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="trainTicket"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Train Ticket</FormLabel>
                        <FormDescription>
                          Receive emails about your account security.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="flightTicket"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Flight Ticket</FormLabel>
                        <FormDescription>
                          Receive emails about your account security.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tourGuide"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Tour Guide</FormLabel>
                        <FormDescription>
                          Receive emails about your account security.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-readonly
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <SheetFooter>
              <SheetClose asChild>
                <Button disabled={form.formState.isSubmitting} type="submit">
                  {form.formState.isSubmitting ? (
                    <Loader className="h-4 w-4 animate-spin" />
                  ) : (
                    "Save"
                  )}
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
