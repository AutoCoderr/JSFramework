import UserModel from "../Models/User";
import Club from "../Entities/Club";
import RepositoryManager from "../Core/RepositoryManager";
import ClubModel from "../Models/Club";

export default class ClubRepository extends RepositoryManager {
    static model = ClubModel;
    static entity = Club;

    static async findOne(id) {
        return await super.findOne(id,UserModel);
    }
}
