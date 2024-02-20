import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  pdfautomations: defineTable({
    title: v.string(),
    cssUrl: v.string(),
    htmlUrl: v.string(),
  }),
});