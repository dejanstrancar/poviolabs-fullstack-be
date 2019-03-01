const User = require("../models/User");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

const should = chai.should();
const request = chai.request;

chai.use(chaiHttp);

const user = {
  username: "testTest",
  password: "testtest"
};

describe("/GET user", () => {
  before(done => {
    console.log("Creating...");
    new User(user).save();
    request(app)
      .post("/login")
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        done();
      });
  });

  after(done => {
    console.log("Removing...");
    User.deleteOne({ username: user.username }, err => {
      done();
    });
  });

  describe("/GET user/:id/like", () => {
    it("it should deny access if no token", done => {
      request(app)
        .get("/user/1/like")
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("it should now allow access if wrong token", done => {
      request(app)
        .get("/user/1/like")
        .set("Authorization", "1234")
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });

    it("it should allow access if correct token", done => {
      request(app)
        .get("/user/1/like")
        .set("Authorization", token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
