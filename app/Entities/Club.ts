import EntityManager from "../Core/EntityManager";
import ClubModel from "../Models/Club";
import User from "./User";

export default class Club extends EntityManager {
    Model = ClubModel;

    name: null|string = null;

    Users: null|Array<User> = null;

    setName(name: string) {
        this.name = name;
    }
    getName() {
        return this.name;
    }

    getUsers() {
        if (this.Users instanceof Array) {
            for (let i=0;i<this.Users.length;i++) {
                if (!(this.Users[i] instanceof User)) {
                    this.Users[i] = (new User()).hydrate(this.Users[i]);
                }
            }
        }
        return this.Users;
    }

    async addUser(user: User) {
        if (user.ModelInstance != null && this.ModelInstance != null) { // @ts-ignore
            await this.ModelInstance.addUser(user.ModelInstance);
            if (this.Users == null) {
                this.Users = [];
            }
            this.Users.push(user);
        }
    }
}
