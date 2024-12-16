import { Stationary } from "./stationary.interface";
import { StationaryModel } from "./stationary.model";

const createStationaryProductInDB = async(product : Stationary) =>{

  const result =  await StationaryModel.create(product)
  return result;
}

export const StationaryProductServices = {
    createStationaryProductInDB,
}