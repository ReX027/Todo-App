// Promise
const asynchandler = (requesthandler) => {
    return (req, res, next) => {
        Promise.resolve(requesthandler(req, res, next))
            .catch((err) => next(err)) //manually invoked promise
    }
}


export { asynchandler }

// asynchandler is a higher order function that can accept function as parameter and also return it as paramter
// req, res , next(middleware) is extracted from the function passed
// const asynchandler = (func)=> async (req,res,next)=>{
//     try {
//         await func(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message
//         })
//     }
// }