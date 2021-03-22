import ExemplaireModel from "../Models/Exemplaire";
import Exemplaire from "../Entities/Exemplaire";
import RepositoryManager from "../Core/RepositoryManager";

export default class ExemplaireRepository extends RepositoryManager {
    static model = ExemplaireModel;
    static entity = Exemplaire;
}
