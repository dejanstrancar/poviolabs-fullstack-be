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

describe("/POST signup", () => {
  before(() => {
    requestCall = "/signup";
  });
  beforeEach(async () => {
    console.log("Removing...");
    await User.deleteMany({});
  });

  after(async () => {
    console.log("Removing...");
    await User.deleteMany({});
  });

  it("it should save a new user, return id and login succesfully", async () => {
    const res = await request(app)
      .post(requestCall)
      .send(user);

    res.should.have.status(200);
    res.body.should.be.a("object");

    const res2 = await request(app)
      .post("/login")
      .send(user);

    res2.should.have.status(200);
    res2.body.should.be.a("object");
    res2.body.should.have.property("token").includes("Bearer ");
  });

  it("it should complain about short password", async () => {
    const res = await request(app)
      .post(requestCall)
      .send({
        ...user,
        password: "test"
      });

    res.should.have.status(422);
    res.body.should.be.a("object");
    res.body.should.have.property("status").eq("failed");
    res.body.should.have.property("error");
    res.body.error.should.have.property("details");
    res.body.error.details[0].should.have.property("type").eq("string.min");
  });

  it("it should complain about existing user", async () => {
    const res = await request(app)
      .post(requestCall)
      .send(user);

    res.should.have.status(200);
    res.body.should.be.a("object");

    const res2 = await request(app)
      .post(requestCall)
      .send(user);

    res2.should.have.status(422);
    res2.body.should.be.a("object");
    res2.body.should.have.property("error").eq("user exists");
  });
});
