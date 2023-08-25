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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const mongoose_aggregate_paginate_v2_1 = __importDefault(require("mongoose-aggregate-paginate-v2"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});
/* eslint-disable */
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (!user.isModified("password")) {
            return next();
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(user.password, salt);
        user.password = hash;
        next();
    });
});
/* eslint-disable */
UserSchema.pre("findOneAndUpdate", function (next) {
    const update = this.getUpdate();
    if (update.password) {
        bcrypt_1.default.genSalt(10, (errB, salt) => {
            if (errB) {
                return next(errB);
            }
            bcrypt_1.default.hash(update.password, salt, (err, hash) => {
                if (err) {
                    return next(err);
                }
                console.log();
                update.password = hash;
                this.setUpdate(update);
                next();
            });
        });
    }
    else {
        next();
    }
});
UserSchema.methods.validatePassword = function (passwords) {
    return bcrypt_1.default.compare(passwords, this.password);
};
UserSchema.plugin(mongoose_aggregate_paginate_v2_1.default);
/* eslint-disable */
exports.default = mongoose_1.default.model("user", UserSchema);
