const errorResponserHandler=(err,req,res,next)=>{
    const statusCode=err.statusCode || 400;
    res.status(statusCode).json({
        message: err.message,
        stack:process.env.NODE_ENV=='production' ? null : err.stack
    });
};

export default errorResponserHandler;
//to handle invalid path error
// export const invalidPathHandler=(req,res,next)=>{
//     let error=new Error("Invlaid Path");
//     error.statusCode=404;
//     next(error);
// };
