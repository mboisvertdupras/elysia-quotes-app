import type { Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}"],
	theme: {
		extend: {},
	},
	plugins: [require("@tailwindcss/forms")],
} satisfies Config;
