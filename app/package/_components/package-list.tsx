"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Preloaded, usePreloadedQuery } from "convex/react";
import Image from "next/image";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

type Props = {
  preloadedPackages: Preloaded<typeof api.package.getAllPackages>;
};

const placeholderImage = "/placeholder.jpg"; // Set your placeholder image path

const PackageList = (props: Props) => {
  const packages = usePreloadedQuery(props.preloadedPackages);

  return (
    <div className="grid lg:grid-cols-3 gap-4 max-w-7xl">
      {packages.length > 0 &&
        packages.map((pk) => (
          <Card key={pk._id} className="shadow-sm p-4">
            <CardHeader className="p-0 m-4">
              {pk.imageUrls && pk.imageUrls.length > 0 ? (
                <Carousel opts={{ loop: true }} className="relative">
                  <CarouselContent>
                    {pk.imageUrls.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative aspect-square w-full h-full rounded-2xl overflow-hidden">
                          <Image
                            src={image}
                            alt="Package image"
                            className="object-cover w-full h-full rounded-2xl overflow-hidden shadow-2xl cursor-pointer hover:scale-105 duration-300"
                            fill
                            loading="lazy"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="flex space-x-2 items-center absolute -bottom-2 left-1/2">
                    <CarouselPrevious />
                    <CarouselNext />
                  </div>
                </Carousel>
              ) : (
                <div className="relative aspect-square w-full h-full rounded-2xl overflow-hidden">
                  <Image
                    src={placeholderImage}
                    alt="Placeholder image"
                    className="object-cover w-full h-full rounded-2xl overflow-hidden shadow-2xl"
                    fill
                  />
                </div>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <CardTitle>{pk.name}</CardTitle>
                {pk.type ? (
                  <Badge className="capitalize">{pk.type}</Badge>
                ) : (
                  <Badge variant="secondary">No Type</Badge>
                )}
              </div>
              <div className="">
                <CardDescription>{pk.description}</CardDescription>
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default PackageList;
