import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  package: defineTable({
    name: v.string(),
    imageUrls: v.array(v.string()),
    price: v.number(),
    location: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("individual"), v.literal("corporate")),
    numberOfAdults: v.number(),
    numberOfChildren: v.number(),
  }),
  reviews: defineTable({
    rating: v.float64(),
    experience: v.string(),
    packageId: v.id("package"),
  }),
  inclusions: defineTable({
    days: v.number(),
    nights: v.number(),
    flightTicket: v.boolean(),
    trainTicket: v.boolean(),
    bedAndBreakfast: v.boolean(),
    tourGuide: v.boolean(),
    packageId: v.id("package"),
  }),
});
