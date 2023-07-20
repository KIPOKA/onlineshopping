const express = require('express');
const router = express.Router();
const Product = require('../models/product')
const mongoose =require('mongoose')

router.get('/', (req, res, next) =>{
    Product.find()
        .exec()
        .then(docs =>{

            if(docs){
                console.log(docs);
                res.status(200).json(docs);
            }else{
                console.log(docs);
                res.status(404).json({
                    message:'No valid entry data found for the ID'         
                });
            } 
            
        })
        .catch(err => {
            res.status(500).json({
                err: err         
        });
        });

});

router.post('/', (req, res, next) =>{
    // const product={
    //     name : req.body.name,
    //     price : req.body.price
    // }
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    })
    product.save().then( result =>{
        console.log(result);
        res.status(200).json({
            message: 'Handling the post request to /products',
            product: product
        });
    })
    .catch(err => {
        res.status(500).json({
            err: err         
    });
    });
    
    
});


//Get a particular product within all products
router.get('/:productId', (req, res, next) =>{
    const id = req.params.productId
    Product.findById(id)
        .exec()
        .then(doc =>{

            if(doc){
                console.log(doc);
                res.status(200).json(doc);
            }else{
                console.log(doc);
                res.status(404).json({
                    message:'No valid entry data found for the ID'         
                });
            }
            
            
        })
        .catch(err => {
            res.status(500).json({
                err: err         
        });
        });

   
});


//update a product using its id

router.patch('/:productId', (req, res, next) =>{
    const id = req.params.productId;
    const updateOps ={};
    for(const ops in req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.updateOne({_id: id}, {$set: updateOps})
        .exec()
        .then( result =>{ 
                    console.log(result);
                    res.status(200).json(result)
        }
        )
        .catch(err => {
            res.status(500).json({
                err: err         
        });
        });
 
});


//delete a product

// router.delete('/:productId', (req, res, next) =>{
//     const id = req.params.productId;
//     Product.remove({_id:id})
//         .exec()
//         .then(result =>{  
                
//                 res.status(200).json(result);   
//         })
//         .catch(err => {
//             res.status(500).json({
//                 err: err         
//         });
//         });    
   
// });

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndDelete({ _id: id }) // Use findOneAndDelete() to find and remove the product
        .exec()
        .then(deletedProduct => {
            if (deletedProduct) {
                res.status(200).json({ message: 'Product removed successfully', deletedProduct });
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;