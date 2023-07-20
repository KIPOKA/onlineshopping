const express = require('express');
const router = express.Router();

//get orders
router.get('/', (req, res, next) =>{
    res.status(201).json({
        message: 'Order has been fetched'
    });
});


//create a new order
router.post('/', (req, res, next) =>{
    const order ={
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message: 'Create a new order',
        order : order
    });
});


//Get a particular product within all products
router.get('/:orderId', (req, res, next) =>{
    const id = req.params.orderId
    if(id === 'social'){
        res.status(200).json({
            message: 'You delivered the product of a product',
            id: id
        });
    }else{
        res.status(200).json({
            message: 'Not found',
            id : id

        });
    }
   
});


//update a order using its id

router.patch('/:orderId', (req, res, next) =>{
    res.status(200).json({
            message: 'The product has been updated',
           
    });
    
   
});


//delete a product

router.delete('/:orderId', (req, res, next) =>{
    res.status(200).json({
            message: 'The product has been deleted',           
    });    
   
});
module.exports = router;