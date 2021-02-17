const express = require('express')
const inventoryRouter = express.Router()
const Inventory = require('../models/inventory')

//get all
inventoryRouter.get('/', (req, res, next) => {
    Inventory.find((err, items) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(items)
    })
})

//get one
inventoryRouter.get('/:itemId', (req, res, next) =>{
    Inventory.findOne(
        { _id: req.params.itemId },
        (err, item) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(item)
        }
    )
})

//post a new inventory item
inventoryRouter.post('/', (req, res, next) => {
    const newItem = new Inventory(req.body)
    newItem.save((err, savedItem) => {
        if (err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedItem)
    })
})

//delete an inventory item
inventoryRouter.delete('/:itemId',(req, res, next) => {
    Inventory.findByIdAndDelete({_id: req.params.itemId}, (err, deletedItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(
            `Successfully deleted item ${deletedItem.name} from the database.`
        )
    })
})

//update-put an inventory item
inventoryRouter.put('/:itemId', (req, res, next) => {
    Inventory.findOneAndUpdate(
        { _id: req.params.itemId },
        req.body,
        {new: true},
        (err, updatedItem) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updatedItem)
        }
    )
})

module.exports = inventoryRouter