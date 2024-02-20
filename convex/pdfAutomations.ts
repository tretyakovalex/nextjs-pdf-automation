import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { getUserId } from "./util";

export const createPDFAutomation = mutation({
    args: {
        title: v.string(),
        htmlUrl: v.string(),
        cssUrl: v.string(),
    },
    handler: async (ctx, args) => {
        const userId = await getUserId(ctx);

        if (!userId) {
            throw new Error("you must be logged in to create a thumbnail");
        }

        return await ctx.db.insert("pdfautomations", {
            title: args.title,
            userId,
            htmlUrl: args.htmlUrl,
            cssUrl: args.cssUrl,
        });
    }
});

export const getUsersPDFAutomation = query({
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            return [];
        }

        await ctx.db
            .query("pdfautomations")
            .filter(q => q.eq('userId', user.subject))
            .collect();
    }
})