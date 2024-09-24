import React from "react";
import AddPackageForm from "./_components/package-form";
import PackageList from "./_components/package-list";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import PackageFormCard from "./_components/package-form-card";

type Props = {};

const PackageHome = async (props: Props) => {
  const preloadPackages = await preloadQuery(api.package.getAllPackages);
  return (
    <div className="">
      <h1 className="">Packages</h1>
      <PackageFormCard />
      <PackageList preloadedPackages={preloadPackages} />
    </div>
  );
};

export default PackageHome;

//  <div className="mx-4 lg:max-w-7xl lg:mx-auto min-h-screen grid grid-cols-1 p-8">
//       <AddPackageForm />
//     </div>
