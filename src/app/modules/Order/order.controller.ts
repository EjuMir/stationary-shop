import { Request, Response } from 'express';
import { OrderService } from './order.service';
import { OrderModel } from './order.model';
 
const getSingleOrder = async(req:Request, res:Response)=>{
  try{
    const productId = req.params.id
    const singleOrder = await OrderService.getSingleOrderByProductID(productId);
    res.status(200).json({
        success: true,
        message: "Order fetched successfully",
        data: singleOrder
    })
  }catch(err:any){
    res.status(500).json({
        success: false,
        message: "Error fetching order",
        error: err.message
    })
}
}

const getAllOrders = async(req:Request, res:Response)=>{
  try{
   const orders = await OrderService.getAllOrdersFromDB();
   res.status(200).json({
       success: true,
       message: "Orders fetched successfully",
       data: orders
   })
  }catch(err:any){
   res.status(500).json({
       success: false,
       message: "Error fetching orders",
       error: err.message
   })
  }
}

 const createProductOrder = async(req: Request, res: Response) => {
  const {order:orderData} = req.body;

  try {
    const result = await OrderService.createOrderInDB(orderData.product, orderData.quantity, orderData);

    if (result.success) {
      res.status(200).json({
        message: result.message,
      });
    } else {
      res.status(404).json({
        message: result.message,
      });
    }
  } catch (err:any) {
    res.status(500).json({
      message: 'Internal server error',
      error: err.message,
      stack: err.stack,
    });
  }
};

 const calculateRevenue = async(req: Request, res: Response) => {
  try {
    const orders = await OrderModel.aggregate([
      {
        $addFields: {
            "productObjectId": { $toObjectId: "$product" }
        }
      },
      {
        $lookup: {
          from: 'products', 
          localField: 'productObjectId',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $unwind: '$productDetails',
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: {
              $multiply: ['$quantity', '$productDetails.price'],
            },
          },
        },
      },
    ]);

    const totalRevenue = orders[0] ? orders[0].totalRevenue : 0;

    res.status(200).json({
      message: 'Revenue calculated successfully',
      success: true,
      data: {totalRevenue : totalRevenue},
    });
  } catch (err:any) {
    res.status(500).json({
      message: 'Error calculating revenue',
      success: false,
      error: err,
      stack: err.stack,
    });
  }
};

export const OrderController = {
  getSingleOrder,
  getAllOrders,
  createProductOrder,
  calculateRevenue
}