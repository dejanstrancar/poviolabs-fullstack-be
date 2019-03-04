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
let requestCall = "";

describe("/GET user", () => {
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

  describe("/GET user/:id/like", () => {
    before(() => {
      requestCall = `/user/${userId}/like`;
    });

    it("it should deny access if no token", async () => {
      const res = await request(app).get(requestCall);
      res.should.have.status(401);
    });

    it("it should now allow access if wrong token", async () => {
      const res = await request(app)
        .get(requestCall)
        .set("Authorization", "1234");

      res.should.have.status(401);
    });

    it("it should like user", async () => {
      const res = await request(app)
        .get(requestCall)
        .set("Authorization", token);

      res.should.have.status(200);
      res.body.should.have.property("success").eq("true");
    });

    it("it should not allow like twice user", async () => {
      const res = await request(app)
        .get(requestCall)
        .set("Authorization", token);

      res.should.have.status(400);
      res.body.should.have.property("error").eq("Already liked.");
    });
  });

  describe("/GET user/:id/unlike", () => {
    before(() => {
      requestCall = `/user/${userId}/unlike`;
    });

    it("it should deny access if no token", async () => {
      const res = await request(app).get(requestCall);
      res.should.have.status(401);
    });

    it("it should now allow access if wrong token", async () => {
      const res = await request(app)
        .get(requestCall)
        .set("Authorization", "1234");

      res.should.have.status(401);
    });

    it("it should un-like user", async () => {
      const res = await request(app)
        .get(requestCall)
        .set("Authorization", token);

      res.should.have.status(200);
      res.body.should.have.property("success").eq("true");
    });

    it("it should not allow un-like twice user", async () => {
      const res = await request(app)
        .get(requestCall)
        .set("Authorization", token);

      res.should.have.status(400);
      res.body.should.have.property("error").eq("Never Liked.");
    });
  });
});
