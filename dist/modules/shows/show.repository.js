"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShow = createShow;
exports.findShowById = findShowById;
exports.searchShows = searchShows;
const show_model_1 = require("./show.model");
function createShow(data) {
    return show_model_1.Show.create({
        ...data
    });
}
function findShowById(query) {
    return show_model_1.Show.findOne(query);
}
function searchShows(query, pagination) {
    const { page, limit } = pagination;
    return show_model_1.Show.find({
        $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } }
        ]
    })
        .skip((page - 1) * limit)
        .limit(limit);
}
//# sourceMappingURL=show.repository.js.map