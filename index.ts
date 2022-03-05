import express from "express"
import sequelize
 from "./config/connection";
const app = express();

const port = process.env.PORT || 3000;


// creates tables for all the defined models if not exists
sequelize.sync().then(() => {

    app.listen(port, () => {
         console.log(`App listening on ${port}`)
    })

})