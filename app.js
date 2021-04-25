const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const makejson = require('./utils/makejson');
const winston = require('./config/winston')(module);
dotenv.config();
const v1 = require('./routes/v1');
const api = require('./routes/api');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes');
const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
passportConfig();
app.set('port', process.env.PORT || 8002);

const L001 = require('./schedule/L001_schedule');
const L002 = require('./schedule/L002_req');
const L003 = require('./schedule/L003_schedule');
const L005 = require('./schedule/L005_schedule');

const HighRank = require('./service/HighRank');

const stix_log = require('./STIX_service/stixInsert_logevent');


//app.set('view engine', 'html');

sequelize.sync({ force: false })
    .then(() => {
        winston.info('success db connect ');
    })
    .catch((err) => {
        winston.error(err.stack);
    });

app.use(morgan( process.env.NODE_ENV !== 'production'?'dev':'combined',{stream:winston.httpLogStream}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(passport.session());

// Other settings
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function (req, res, next) { // 1
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
});

app.use('/v1', v1);
app.use('/api', api);
app.use('/auth', authRouter);
app.use('/', indexRouter);

app.use((req, res, next) => {
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    winston.error(err.stack);
    res.json(makejson.makeResData(err,req))
});

app.set('etag', false);

app.listen(app.get('port'), () => {
    winston.info(app.get('port')+ '번 포트에서 대기중');
});

L001.scheduleInsert();
L002.scheduleInsert(); // Body의 포맷어레이 작성 미구현, 테스트용으로 5분 스케쥴 설정
L003.scheduleInsert(); // Body 작성 미구현, 테스트용으로 5분 스케쥴 설정
L005.scheduleInsert();

HighRank.searchAndtransm();

stix_log.searchAndInsert();
