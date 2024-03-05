import  verify  from "jsonwebtoken";
import User from "../models/User.js";
// const authGuard = async (req, res, next) => {
//     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//         try {
//             const token = req.headers.authorization.split(" ")[1];
//             const {id} = verify(token, process.env.JWT_SECRET);
//             req.user = await User.findById(id).select("-password");
//             next();
//             } catch (error) {
//             const err = new Error("Not authorized. Token failed");
//             err.statusCode = 401;
//             next(err);
//         }
//     }
//     else{
//         let error = new Error("not authorised , NO token");
//         error.statusCode=401;
//         next(error);

//     }
// };
function authUser(req,res,next){
	if(req.user==null){
		res.status(403)
		return res.send("need to login")
	}
}

export default authUser;