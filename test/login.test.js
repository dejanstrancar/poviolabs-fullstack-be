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

let requestCall = "";

describe("/POST login", () => {
  before(async () => {
    const resSignup = await request(app)
      .post("/signup")
      .send(user);

    resSignup.should.have.status(200);
    userId = resSignup.body.userId;
    requestCall = "/login";

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

  it("it should login and receive token", async () => {
    const res = await request(app)
      .post(requestCall)
      .send(user);

    res.should.have.status(200);
    res.body.should.be.a("object");
    res.body.should.have.property("token").includes("Bearer ");
  });

  it("it should deny access because of empty request", async () => {
    const res = await request(app)
      .post(requestCall)
      .send({});

    res.should.have.status(422);
    res.body.should.be.a("object");
    res.body.should.have.property("status").eq("failed");
    res.body.should.have.property("error");
    res.body.error.should.have.property("details");
    res.body.error.details[0].should.have.property("type").eq("any.required");
  });

  it("it should deny access because of empty username", async () => {
    const res = await request(app)
      .post(requestCall)
      .send({ ...user, username: "" });

    res.should.have.status(422);
    res.body.should.be.a("object");
    res.body.should.have.property("status").eq("failed");
    res.body.should.have.property("error");
    res.body.error.should.have.property("details");
    res.body.error.details[0].should.have.property("type").eq("any.empty");
  });

  it("it should deny access because of empty password", async () => {
    const res = await request(app)
      .post(requestCall)
      .send({ ...user, password: "" });

    res.should.have.status(422);
    res.body.should.be.a("object");
    res.body.should.have.property("status").eq("failed");
    res.body.should.have.property("error");
    res.body.error.should.have.property("details");
    res.body.error.details[0].should.have.property("type").eq("any.empty");
  });

  it("it should deny access because of wrong username", async () => {
    const res = await request(app)
      .post(requestCall)
      .send({ ...user, username: "1" });

    res.should.have.status(422);
    res.body.should.be.a("object");
    res.body.should.have.property("error").eq("No Account Found");
  });

  it("it should deny access because of short password", async () => {
    const res = await request(app)
      .post(requestCall)
      .send({ ...user, password: "1" });

    res.should.have.status(422);
    res.body.should.be.a("object");
    res.body.should.have.property("status").eq("failed");
    res.body.should.have.property("error");
    res.body.error.should.have.property("details");
    res.body.error.details[0].should.have.property("type").eq("string.min");
  });

  it("it should deny access because of wrong password", async () => {
    const res = await request(app)
      .post(requestCall)
      .send({ ...user, password: "asdsadadsada" });

    res.should.have.status(422);
    res.body.should.be.a("object");
    res.body.should.have.property("error").eq("Password does not match");
  });
});
