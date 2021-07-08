// require('dotenv').config();   
const Express = require('express');
const app = Express();
app.use(Express.json());

const controllers = require("./controllers");
const dbConnection = require('./db');

app.use('/user', controllers.userController);

dbConnection.authenticate()                       
    .then(() => dbConnection.sync())            
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`[Server]: App is listening on ${process.env.PORT}`);
        });      
    })
    .catch((err) => {
        console.log("[Server]: Server crashed");
        console.log(err);
    })