import Produit from "../Entities/Produit";
import Helpers from "../Core/Helpers";

export default class ProduitFixture {

    static action = async () => {
        let produits: Array<{name: string, entity: any}> = [
            {name: "Rubik's cube", entity: null},
            {name: "PC gamer", entity: null},
            {name: "Iphone 18", entity: null},
            {name: "Machine à café", entity: null}]

        for (let produit of produits) {
            produit.entity = new Produit();
            produit.entity.setName(produit.name);
            produit.entity.setUnits(Helpers.rand(1,15));
            await produit.entity.save();
        }
    }
}