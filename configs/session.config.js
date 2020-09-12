const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require('mongoose');

module.exports = app => {
  // <== app is just a placeholder here
  // but will become a real "app" in the app.js
  // when this file gets imported/required there
 
  // use session
  app.use(
    session({
      secret: 'shhhhhhasdfasdfasdf',
      resave: false,
      saveUninitialized: true,
      //cookie: { maxAge: 60000 } // 60 * 1000 ms === 1 min
      store: new MongoStore({
        mongooseConnection: mongoose.connection,
      })
    })
  );
};
