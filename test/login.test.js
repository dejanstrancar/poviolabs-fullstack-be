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

describe("/POST login", () => {
  before(done => {
    console.log("Creating...");
    new User(user).save();
    done();
  });
  after(done => {
    console.log("Removing...");
    User.deleteOne({ username: user.username }, err => {
      done();
    });
  });

  it("it should login and receive token", done => {
    request(app)
      .post("/login")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("token").includes("Bearer ");
        done();
      });
  });

  it("it should deny access because of empty username", done => {
    request(app)
      .post("/login")
      .send({ ...user, username: "" })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eq("failed");
        res.body.should.have.property("error");
        res.body.error.should.have.property("details");
        res.body.error.details[0].should.have.property("type").eq("any.empty");
        done();
      });
  });

  it("it should deny access because of empty password", done => {
    request(app)
      .post("/login")
      .send({ ...user, password: "" })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("status").eq("failed");
        res.body.should.have.property("error");
        res.body.error.should.have.property("details");
        res.body.error.details[0].should.have.property("type").eq("any.empty");
        done();
      });
  });

  it("it should deny access because of wrong username", done => {
    request(app)
      .post("/login")
      .send({ ...user, username: "1" })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("error").eq("No Account Found");
        done();
      });
  });

  it("it should deny access because of short password", done => {
    request(app)
      .post("/login")
      .send({ ...user, password: "1" })
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

  it("it should deny access because of wrong password", done => {
    request(app)
      .post("/login")
      .send({ ...user, password: "asdsadadsada" })
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(422);
        res.body.should.be.a("object");
        res.body.should.have.property("error").eq("Password does not match");
        done();
      });
  });
});
