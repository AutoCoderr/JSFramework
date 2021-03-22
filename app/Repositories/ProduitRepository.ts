import ProduitModel from "../Models/Produit";
import Produit from "../Entities/Produit";
import RepositoryManager from "../Core/RepositoryManager";

export default class ProduitRepository extends RepositoryManager {
    static model = ProduitModel;
    static entity = Produit;
}
