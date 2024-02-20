import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPDFAutomation = mutation({
    args: {
        title: v.string(),
        htmlUrl: v.string(),
        cssUrl: v.string(),
    },
    handler: async (ctx, args) => {

        return await ctx.db.insert("pdfautomations", {
            title: args.title,
            htmlUrl: args.htmlUrl,
            cssUrl: args.cssUrl,
        });
    }
});

export const getUsersPDFAutomation = query({
    handler: async (ctx) => {
        return ctx.db.query("pdfautomations").collect();
    }
})