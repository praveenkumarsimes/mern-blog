const HomeModel=require('../schema/imgSchema')
function HomeFunction ( ){

}
HomeFunction.prototype.Addimg = async  function(req,res){
try{
  const{image,condent}=req.body 
     const user= await HomeModel.create({image:image,condent:condent})
     console.log(user);
       res.json({ "status": true, user });
}catch(error){
    res.json({ "status": false,message:error });
    console.log(error);
}

}
HomeFunction.prototype.Show = async function(req,res,next){
    
    // bcrypt.hash(password,10)
    try{
        const id=req.params.id
     const user= await HomeModel.findById({_id:id})
     res.send({ "status": true, user })
     console.log(user);
            }catch(error){
                res.json({ "status": false,message:error });
        console.log(error);
            }
        }
            HomeFunction.prototype.Delete = async function(req,res,next){
    
    // bcrypt.hash(password,10)
try{
const id=req.params.id
var result=await  HomeModel.findByIdAndDelete({_id:id})
        res.send(result)
    
} catch(error){
    res.json({ "status": false,message:error });
}
  

}
module.exports= HomeFunction
