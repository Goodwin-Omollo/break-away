import React from "react";
import AddPackageForm from "./_components/package-form";

type Props = {};

const PackageHome = (props: Props) => {
  return (
    <div className="mx-4 lg:max-w-7xl lg:mx-auto min-h-screen grid grid-cols-1 p-8">
      <AddPackageForm />
    </div>
  );
};

export default PackageHome;
