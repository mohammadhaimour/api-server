'use strict';
const express = require('express');
const { Clothes } = require('../models/index.model');

const clothesRouter = express.Router();


clothesRouter.get("/clothes", getClothes);
clothesRouter.get("/clothes/:id", getOneClothes);
clothesRouter.post("/clothes", createClothes);
clothesRouter.put("/clothes/:id", updateClothes);
clothesRouter.delete("/clothes/:id", deleteClothes);


async function getClothes(req, res) {

    let clothes = await Clothes.read();
    res.status(200).json(clothes);
}

async function getOneClothes(req, res) {
    let clothesId = parseInt(req.params.id);
    let clothes = await Clothes.read(clothesId);
    res.status(200).json(clothes);
}

async function createClothes(req, res) {
    let newClothes = req.body;
    let clothes = await Clothes.create(newClothes);
    res.status(201).json(clothes);
}

async function updateClothes(req, res) {

    let clothesId = parseInt(req.params.id);
    let updateclothes = req.body;
    let foundclothes = await Clothes.read(clothesId);
    if (foundclothes) {
        let resultclothes = await foundclothes.update(updateclothes);
        res.status(201).json(resultclothes);
    }


}

async function deleteClothes(req, res) {

    let clothesId = parseInt(req.params.id);
    let deleteClothes = await Clothes.delete(clothesId);
    res.status(204).json(deleteClothes);

}

module.exports = clothesRouter;