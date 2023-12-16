//Keeps the entire logic of all the endpoints of the corresponding api (User api)

import User from "../models/User.js"

//
const registerUser = async(req,res,next)=>{
    try{
        const {name,email,password} = req.body;
        const reffphoto = req.file.buffer;

        // check user exists
        const userExists= await User.findOne({"email":email});
        if(userExists){
            throw new Error("User already exists");
        }  

        //create new user
        let user = await User.create({
            name,
            email,
            password,
            reffphoto
        });
    return res.status(201).json({
        _id:user._id,
        name:user.name,
        email:user.email,
        admin:user.admin,
        token:await user.generateJWT()
        })
    }
    catch(error){
    next(error);
    }
};

//login user

const LoginUser = async (req, res, next) => {
    try{
        const {email,password}=req.body;

        let user = await User.findOne({email});
        if (!user){
            throw new Error("email not found");
        }
        if (await user.comparePassword(password)){
            return res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                admin:user.admin,
                token:await user.generateJWT()
            });
        }
        else{
            throw new Error("invalid email or password")
        }
    }
    catch(error){
        next(error);
    }
};

const userProfile = async (req,res,next)=>{
    try{
        let user = await User.findById(req.User._id);

        if (user){
            return res.status(201).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                admin:user.admin,
            });
        }
        else{
            let error=new Error("User not found");
            error.statusCode=404;
            next(error);
        }
    }
    catch(error){
        next(error);
    }
}

//upload photo
const uploadReferencePhoto = async (req, res, next) => {
    try {
    const photoData = await readFileSync(req.file.path);

    await User.findByIdAndUpdate(req.userId, {
    $set: {
    referencePhoto: {
        contentType: req.file.mimetype,
        data: photoData,
        },
      },
    });

    res.json({ message: 'Reference photo uploaded successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading reference photo' });
  } finally {
    await unlinkSync(req.file.path);
  }
};
export { LoginUser, registerUser,userProfile,uploadReferencePhoto };
