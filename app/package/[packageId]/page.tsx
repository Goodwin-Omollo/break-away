import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import React from "react";
import AddPackageForm from "../_components/package-form";
import { redirect } from "next/navigation";

type Props = {
  params: {
    packageId: Id<"package">;
  };
};

export default async function SinglePackage({ params }: Props) {
  const singlePackage = await fetchQuery(api.package.getPackage, {
    packageId: params.packageId,
  });

  if (!singlePackage) redirect("/");

  return (
    <div className="mx-4 lg:max-w-7xl lg:mx-auto min-h-screen grid grid-cols-1 p-8">
      <AddPackageForm singlePackage={singlePackage} />
    </div>
  );
}
