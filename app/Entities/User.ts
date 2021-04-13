import Helpers from "../Core/Helpers";
import EntityManager from "../Core/EntityManager";
import Exemplaire from "./Exemplaire";
import UserModel from "../Models/User";
import Club from "./Club";

export default class User extends EntityManager {

    Model = UserModel;

    entityTypes = {
        Exemplaires: Exemplaire.name,
        Clubs: Club.name
    };

    email: null|string = null;
    firstname: null|string = null;
    lastname: null|string = null;
    roles: null|string = null;
    password: null|string = null;

    Exemplaires: null|Array<Exemplaire> = null;
    Clubs: null|Array<Club> = null;

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

    addRole(role: string) {
        if (this.roles == null) {
            this.roles = "[]";
        }
        if (!JSON.parse(this.roles).includes(role)) {
            this.roles = JSON.stringify([...JSON.parse(this.roles), role])
        }
    }
    setRoles(roles: Array<string>) {
        this.roles = JSON.stringify(roles);
    }
    removeRole(role: string) {
        if (this.roles != null) {
            const roles = JSON.parse(this.roles);
            if (roles.includes(role)) {
                roles.splice(roles.indexOf(role),1);
            }
            this.roles = JSON.stringify(roles);
        }
    }
    getRoles() {
        return this.roles == null ? null : JSON.parse(this.roles);
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

    getClubs() {
        return this.Clubs;
    }

    async addClub(club: Club) {
        if (club.ModelInstance != null && this.ModelInstance != null) { // @ts-ignore
            await this.ModelInstance.addClub(club.ModelInstance);
            if (this.Clubs == null) {
                this.Clubs = [];
            }
            this.Clubs.push(club);
        }
    }

}
