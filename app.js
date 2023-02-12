const express = require("express");
const cors = require("cors");
const uploader = require("express-fileupload");
const rateLimit = require("express-rate-limit");
const { Response } = require("./helpers/helper.message");
const dotenv = require("dotenv");
const { Routes } = require("./routes");
// # const { Routers } = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4200;

const limiter = rateLimit({
	windowMs: parseFloat(process.env.MAX_TIME_RATE_LIMIT) * ( 60 * 1000 ),
	max: parseFloat(process.env.MAX_RATE_LIMIT), // Limit each IP to 5 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    message: {
        data: {},
        status: 403,
        message: "Vous avez atteint le maximum possible de requetes",
    }
});

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: process.env.MAX_UPLOAD_FILE_SIZE }));
app.use(express.json({ limit: '50mb' }));
app.use(uploader());
app.use(limiter);

app.get("/", (req, res, next) => {
    return Response(res, 200, {
        message: `Welcome to the ${process.env.APPNAME}`,
        status: 200,
        data: {}
    })
});

// this api can change according to the version on this one
app.use(`/api/${process.env.APIVERSION}`, Routes )

app.use((req, res, next) => {
    return Response(res, 404, {
        message: "There is nothing over here !",
        url: req.url,
        apiversion: process.env.APIVERSION
    })
});

app.listen(PORT, 
    () => {
        console.log("-----------------------------------------------------");
        console.log('------', process.env.APPNAME," App is running on PORT =>",PORT, '-----');
        console.log("-----------------------------------------------------");
    }
);