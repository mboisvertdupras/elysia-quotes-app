import { html } from "@elysiajs/html";
import { createElysia } from "../src/util/elysia";
import { home } from "./routes/home";

export const app = createElysia()
	.onError(({ code, error }) => {
		console.log(code, error);
	})
	.use(html())
	.use(home);
