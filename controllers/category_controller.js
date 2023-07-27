const { StatusCodes } = require("http-status-codes");
const categoryModel = require("../models/category_model.js");
const slugify = require('slugify')

const createProduct =  async (req,res)=>{
    try {
      const {name} = req.body;
      console.log(`adsfasdfds ${name}`);
      if(!name){
        return res.status(StatusCodes.UNAUTHORIZED).json({message:'Name is required'});
      }
      const existingCategory = await categoryModel.findOne({name:name});
      if(existingCategory){
        return res.status(StatusCodes.OK).json({
            success:true,
            message:'Category already existing'
        });
      }
      const category = await categoryModel({name:name,slug:slugify(name)});
      category.save();
      res.status(StatusCodes.CREATED).json({
        success:true,
        message:'new category created',
        cate:category
      });
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success:false,
            error: error,
            message:"Internal Server Error"
        });
    }
} 

const updateCategory = async (req,res) => {
  try {
    const {name} = req.body;
    const {id} =req.params;
    const category = await categoryModel.findByIdAndUpdate(id,{name:name,slug:slugify(name)},{new:true})
    res.status(StatusCodes.OK).json({
      success:true,
      message:'Category Update Successfully',
      category
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success:false,
      error: error,
      message:"Internal Server Error"
    });
  }
}
const getAllCategory = async (req,res)=>{
  try {
    const allCategory = await categoryModel.find().sort('createdAt');
    res.status(StatusCodes.OK).json({
      success:true,
      message:'All Category list',
      total:allCategory.length,
      category:allCategory
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success:false, 
      error: error,
      message:"Internal Server Error"
    });
  }
}

const getOneCategory = async (req,res)=>{
  try {
    const singleCategory = await categoryModel.findOne({slug:req.params.slug})
    console.log(req.params.slug);
    if(!singleCategory){
       res.status(StatusCodes.NOT_FOUND).json({
        success:false,
        message:"Category Not Found"
      })
    }else{
       res.status(StatusCodes.OK).json({
        success:true,
        message:'Get Single Category Successfully',
        category:singleCategory
      }) 
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success:false, 
      error: error, 
      message:"Internal Server Error"
    });
  }
}

const deleteCategory = async(req,res) => {
  try { 
    await categoryModel.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({
      success:true,
      message:"Category Deleted Successfully"
    })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success:false, 
      error: error, 
      message:"Internal Server Error"
    });
  } 
}

module.exports = {createProduct,updateCategory,getAllCategory,getOneCategory,deleteCategory}