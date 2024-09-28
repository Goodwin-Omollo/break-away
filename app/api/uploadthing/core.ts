import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

// Initialize Uploadthing
const f = createUploadthing();

// Define FileRouter
export const ourFileRouter = {
  packageImage: f({
    image: { maxFileSize: "128MB", maxFileCount: 7 },
  })
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) throw new Error("Unauthorized");
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(`File URL: ${file.url}, Uploaded by: ${metadata.userId}`);
      return {
        url: file.url,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
