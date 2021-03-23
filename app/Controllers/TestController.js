"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const User_1 = __importDefault(require("../Entities/User"));
const Produit_1 = __importDefault(require("../Entities/Produit"));
const Exemplaire_1 = __importDefault(require("../Entities/Exemplaire"));
const ExemplaireRepository_1 = __importDefault(require("../Repositories/ExemplaireRepository"));
const Helpers_1 = __importDefault(require("../Core/Helpers"));
const express = require('express');
exports.TestController = express.Router();
exports.TestController.get("/exemplaires", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let user = new User_1.default();
    user.setEmail("julienbouvet78@hotmail.com");
    user.setFirstname("Julien");
    user.setLastname("BOUVET");
    user.setPassword("1234");
    user.setPermission("seller");
    yield user.save(true);
    let produits = [
        { name: "Rubik's cube", entity: null },
        { name: "PC gamer", entity: null },
        { name: "Iphone 18", entity: null },
        { name: "Machine à café", entity: null }
    ];
    for (let produit of produits) {
        produit.entity = new Produit_1.default();
        produit.entity.setName(produit.name);
        produit.entity.setUnits(rand(1, 15));
        yield produit.entity.save();
        console.log("produit => ");
        console.log(produit.entity);
    }
    for (let produit of produits) {
        let exemplaire = new Exemplaire_1.default();
        exemplaire.setProduit(produit.entity);
        exemplaire.setUser(user);
        exemplaire.setUnits(rand(1, 5));
        yield exemplaire.save();
    }
    //let newUser: User = await UserRepository.findOne(user.getId());
    const exemplaires = yield Helpers_1.default.serializeEntityArray(yield ExemplaireRepository_1.default.findByUserId(user.id));
    console.log(exemplaires);
    //res.send("Utilisateur créé => "+user.getId());
    res.render('index.html.twig', {
        exemplaires
    });
}));
function rand(a, b) {
    return a + Math.floor(Math.random() * (b - a + 1));
}
