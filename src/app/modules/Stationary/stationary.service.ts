import { Stationary } from "./stationary.interface";
import { StationaryModel } from "./stationary.model";

const createStationaryProductInDB = async(product : Stationary) =>{
  const result =  await StationaryModel.create(product)
  return result;
}

const getAllProductFromDB = async()=>{
  const result = await StationaryModel.find();
  return result
}

const getSingleProductFromDB = async(id:string) =>{
  const result = await StationaryModel.findOne({_id: new Object(id)});
  return result
}
 
const updateProductInDB = async(id : string, updateProduct : Stationary)=>{
  const newUpdatedTime = (updateProduct.updatedAt = new Date().toJSON())
  const updatedProduct = {...updateProduct, updatedAt: newUpdatedTime};
  const result = await StationaryModel.findByIdAndUpdate({_id:new Object(id)}, updatedProduct);
  return result
}

const deleteProductFromDB = async(id:string) =>{
  const result = await StationaryModel.updateOne({_id: new Object(id)}, {isDeleted:true});
  return result
}

export const StationaryProductServices = {
    createStationaryProductInDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updateProductInDB,
    deleteProductFromDB,
}