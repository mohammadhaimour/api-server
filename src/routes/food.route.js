'use strict';
const express = require('express');
const { Food } = require('../models/index.model');

const foodRouter = express.Router();


foodRouter.get("/food", getFood);
foodRouter.get("/food/:id", getOneFood);
foodRouter.post("/food", createFood);
foodRouter.put("/food/:id", updateFood);
foodRouter.delete("/food/:id", deleteFood);


async function getFood(req, res) {

    let foods = await Food.read();
    res.status(200).json(foods);
}

async function getOneFood(req, res) {
    let foodId = parseInt(req.params.id);
    let food = await Food.read(foodId);
    res.status(200).json(food);
}

async function createFood(req, res) {
    let newFood = req.body;
    let food = await Food.create(newFood);
    res.status(201).json(food);
}

async function updateFood(req, res) {

    let foodId = parseInt(req.params.id);
    let updateFood = req.body;
    let foundFood = await Food.read(foodId);
    if (foundFood) {
        // let resultFood = await Food.update(updateFood);
        let resultFood = await foundFood.update(updateFood);
        res.status(201).json(resultFood);
    }


}

async function deleteFood(req, res) {

    let foodId = parseInt(req.params.id);
    let deleteFood = await Food.delete(foodId);
    res.status(204).json(deleteFood);

}

module.exports = foodRouter;

