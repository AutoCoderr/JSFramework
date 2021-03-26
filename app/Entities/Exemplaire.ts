import Produit from "./Produit";
import User from "./User";
import EntityManager from "../Core/EntityManager";
import ExemplaireModel from "../Models/Exemplaire";

export default class Exemplaire extends EntityManager {

	Model = ExemplaireModel;

	units: null|number = null;
	User: null|User = null;
	Produit: null|Produit = null;

	UserId: null|number = null;
	ProduitId: null|number = null;

	setUnits(units: number) {
		this.units = units;
	}
	getUnits() {
		return this.units;
	}

	setUser(user: User) {
		this.User = user;
		this.UserId = user.getId();
	}
	getUser() {
		if (!(this.User instanceof User) && this.User != null) {
			this.User = (new User()).hydrate(this.User);
		}
		return this.User;
	}

	setProduit(produit: Produit) {
		this.Produit = produit;
		this.ProduitId = produit.getId();
	}
	getProduit() {
		if (!(this.Produit instanceof Produit) && this.Produit != null) {
			this.Produit = (new Produit()).hydrate(this.Produit);
		}
		return this.Produit;
	}
}
