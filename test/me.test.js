process.env.NODE_ENV = "test";

const User = require("../models/User");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
chai.use(chaiHttp);
const should = chai.should();
const request = chai.request;

const user = {
  username: "testTest",
  password: "testtest"
};

let userId = null;

describe("/GET me", () => {
  before(async () => {
    const resSignup = await request(app)
      .post("/signup")
      .send(user);

    resSignup.should.have.status(200);
    userId = resSignup.body.userId;
    const res = await request(app)
      .post("/login")
      .send(user);

    res.should.have.status(200);
    token = res.body.token;
  });

  after(async () => {
    console.log("Removing...");
    await User.deleteMany({});
  });

  describe("GET /me", () => {
    before(() => {
      requestCall = "/me";
    });

    it("it should deny access if no token", async () => {
      const res = await request(app).get(requestCall);
      res.should.have.status(401);
      console.log(requestCall);
    });

    it("it should deny access if wrong token", async () => {
      const res = await request(app)
        .get(requestCall)
        .set("Authorization", "1234");
      res.should.have.status(401);
    });

    it("it should response user data", async () => {
      const res = await request(app)
        .get(requestCall)
        .set("Authorization", token);
      res.should.have.status(200);

      res.body.should.have.property("success").eq("true");
      res.body.should.have.property("user");
      res.body.user.should.have.property("username").eq(user.username);
    });
  });

  describe("POST /me/update-password", () => {
    before(() => {
      requestCall = "/me/update-password";
    });

    it("it should deny access if no token", async () => {
      const res = await request(app)
        .post(requestCall)
        .send(user);
      res.should.have.status(401);
    });

    it("it should deny access if wrong token", async () => {
      const res = await request(app)
        .post(requestCall)
        .set("Authorization", "1234")
        .send(user);
      res.should.have.status(401);
    });

    it("it should fail because of required params", async () => {
      const res = await request(app)
        .post(requestCall)
        .set("Authorization", token)
        .send("");
      res.should.have.status(422);
      res.body.should.be.a("object");
      res.body.should.have.property("status").eq("failed");
      res.body.should.have.property("error");
      res.body.error.should.have.property("details");
      res.body.error.details[0].should.have.property("type").eq("any.required");
    });

    it("it should fail because of empty password", async () => {
      const res = await request(app)
        .post(requestCall)
        .set("Authorization", token)
        .send({ password: "" });
      res.should.have.status(422);
      res.body.should.be.a("object");
      res.body.should.have.property("status").eq("failed");
      res.body.should.have.property("error");
      res.body.error.should.have.property("details");
      res.body.error.details[0].should.have.property("type").eq("any.empty");
    });

    it("it should fail because of short password", async () => {
      const res = await request(app)
        .post(requestCall)
        .set("Authorization", token)
        .send({ password: "test" });
      res.should.have.status(422);
      res.body.should.be.a("object");
      res.body.should.have.property("status").eq("failed");
      res.body.should.have.property("error");
      res.body.error.should.have.property("details");
      res.body.error.details[0].should.have.property("type").eq("string.min");
    });

    it("it should update password", async () => {
      const res = await request(app)
        .post(requestCall)
        .set("Authorization", token)
        .send({ password: "changedPassword" });
      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("success").includes("true");
      res.body.should.have.property("message").includes("Password updated.");
    });

    it("it should login with new password", async () => {
      const res = await request(app)
        .post("/login")
        .send({ ...user, password: "changedPassword" });

      res.should.have.status(200);
      res.body.should.be.a("object");
      res.body.should.have.property("token").includes("Bearer ");
    });
  });
});
