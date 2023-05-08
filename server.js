// const express = require("express");
// const cors = require("cors");
// const path = require('path')
// var log4js = require("log4js");
// const log = require("./app/config/configLog4js.js");
// const dotenv = require("dotenv");
// var corsOptions = {origin: "*"};
// dotenv.config();
// const PORT = process.env.PORT

// const app = express();
// app.use(express.json({limit: '50mb'}));
// // app.use(express.urlencoded({limit: '50mb'}));
// app.use(cors(corsOptions))
// app.use(log4js.connectLogger(log.loggercheese, { level: "info" }));

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome To CoffeME Application." });
// });

// app.use('/productimages', express.static(path.join(__dirname, 'productimages')))

// const db = require("./app/models");
// db.sequelize.sync({alter:true});

// require('./app/routes')(app)

// app.listen(PORT,()=>{
//     console.log(`Server Running On ip:${PORT}` )
// })

// server.js

const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const es6Renderer = require("express-es6-template-engine");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;
const db = require("./models");
const User = db.users;
const { QueryTypes } = require("sequelize");
const sequelize = db.sequelize;

const path = require("path");
const app = express();

app.use(express.json({ limit: "50mb" }));

app.engine("html", es6Renderer);
app.set("views", "views");
app.set("view engine", "html");

app.use(
  session({
    secret: "your secret key here",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "cin",
      passwordField: "mot_de_passe",
    },
    async (username, password, done) => {
      try {
        const user = await sequelize.query(
          `SELECT * FROM users WHERE cin = ${username}`,
          { type: QueryTypes.SELECT }
        );
        // console.log(user);
        if (!user || user.length === 0) {
          return done(null, false, { message: "Incorrect cin." });
        }
        if (user[0].mot_de_passe !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        // Assuming that `user` object has an `id` property
        return done(null, user[0]);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // console.log("serialize user", user);
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({ where: { id: id } });
    // console.log("deserialize user", user);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.post(
  "/auth/login", 
  passport.authenticate("local"),
  (req, res) => {
    res.json({ success : true });
  }
);

app.use(
  "/public",
  express.static("public", {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".css")) {
        res.set("Content-Type", "text/css");
      }
    },
  })
);

// Use sessions for authentication
app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: true,
  })
);

// Route to display the login page
// app.get('/login', (req, res) => {
//   res.render('login');
// });
require("./routes")(app);

// Route to display the login page
// app.get('/', (req, res) => {
//   res.render('home',{
//     users : [
//       {name : "ahmed", age : 20},
//       {name : "mohamed", age : 30},
//       {name : "ali", age : 40},
//     ]
//   });
// });

// Route to handle form submission
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // TODO: validate username and password
  const user = await findUserByUsername(username);
  const passwordMatch = await bcrypt.compare(password, user.password);

  if (passwordMatch) {
    // Create a session for the user
    req.session.user = { id: user.id, username: user.username };

    // Redirect to a new page
    res.redirect("/dashboard");
  } else {
    // Display an error message
    res.render("login", { error: "Invalid username or password" });
  }
});

// Middleware to protect routes
function requireAuthentication(req, res, next) {
  if (req.session.user) {
    // User is authenticated, continue to the next handler
    next();
  } else {
    // Redirect to the login page
    res.redirect("/login");
  }
}

// Route that requires authentication
app.get("/dashboard", requireAuthentication, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});

db.sequelize.sync({ alter: true });

// Start the server
app.listen(3000, () => {
  console.log("Server started on http://localhost:3000");
});
