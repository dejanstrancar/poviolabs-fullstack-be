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

describe("/POST signup", () => {
  beforeEach(done => {
    console.log("Removing...");
    User.deleteOne({ username: user.username }, err => {
      done();
    });
  });

  it("it should save a new user and return id", done => {
    request(app)
      .post("/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });

  it("it should complain about short password", done => {
    request(app)
      .post("/signup")
      .send({
        ...user,
        password: "test"
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eq("failed");
        res.body.should.have.property("error");
        res.body.error.should.have.property("details");
        res.body.error.details[0].should.have.property("type").eq("string.min");
        done();
      });
  });

  it("it should complain about existing user", done => {
    request(app)
      .post("/signup")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        request(app)
          .post("/signup")
          .send(user)
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a("object");
            res.body.should.have.property("error").eq("user exists");
            done();
          });
      });
  });
});
