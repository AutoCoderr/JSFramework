import {Model} from "sequelize";

export default class EntityManager {
    ModelInstance: null|typeof Model = null;
    id: null|number = null;

    setId(id) {
        this.id = id;
    }
    getId() {
        return this.id;
    }

    constructor() {
    }

    hydrate(entry: Object) {// @ts-ignore
        for (let attr in entry.dataValues) {// @ts-ignore
            if (typeof(this[attr]) != "undefined") {// @ts-ignore
                this[attr] = entry.dataValues[attr];
            }
        }
        return this;
    }


    async save() {
        const entryObject: any = this.serialize();
        delete entryObject.id;

        if (this.id == null) {
            let entry;
            try {// @ts-ignore
                entry = await this.ModelInstance.create(entryObject);
            } catch(e) {
                return false;
            }
            this.id = entry.dataValues.id;
            return this;
        } else {
            let entry
            try {// @ts-ignore
                entry = await this.ModelInstance.findOne({where: {id: this.id}});
            } catch(e) {
                return false;
            }
            for (let attr in entryObject) {
                entry[attr] = this[attr];
            }
            entry.save();
            return this;
        }
    }

    async delete() {
        try { // @ts-ignore
            await this.modelInstance.destroy({
                where: {
                    id: this.id
                }
            });
        } catch (e) {
            return false;
        }
        return true;
    }

    serialize() {
        let entryObject: Object = {};
        for (let attr in this) {
            if (typeof(this[attr]) != "function" && attr != "modelInstance") {
                // @ts-ignore
                entryObject[attr] = this[attr];
            }
        }
        return entryObject;
    }
}

function addMissingZero(number: string|number, n: number = 2) {
    number = number.toString();
    while (number.length < n) {
        number = "0"+number;
    }
    return number
}