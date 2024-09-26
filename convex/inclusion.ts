import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const getInclusion = query({
  args: {
    packageId: v.id("package"),
  },
  async handler(ctx, args) {
    const inclusion = await ctx.db
      .query("inclusions")
      .withIndex("by_PackageId", (q) => q.eq("packageId", args.packageId))
      .first();
    return inclusion;
  },
});

export const addInclusion = mutation({
  args: {
    days: v.number(),
    nights: v.number(),
    flightTicket: v.boolean(),
    trainTicket: v.boolean(),
    bedAndBreakfast: v.boolean(),
    tourGuide: v.boolean(),
    packageId: v.id("package"),
  },
  async handler(ctx, args) {
    const inclusion = await ctx.db
      .query("inclusions")
      .withIndex("by_PackageId", (q) => q.eq("packageId", args.packageId))
      .first();

    if (inclusion) {
      throw new ConvexError("Inclusion already exists");
    }

    return await ctx.db.insert("inclusions", {
      ...args,
    });
  },
});

export const updateInclusion = mutation({
  args: {
    days: v.optional(v.number()),
    nights: v.optional(v.number()),
    flightTicket: v.optional(v.boolean()),
    trainTicket: v.optional(v.boolean()),
    bedAndBreakfast: v.optional(v.boolean()),
    tourGuide: v.optional(v.boolean()),
    packageId: v.id("package"),
  },
  async handler(ctx, args) {
    const inclusion = await ctx.db
      .query("inclusions")
      .withIndex("by_PackageId", (q) => q.eq("packageId", args.packageId))
      .first();

    if (!inclusion) {
      throw new ConvexError("Inclusion not found");
    }

    return await ctx.db.patch(inclusion._id, {
      days: args.days,
      nights: args.nights,
      flightTicket: args.flightTicket,
      trainTicket: args.trainTicket,
      bedAndBreakfast: args.bedAndBreakfast,
      tourGuide: args.tourGuide,
    });
  },
});
