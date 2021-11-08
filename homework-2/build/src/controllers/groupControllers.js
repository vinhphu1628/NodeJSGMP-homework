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
exports.addUsersToGroupController = exports.deleteGroupController = exports.updateGroupController = exports.createGroupController = exports.getGroupByIdController = exports.getAllGroupsController = void 0;
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
const groupServices_1 = require("../services/groupServices");
const getAllGroupsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield (0, groupServices_1.getAllGroups)();
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
exports.getAllGroupsController = getAllGroupsController;
const getGroupByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const response = yield (0, groupServices_1.getGroupById)(id);
        if (!response) {
            return res.send('No such group!');
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
exports.getGroupByIdController = getGroupByIdController;
const createGroupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupData = req.body;
    try {
        yield dbConfig_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, groupServices_1.createGroup)(groupData, t);
        }));
        return res.send('Created group successfully!');
    }
    catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
});
exports.createGroupController = createGroupController;
const updateGroupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const groupData = req.body;
    try {
        const response = yield (0, groupServices_1.updateGroupById)(id, groupData);
        if (response[0] === 0) {
            return res.send('No such group!');
        }
        return res.send('Updated group successfully!');
    }
    catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
});
exports.updateGroupController = updateGroupController;
const deleteGroupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield (0, groupServices_1.deleteGroupById)(id);
        return res.send('Deleted group successfully!');
    }
    catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
});
exports.deleteGroupController = deleteGroupController;
const addUsersToGroupController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const userIds = req.body;
    try {
        yield dbConfig_1.default.transaction((t) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, groupServices_1.addUsersToGroupById)(id, userIds.userIds, t);
        }));
        return res.send('Added users to group successfully!');
    }
    catch (error) {
        let errorMessage = 'Failed to query!';
        if (error instanceof Error) {
            errorMessage = error.message;
        }
        return res.status(400).send(errorMessage);
    }
});
exports.addUsersToGroupController = addUsersToGroupController;
