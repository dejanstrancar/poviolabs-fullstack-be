let CONFIG = {}; //Make this global to use all over the application

CONFIG.environment = process.env.NODE_ENV || "development";
CONFIG.port = process.env.PORT || "5000";

CONFIG.MongoURI =
  "mongodb+srv://root:root@cluster0-t2ftm.mongodb.net/povio?retryWrites=true";
CONFIG.MongoTestURI =
  "mongodb+srv://root:root@cluster0-t2ftm.mongodb.net/povioTest?retryWrites=true";

CONFIG.jwt_encryption =
  process.env.JWT_ENCRYPTION ||
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZS";

CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || 36000;

module.exports = CONFIG;
