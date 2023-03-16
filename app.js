const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const fileUpload = require('express-fileupload');
const storePost = require('./middleware/storePost')
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const auth = require('./middleware/auth');
const connectFlash = require("connect-flash");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');

// Add MVC
const createPostController = require('./controllers/createpost');
const homePageController = require('./controllers/homePage');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const createUserController = require('./controllers/createUser')
const storeUSerController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const logOutController = require('./controllers/logout');

const app = express();

// 127.0.0.1
// localhost
mongoose.connect('mongodb://127.0.0.1:27017/node-blog')
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Something went wrong', err));

const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    resave: false,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    }),
    saveUninitialized: false
}));

app.use(connectFlash());

app.use(fileUpload());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
    res.locals.auth = req.session.userId;
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/posts/store', storePost);

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", auth, createPostController);
app.post("/posts/store", storePostController);
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);
app.get('/auth/register', redirectIfAuthenticated, createUserController);
app.post('/users/register', redirectIfAuthenticated, storeUSerController);
app.get('/auth/logout', logOutController, (req,res)=>{
    res.locals.auth = null;
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
