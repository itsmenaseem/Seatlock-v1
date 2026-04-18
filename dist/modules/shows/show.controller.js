"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createShowController = createShowController;
exports.getShowByIdController = getShowByIdController;
exports.searchShowsController = searchShowsController;
exports.getAllShowsController = getAllShowsController;
const show_service_1 = require("./show.service");
async function createShowController(req, res) {
    const { title, description } = req.body;
    const owner = req.user?.id;
    const event = await (0, show_service_1.createShowService)({ title, description, owner: owner });
    res.status(201).json(event);
}
async function getShowByIdController(req, res) {
    const { id } = req.params;
    const show = await (0, show_service_1.getShowByIdService)(id);
    res.status(200).json(show);
}
async function searchShowsController(req, res) {
    const { query, page, limit } = req.query;
    const pt = Number(page) || 1;
    const lt = Number(limit) || 10;
    const pagination = {
        page: pt,
        limit: lt
    };
    const shows = await (0, show_service_1.searchShowsService)(query, pagination);
    res.status(200).json(shows);
}
async function getAllShowsController(req, res) {
    const { page, limit } = req.query;
    const pt = Number(page) || 1;
    const lt = Number(limit) || 10;
    const pagination = {
        page: pt,
        limit: lt
    };
    const shows = await (0, show_service_1.getAllShowsService)(pagination);
    res.status(200).json(shows);
}
//# sourceMappingURL=show.controller.js.map