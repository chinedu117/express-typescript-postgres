import express from "express"
import authRouter from "./routes/auth"
import sequelize
 from "./config/connection";

import appConfig from "./config/app";

var  app = express();

 app = appConfig(app)

const port = process.env.PORT || 3000;



app.use('/api/v1/auth', authRouter);
// creates tables for all the defined models if not exists
// sequelize.sync().then(() => {

    app.listen(port, () => {
         console.log(`App listening on ${port}`)
    })

// })

export default app