import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  package: defineTable({
    name: v.string(),
    imageUrls: v.optional(v.array(v.string())),
    price: v.optional(v.number()),
    location: v.optional(v.string()),
    description: v.optional(v.string()),
    type: v.optional(v.union(v.literal("individual"), v.literal("corporate"))),
    numberOfAdults: v.optional(v.number()),
    numberOfChildren: v.optional(v.number()),
    features: v.optional(
      v.array(
        v.object({
          name: v.string(),
          additionalCharge: v.boolean(),
        })
      )
    ),
  }).index("by_name", ["name"]),
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
  activity: defineTable({
    activityName: v.string(),
    duration: v.number(),
    pricePerPerson: v.number(),
    category: v.union(v.literal("adventure"), v.literal("leisure")),
    description: v.optional(v.string()),
    packageId: v.id("package"),
  }).index("by_activityName", ["activityName"]),
});
