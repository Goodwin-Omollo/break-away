import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

/**
 * Adds a new package to the database.
 *
 * @param name - The name of the package (required).
 * @param imageUrls - An array of image URLs (optional).
 * @param price - The price of the package (optional).
 * @param location - The location of the package (optional).
 * @param description - A description of the package (optional).
 * @param type - The type of the package: "individual" or "corporate" (optional).
 * @param numberOfAdults - Number of adults included in the package (optional).
 * @param numberOfChildren - Number of children included in the package (optional).
 * @param features - An array of features associated with the package, each with a name and an optional additional charge (optional).
 *
 * @returns The inserted package document.
 */
export const addPackage = mutation({
  args: {
    name: v.string(),
    imageUrls: v.optional(v.array(v.string())),
    price: v.optional(v.number()),
    location: v.optional(v.string()),
    description: v.optional(v.string()),
    type: v.optional(v.union(v.literal("individual"), v.literal("corporate"))),
    numberOfAdults: v.optional(v.number()),
    numberOfChildren: v.optional(v.number()),
    county: v.optional(v.array(v.string())),
    features: v.optional(
      v.array(
        v.object({
          name: v.string(),
          additionalCharge: v.boolean(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("package", {
      ...args,
    });
  },
});

/**
 * Fetches all packages from the database.
 *
 * @returns An array of all package documents.
 */
export const getAllPackages = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("package").collect();
  },
});

/**
 * Fetches a single package based on its ID.
 *
 * @param packageId - The ID of the package to fetch.
 *
 * @returns The package document if found.
 * @throws ConvexError if the package is not found.
 */
export const getPackage = query({
  args: {
    packageId: v.id("package"),
  },
  handler: async (ctx, args) => {
    const pk = await ctx.db.get(args.packageId);

    if (!pk) {
      throw new ConvexError("No package found");
    }

    return pk;
  },
});

/**
 * Updates an existing package based on its ID.
 *
 * @param packageId - The ID of the package to update.
 * @param name - New name for the package (optional).
 * @param imageUrls - New array of image URLs (optional).
 * @param price - New price (optional).
 * @param location - New location (optional).
 * @param description - New description (optional).
 * @param type - New package type: "individual" or "corporate" (optional).
 * @param numberOfAdults - Updated number of adults (optional).
 * @param numberOfChildren - Updated number of children (optional).
 * @param features - Updated array of features (optional).
 *
 * @returns The updated package document.
 * @throws Error if the package is not found.
 */
export const updatePackage = mutation({
  args: {
    packageId: v.id("package"),
    name: v.optional(v.string()),
    imageUrls: v.optional(v.array(v.string())),
    price: v.optional(v.number()),
    location: v.optional(v.string()),
    description: v.optional(v.string()),
    type: v.optional(v.union(v.literal("individual"), v.literal("corporate"))),
    numberOfAdults: v.optional(v.number()),
    numberOfChildren: v.optional(v.number()),
    county: v.optional(v.array(v.string())),
    features: v.optional(
      v.array(
        v.object({
          name: v.string(),
          additionalCharge: v.boolean(),
        })
      )
    ),
  },
  handler: async (ctx, args) => {
    const { packageId, ...fieldsToUpdate } = args;

    // Check if the package exists
    const packageExists = await ctx.db.get(packageId);
    if (!packageExists) {
      throw new Error("Package not found");
    }

    // Update the package
    return ctx.db.patch(packageId, { ...fieldsToUpdate });
  },
});

/**
 * Deletes a package from the database.
 *
 * @param packageId - The ID of the package to delete.
 *
 * @returns The deletion result.
 * @throws Error if the package is not found.
 */
export const deletePackage = mutation({
  args: {
    packageId: v.id("package"),
  },
  handler: async (ctx, args) => {
    const { packageId } = args;

    // Check if the package exists
    const packageExists = await ctx.db.get(packageId);
    if (!packageExists) {
      throw new Error("Package not found");
    }

    // Delete the package
    return await ctx.db.delete(packageId);
  },
});
