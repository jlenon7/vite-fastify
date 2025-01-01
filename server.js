import Fastify from "fastify";
import FastifyVite from "@fastify/vite";

import { Edge } from "edge.js";
import { Path } from "@athenna/common";

const fastify = Fastify();

const edge = new Edge({ cache: false });
edge.mount(Path.pwd("resources/views"));

await fastify.register(FastifyVite, {
  clientModule: "resources/js/app.js",
  dev: process.argv.includes("--dev"),
  root: Path.pwd(),
});

fastify.get("/", async (req, reply) => {
  const html = await edge.render("index", { title: "My App" });
  return reply.type("text/html").send(html);
});

await fastify.vite.ready();

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log("Server running at http://localhost:3000/");
});
