import express from "express"
import authRouter from "./routes/auth"
import sequelize
 from "./config/connection";

import appConfig from "./config/app";
import createError from "http-errors";

var  app = express();

 app = appConfig(app)

const port = process.env.PORT || 3000;



app.use('/api/v1/auth', authRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
  });
  
  
  
  // error handler
  app.use(function (err:any, req:any, res:any, next:any) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    
    // console.log(err)
    res.status(err.status || 500);
    if (req.accepts('application/json') === 'application/json') {
      res.json({
        message: err.message || "An Error occured!",
        stack: req.app.get('env') === 'development' ? err.stack : ""
      })
  
    }else{
      
    // render the error page
    res.render('error');
  
    }
  
  });

// creates tables for all the defined models if not exists
// sequelize.sync().then(() => {

    app.listen(port, () => {
         console.log(`App listening on ${port}`)
    })

// })

export default app