"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShowService = createShowService;
exports.getShowByIdService = getShowByIdService;
exports.searchShowsService = searchShowsService;
exports.getAllShowsService = getAllShowsService;
const not_found_error_1 = require("../../errors/not-found.error");
const show_repository_1 = require("./show.repository");
function createShowService(data) {
    return (0, show_repository_1.createShow)(data);
}
async function getShowByIdService(id, owner) {
    const query = { _id: id };
    if (owner) {
        query.owner = owner;
    }
    const show = await (0, show_repository_1.findShowById)(query);
    if (!show) {
        throw new not_found_error_1.NotFoundError("Show not found");
    }
    return show;
}
function searchShowsService(query, pagination) {
    return (0, show_repository_1.searchShows)(query, pagination);
}
function getAllShowsService(pagination) {
    return (0, show_repository_1.searchShows)("", pagination);
}
//# sourceMappingURL=show.service.js.map