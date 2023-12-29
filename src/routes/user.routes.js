import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
const router=Router()
// router.route('/register').post(registerUser)
router.route('/register').post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        }
        ,
        {
            name:"coverImage",
            maxcount:1
        }
    ])
   , registerUser
    )
export default router;