"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = __importDefault(require("../Core/Helpers"));
function Register() {
    return {
        config: {
            action: Helpers_1.default.getPath("test_register"),
            method: "POST",
            submit: "S'inscrire",
            actionName: "register",
            msgError: "Erreur lors de l'inscription"
        },
        fields: {
            firstname: {
                type: "text",
                label: "Votre prénom",
                //required: true,
                maxLength: 50,
                minLength: 2,
                msgError: "Le prénom doit faire de 2 à 50 caractères"
            },
            lastname: {
                type: "text",
                label: "Votre nom",
                //required: true,
                maxLength: 50,
                minLength: 2,
                msgError: "Le nom doit faire de 2 à 50 caractères"
            },
            email: {
                type: "email",
                label: "Votre adresse mail",
                //required: true,
                maxLength: 50,
                minLength: 3,
                msgError: "Format d'email incorrect",
                uniq: { table: "User", column: "email", msgError: "Compte déjà existant" }
            },
            password: {
                type: "password",
                label: "Votre mot de passe",
                minLength: 8,
                //required: true,
                msgError: "Format de mot de passe incorrect"
            },
            passwordConfirm: {
                type: "password",
                label: "Veuillez confirmer votre mot de passe",
                confirmWith: "password",
                //required: true,
                msgError: "Les mots de passe ne correspondent pas"
            }
        }
    };
}
exports.default = Register;
;
