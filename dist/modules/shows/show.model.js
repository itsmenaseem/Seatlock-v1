"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Show = void 0;
const mongoose_1 = require("mongoose");
const showSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true,
        ref: "user"
    }
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            return ret;
        }
    }
});
exports.Show = (0, mongoose_1.model)("show", showSchema);
//# sourceMappingURL=show.model.js.map