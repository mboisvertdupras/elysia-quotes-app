import staticPlugin from "@elysiajs/static";
import { app } from "../app";
import { createElysia } from "./util/elysia";
import { ip } from "elysia-ip";

const server = createElysia().use(ip()).use(staticPlugin()).use(app);

server.listen(3000);
