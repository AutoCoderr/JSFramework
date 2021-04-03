import ProduitFixture from "./ProduitFixture";
import UserFixture from "./UserFixture";
import UserRepository from "../Repositories/UserRepository";
import ProduitRepository from "../Repositories/ProduitRepository";
import Helpers from "../Core/Helpers";
import Exemplaire from "../Entities/Exemplaire";

export default class ExemplaireFixture {
    static execBefore = [ProduitFixture,UserFixture];

    static action = async () => {
        const users = await UserRepository.findAll();
        const produits = await ProduitRepository.findAll();

        for (let i=0;i<20;i++) {
            const user = users[Helpers.rand(0,users.length-1)];
            const produit = produits[Helpers.rand(0,produits.length-1)];

            let exemplaire = new Exemplaire();
            exemplaire.setProduit(produit);
            exemplaire.setUser(user);
            exemplaire.setUnits(Helpers.rand(1,3));

            await exemplaire.save();
        }
    }
}