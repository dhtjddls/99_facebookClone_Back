const development = {
  username: "redjun",
  password: "hong3374",
  database: "99_facebookclone_back",
  host: "express-database.ceywx0zzo0yz.ap-northeast-2.rds.amazonaws.com",
  dialect: "mysql",
};
const test = {
  username: "root",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
};
const production = {
  username: "root",
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql",
};

module.exports = { development, test, production };
