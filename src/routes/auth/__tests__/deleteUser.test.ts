import request from "supertest";

/**
 * Imports the server
 */
import { app } from "../../../server";

it("has a router handler listening for requests", async () => {
  const res = await request(app).delete("/api/users").send({});
  expect(res.status).not.toEqual(404);
});
