const {StatusCodes} = require('http-status-codes')
const fs = require('fs')
const productModel = require('../models/product_model')
const slugify = require('slugify')


const createProduct = async (req,res) => {
    try {
        const {name,slug,description,price,category,quantity} = req.fields;
        // req.fields used to upload file in data form
        // req.body used to posting String
        const {photo} = req.files;
        switch(true){ 
            case !name:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Name is required'});
            case !slug:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Slug is required'});
            case !description:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Description is required'});
            case !price:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Price is required'});
            case !category:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Category is required'});   
            case !quantity:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Quantity is required'});
            case photo && photo.size > 1000000:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Photo is required and should be less then 1 mb'}); 
        }

        const products = await productModel({...req.fields, slug: slugify(name)});
        
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        };
        products.save();

        res.status(StatusCodes.CREATED).json({
            success:true,
            message:"Product created successfully",
            products
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

const getAllProduct = async (req,res) =>{
    try {
        const allProduct = await productModel.find({}).select("-photo").limit(12).sort({createdAt:-1})
        if(allProduct.length === 0){
            return res.status(StatusCodes.OK).json({success: true,message:"Product is empty"})
        }else{
            return res.status(StatusCodes.OK).json({success: true,message:"Get All Product is successfully",total:allProduct.length,product:allProduct})
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error,
            message:"Internal Server Error"
        });
    }
}

const getOneProduct = async (req, res) => {
    try {
        const product = await productModel.findOne({_id:req.params.id}).select('-photo').populate('category');
        if(!product){
            res.status(StatusCodes.NOT_FOUND).json({success:false, message: "Product Not Found"});
        }else{
            res.status(StatusCodes.OK).json({
                success: true,
                message: "Get One Product is Successfully",
                product: product
            });
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error,
            message:"Internal Server Error"
        });
    }
}

const productPhoto = async (req,res) =>{
    try {
        const productPhoto = await productModel.findById(req.params.pid).select('photo');
        if(productPhoto.photo.data){
            res.set('Content-type',productPhoto.photo.contentType)
            return res.status(StatusCodes.OK).send(productPhoto.photo.data)
        }
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error,
            message:"Internal Server Error"
        });
    }
}

const deleteProduct = async (req,res)=>{
    try {
        const deleteProduct = await productModel.findByIdAndDelete(req.params.id);
        res.status(StatusCodes.OK).json({
            success:true,
            message:"Product deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error,
            message:"Internal Server Error"
        });
    }
}


const updateProduct = async (req,res)=>{
    try {
        const {name,slug,description,price,category,quantity} = req.fields;
        // req.fields used to upload file in data form
        // req.body used to posting String
        // const {photo} = req.files;
        switch(true){ 
            case !name:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Name is required'});
            case !slug:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Slug is required'});
            case !description:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Description is required'});
            case !price:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Price is required'});
            case !category:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Category is required'});   
            case !quantity:
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Quantity is required'});
            // case photo && photo.size > 1000000:
            //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:'Photo is required and should be less then 1 mb'}); 
        }
        
        const updateProducts = await productModel.findByIdAndUpdate(req.params.id,
            { ...req.fields, slug:slugify(name)},
            {new:true}
        );

        // if(photo){
        //     products.photo.data = fs.readFileSync(photo.path);
        //     products.photo.contentType = photo.type;
        // };

        res.status(StatusCodes.OK).json({
            success:true,
            message:"Product updated successfully",
            product:updateProducts
        })

    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: error,
            message:"Internal Server Error"
        });
    }
}



const productFilter = async (req,res) => {
    const {checked,radio} = req.body;
}

module.exports = {createProduct,getAllProduct,getOneProduct,deleteProduct,productPhoto,updateProduct,productFilter}