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

    const resSignup2 = await request(app)
      .post("/signup")
      .send({ ...user, username: "test2" });

    resSignup2.should.have.status(200);
    userId2 = resSignup2.body.userId;

    const res = await request(app)
      .post("/login")
      .send(user);

    res.should.have.status(200);
    token = res.body.token;

    const res2 = await request(app)
      .get(`/user/${userId2}/like`)
      .set("Authorization", token);

    res2.should.have.status(200);
    res2.body.should.have.property("success").eq("true");
  });

  after(async () => {
    console.log("Removing...");
    await User.deleteMany({});
  });

  describe("GET /most-liked", () => {
    it("it should return list of users where test2 is first", async () => {
      const res = await request(app).get("/most-liked");
      res.should.have.status(200);
      res.body.should.have.property("success").eq("true");
      res.body.should.have.property("users");
      res.body.users[0].should.be.eql("test2");
    });
  });
});
