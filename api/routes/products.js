const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling the get request to /products'
    });
});

router.post('/', (req, res, next) =>{
    res.status(200).json({
        message: 'Handling the post request to /products'
    });
});


//Get a particular product within all products
router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId
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


//update a product using its id

router.patch('/:productId', (req, res, next) =>{
    res.status(200).json({
            message: 'You delivered the product of a product',
           
    });
    
   
});
module.exports = router;