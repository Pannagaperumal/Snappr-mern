import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import jsonwebtoken from 'jsonwebtoken';


//User shema definition
const UserSchema = new mongoose.Schema({
    avatar:{type:String,default:""},
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    verified:{type: Boolean,default:false},
    verification_code:{type:String,required:false},
    admin:{type:Boolean,default:false},
    photographer:{type:Boolean,default:false},
    reffphoto: {type: Buffer},// array of event IDs associated with the photo
    eventIds: [{type: String,required: true}],

},
{
    timestamps:true

}
);


//hashing the password before saving
UserSchema.pre('save', async function (next){
    if(this.isModified('password')){
        this.password=await bcryptjs.hash(this.password,10);
        return next()
    }
    return next();
})

//method to add token
UserSchema.methods.generateJWT= async function(){
    return jsonwebtoken.sign({id:this._id},process.env.JWT_SECRET,{expiresIn:'30d'})
};

UserSchema.methods.comparePassword= async function (enteredPassword){
    return await bcryptjs.compare(enteredPassword, this.password);
};




const User=mongoose.model('User',UserSchema);
export default User; 