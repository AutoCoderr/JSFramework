import User from "../Entities/User";
import Produit from "../Entities/Produit";
import Exemplaire from "../Entities/Exemplaire";
import ExemplaireRepository from "../Repositories/ExemplaireRepository";
import Helpers from "../Core/Helpers";

const express = require('express')
export const TestController = express.Router();

TestController.get("/exemplaires", async (req: any, res: any) => {
    let user = new User();
    user.setEmail("julienbouvet78@hotmail.com")
    user.setFirstname("Julien");
    user.setLastname("BOUVET");
    user.setPassword("1234");
    user.setPermission("seller");

    await user.save();

    let produits: Array<{name: string, entity: any}> = [
        {name: "Rubik's cube", entity: null},
        {name: "PC gamer", entity: null},
        {name: "Iphone 18", entity: null},
        {name: "Machine à café", entity: null}]

    for (let produit of produits) {
        produit.entity = new Produit();
        produit.entity.setName(produit.name);
        produit.entity.setUnits(rand(1,15));
        await produit.entity.save();

        console.log("produit => ");
        console.log(produit.entity);
    }


    for (let produit of produits) {
        let exemplaire = new Exemplaire();
        exemplaire.setProduit(produit.entity);
        exemplaire.setUser(user);
        exemplaire.setUnits(rand(1,5));

        await exemplaire.save();
    }

    //let newUser: User = await UserRepository.findOne(user.getId());
    const exemplaires = await Helpers.serializeEntityArray(await ExemplaireRepository.findByUserId(user.id));
    console.log(exemplaires);

    res.render('index.html.twig', {
        exemplaires
    });
});

function rand(a,b) {
    return a+Math.floor(Math.random()*(b-a+1));
}
