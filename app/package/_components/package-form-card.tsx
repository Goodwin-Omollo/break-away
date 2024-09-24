import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { NewPackageDialog } from "./new-package-dialog";

type Props = {};

const PackageFormCard = (props: Props) => {
  return (
    <Card className="max-w-[200px]">
      <CardHeader className="flex flex-row justify-between items-center gap-3">
        <CardTitle>New Package</CardTitle>
        <NewPackageDialog />
      </CardHeader>
    </Card>
  );
};

export default PackageFormCard;
