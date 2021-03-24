"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Helpers_1 = __importDefault(require("../Core/Helpers"));
function Login() {
    return {
        config: {
            action: Helpers_1.default.getPath("test_login"),
            method: "POST",
            submit: "Se connecter",
            actionName: "login",
            msgError: "Connexion échouée"
        },
        fields: {
            email: {
                type: "email",
                label: "Votre adresse mail",
                required: true,
                maxLength: 50,
                minLength: 3,
                msgError: "Format d'email incorrect"
            },
            password: {
                type: "password",
                label: "Votre mot de passe",
                required: true,
                msgError: "Format de mot de passe incorrect",
                checkValid: false
            }
        }
    };
}
exports.default = Login;
;
