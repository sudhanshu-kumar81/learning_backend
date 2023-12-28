const asyncHandler=(requesthnadler)=>{
   return  (req,res,next)=>{
        Promise.resolve(requesthnadler(req,res,next)).catch((err)=>next(err))
    }
}

export {asyncHandler}