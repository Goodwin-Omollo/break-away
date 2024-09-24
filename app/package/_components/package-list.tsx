"use client";

import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import React from "react";

type Props = {
  preloadedPackages: Preloaded<typeof api.package.getAllPackages>;
};

const PackageList = (props: Props) => {
  const packages = usePreloadedQuery(props.preloadedPackages);

  return (
    <div>
      {packages.length > 0 &&
        packages.map((pk) => (
          <div key={pk._id} className="">
            <h3>{pk.name}</h3>
          </div>
        ))}
    </div>
  );
};

export default PackageList;
