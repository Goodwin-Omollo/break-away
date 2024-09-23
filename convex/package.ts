import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addPackage = mutation({
  args: {
    name: v.string(),
    imageUrls: v.array(v.string()),
    price: v.number(),
    location: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("individual"), v.literal("corporate")),
    numberOfAdults: v.number(),
    numberOfChildren: v.number(),
  },
  handler: async (ctx, args) => {
    return ctx.db.insert("package", {
      ...args,
    });
  },
});
