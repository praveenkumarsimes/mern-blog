const CategoryModel=require('../schema/categorySchema')
require('dotenv').config({ path: './connection/db' })
function CategoryFunction(){

}
CategoryFunction.prototype.Addimg = async function(req,res,next){
   try{
    const{image,condent}=req.body
    // bcrypt.hash(password,10)


   const user=await CategoryModel.create({image:image,condent:condent})
            res.send({ "status": true, user })
            console.log(user);
   }catch(error){
    res.json({ "status": false,message:error });
    console.log(error);
   }

}
CategoryFunction.prototype.Show= async function(req,res,next){
    
    // bcrypt.hash(password,10)
try{
    const id=req.params.id
 const user= await CategoryModel.findById({_id:id})
 res.send({ "status": true, user })
 console.log(user);
        }catch(error){
            res.json({ "status": false,message:error });
    console.log(error);
        }

}
CategoryFunction.prototype.Delete= async function(req,res,next){
    
    // bcrypt.hash(password,10)
    try{
        const id=req.params.id
        var result=await  CategoryModel.findByIdAndDelete({_id:id})
                res.send(result)
            
        } catch(error){
            res.json({ "status": false,message:error });
        }
        
  
}

module.exports=CategoryFunction
