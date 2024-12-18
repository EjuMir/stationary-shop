import { Request, Response } from "express";
import { StationaryProductServices } from "./stationary.service";


const createStationaryProduct = async(req : Request, res : Response) => {

    try{
        const {product : productData} = req.body;
        const result = await StationaryProductServices.createStationaryProductInDB(productData)
        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: result
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: "Error creating product",
            error: err.message
        })
    }

} 

const getAllProduct = async(req : Request, res:Response) =>{
    try{
        const products = await StationaryProductServices.getAllProductFromDB()
        res.status(200).json({
            success: true,
            message: "All products retrieved successfully",
            data: products
        })
    }catch(err:any){
        res.status(500).json({
            success: false,
            message: "Error retrieving products",
            error: err.message
        })
    }
}

const getSingleProduct = async(req:Request, res:Response) => {
  try{
     const productId = req.params.id;
     const product = await StationaryProductServices.getSingleProductFromDB(productId);
     res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        data: product
     })
  }catch(err:any){
      res.status(404).json({
        success: false,
        message: "Product not found",
        error: err.message
      })
  }
}

const updateOneProduct = async(req:Request, res:Response) =>{
   try{
      const productMod = req.body
      const productId = req.params.id;
      const updateProduct = await StationaryProductServices.updateProductInDB(productId, productMod)
      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: updateProduct
      })
   }catch(err:any){
      res.status(500).json({
        message: "Error updating product",
        error: err.message
      })
   }
}

export const StationaryControllers = {
    createStationaryProduct,
    getAllProduct,
    getSingleProduct,
    updateOneProduct,
}