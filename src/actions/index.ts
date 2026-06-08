// src/actions/index.ts
import { defineAction } from "astro:actions";
import { z } from "astro:schema";

export const server = {
  shorten: defineAction({
    // Validasi input dari frontend pake Zod (bawaan Astro)
    input: z.object({
      url: z.string().url(),
    }),
    handler: async (input) => {
      try {
        const response = await fetch("https://cleanuri.com/api/v1/shorten", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ url: input.url }),
        });

        if (!response.ok) {
          throw new Error("CleanURI API returned an error");
        }

        const data = await response.json();
        console.log(data)
        return {
          success: true,
          result_url: data.result_url,
        };
      } catch (error: any) {
        return {
          success: false,
          error: error.message || "Failed to shorten URL",
        };
      }
    },
  }),
};
