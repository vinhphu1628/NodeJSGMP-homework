"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.updateUserController = exports.createUserController = exports.getUserByIdController = exports.getUsersController = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const User_1 = require("../models/User");
const userServices_1 = require("../services/userServices");
const getUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { loginSubString, limit } = req.query;
    if (loginSubString) {
        if (limit) {
            // find users with login and limit
            try {
                const response = yield (0, userServices_1.getLimitUsersWithSubstring)(loginSubString.toString(), parseInt(limit.toString(), 10));
                return res.json(response);
            }
            catch (error) {
                let errorMessage = 'Failed to query!';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                return res.status(400).send(errorMessage);
            }
        }
        // find users with login and no limit
        try {
            const response = yield (0, userServices_1.getAllUsersWithSubstring)(loginSubString.toString());
            return res.json(response);
        }
        catch (error) {
            let errorMessage = 'Failed to query!';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return res.status(400).send(errorMessage);
        }
    }
    else {
        if (limit) {
            // show users with limit
            try {
                const response = yield (0, userServices_1.getLimitUsers)(parseInt(limit.toString(), 10));
                return res.json(response);
            }
            catch (error) {
                let errorMessage = 'Failed to query!';
                if (error instanceof Error) {
                    errorMessage = error.message;
                }
                return res.status(400).send(errorMessage);
            }
        }
        // show users with no limit
        try {
            const response = yield (0, userServices_1.getAllUsers)();
            return res.json(response);
        }
        catch (error) {
            let errorMessage = 'Failed to query!';
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            return res.status(400).send(errorMessage);
        }
    }
});
exports.getUsersController = getUsersController;
const getUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, userServices_1.getUserById)(id);
        if (!response) {
            return res.send('No such user!');
        }
        return res.json(response);
    }
    catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
});
exports.getUserByIdController = getUserByIdController;
const createUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    const userValidation = User_1.userSchema.validate(newUser);
    const userData = userValidation.value;
    const validationError = userValidation.error;
    if (validationError) {
        return res.status(400).send(validationError.details[0].message);
    }
    try {
        yield dbConfig_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, userServices_1.createUser)(userData, t);
        }));
        return res.send('Created user successfully!');
    }
    catch (error) {
        console.log('error');
        return next(error);
    }
});
exports.createUserController = createUserController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const newUser = req.body;
    const userValidation = User_1.userSchema.validate(newUser);
    const userData = userValidation.value;
    const validationError = userValidation.error;
    if (validationError) {
        return res.status(400).send(validationError.details[0].message);
    }
    try {
        const response = yield (0, userServices_1.updateUserById)(id, userData);
        if (response[0] === 0) {
            return res.send('No such user!');
        }
        return res.send('Updated user successfully!');
    }
    catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, userServices_1.deleteUserById)(id);
        return res.send('Deleted user successfully!');
    }
    catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
});
exports.deleteUserController = deleteUserController;
