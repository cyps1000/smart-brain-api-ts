import request from "supertest";
import faker from "faker";

/**
 * Imports the server
 */
import { app } from "../../../server";

/**
 * Create a user account
 */
const createUserAccount = async () => {
  const requestBody = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };

  const response = await request(app)
    .post("/api/auth/register")
    .send(requestBody)
    .expect(201);

  const { token } = response.body;

  return { token, requestBody, response };
};

it("has a router handler listening for requests", async () => {
  const res = await request(app).get("/api/auth").send({});
  expect(res.status).not.toEqual(404);
});

it("returns 401", async () => {
  const res = await request(app).get("/api/auth").send().expect(401);

  const { msg } = res.body;
  expect(msg.length).toBe(21);
  expect(msg).toBe("Authorization denied.");
});

it("returns 200 and the user's data", async () => {
  const { token } = await createUserAccount();

  await request(app)
    .get("/api/auth")
    .set("x-auth-token", token)
    .send()
    .expect(200);
});
