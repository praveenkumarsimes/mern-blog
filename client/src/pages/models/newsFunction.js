
const NewsModel=require('../schema/newsSchema')
require('dotenv').config({ path: './connection/db' })
function NewsFunction(){

}
NewsFunction.prototype.Addimg =  function(req,res,next){
    
    // bcrypt.hash(password,10)
try{
const{image,condent}=req.body
   const user= NewsModel.create({image:image,condent:condent})
   res.json({ "status": true,user });
    
}catch(error){
    res.json({ "status": false,message:error });
}
}
NewsFunction.prototype.Show= async function(req,res,next){
    
    // bcrypt.hash(password,10)
    try{
        const id=req.params.id
     const user= await NewsModel.findById({_id:id})
     res.send({ "status": true, user })
     console.log(user);
            }catch(error){
                res.json({ "status": false,message:error });
        console.log(error);
            }
        }
    NewsFunction.prototype.Delete= async function(req,res,next){
    
    // bcrypt.hash(password,10)

    try{
        const id=req.params.id
        var result=await  NewsModel.findByIdAndDelete({_id:id})
                res.send(result)
            
        } catch(error){
            res.json({ "status": false,message:error });
        }
 
  
}

module.exports=NewsFunction
