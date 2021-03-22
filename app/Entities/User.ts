import Helpers from "../Core/Helpers";
import EntityManager from "../Core/EntityManager";
import Exemplaire from "./Exemplaire";
import UserModel from "../Models/User";

export default class User extends EntityManager {

    ModelInstance = UserModel;

    email: null|string = null;
    firstname: null|string = null;
    lastname: null|string = null;
    permission: null|string = null;
    password: null|string = null;

    Exemplaires: null|Array<Exemplaire> = null;

    setEmail(email: string) {
        this.email = email;
    }
    getEmail() {
        return this.email;
    }

    setFirstname(firstname: string) {
        this.firstname = firstname.trim();
    }
    getFirstname() {
        return this.firstname;
    }

    setLastname(lastname: string) {
        this.lastname = lastname.trim();
    }
    getLastname() {
        return this.lastname;
    }

    setPermission(permission: string = "user") {
        if (permission !== "user" && permission !== "seller" && permission !== "admin") {
            permission = "user";
        }
        this.permission = permission;
    }
    getPermission() {
        return this.permission;
    }

    setPassword(password: string) {
        this.password = Helpers.hashPassword(password);
    }
    getPassword() {
        return this.password;
    }

    getExemplaires() {
        return this.Exemplaires;
    }

}
