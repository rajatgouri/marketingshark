const express = require('express');
const Router = require('./routes/api');
const db = require('./util/database');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const Funnel = require('./models/Funnel');
const path = require('path');
const requestIp = require('request-ip');
const macaddress = require('macaddress');
const View = require('./models/Views');

const app = express();

// Body Parser
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());

// Access public folder from root
app.use('/css', express.static('public/css'));
app.use('/js', express.static('public/js'));
app.use('/demo', express.static(path.join(__dirname, 'public/demo')));
app.use('/images', express.static('public/images'));
app.use('/libs', express.static('public/libs'));
app.use('/scss', express.static('public/scss'));
app.use('/fonts', express.static('public/fonts'));
app.use('/CMS', express.static('public/CMS'));
app.use('/funnels', express.static('funnels'));
app.use('/integration', express.static('public'));


const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/marketingShark_db',
  databaseName: 'marketingShark_db',
  collection: 'sessions',
});


app.use(
  session({
    secret: 'keyboardmarketingShark',
    resave: false,
    saveUninitialized: false,
    store: store,
    secure: true,
  })
);

// var Mailchimp = require('mailchimp-api-v3')
 
// var mailchimp = new Mailchimp("652c6277dc05b33480cdd30997fc3be4-us17");

// mailchimp.request({
//   method : 'post',
//   path : '/lists/0cd1d83238/members',
//   body : {
//     email_address : 'rajatgouri020@gmail.com',
//     status : 'subscribed'
//   }
// }, (err, data) => {
//   if (err) {
//     console.log(err)
//   }
//   console.log(data)
// })




//For set layouts of html view
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(flash());

//routes
app.use('/', Router);

app.get('/open', (req, res) => {
  res.sendFile(path.join(__dirname, `${req.query.tempPath}`));
});

app.get('/open-user-temp', (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  macaddress.one(async (err, mac) => {
    const view = await View.findOne({
      ipAddress: clientIp,
      macAddress: mac,
    });
    if (!view) {
      const newView = new View({
        ipAddress: clientIp,
        macAddress: mac,
        funnelId: req.query.fd,
      });
      const funnel = await Funnel.findById(req.query.fd);
      funnel.views = funnel.views + 1;
      // await newView.save();
      // await funnel.save();
      return res.sendFile(path.join(__dirname, `${req.query.tempPath}`));
    }
    return res.sendFile(path.join(__dirname, `${req.query.tempPath}`));
  });
});

const port = process.env.PORT || 8000;

db();


app.listen(port, () => {
  console.log('server is listening on port: ' + port);
});



