"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stripe = exports.StripeWrapper = void 0;
const stripe_1 = __importDefault(require("stripe"));
exports.Stripe = stripe_1.default;
class StripeClient {
    _stripe = null;
    connect(secretKey) {
        this._stripe = new stripe_1.default(secretKey, {
            apiVersion: "2026-03-25.dahlia",
        });
    }
    get client() {
        if (!this._stripe) {
            throw new Error("Stripe not configured");
        }
        return this._stripe;
    }
}
const StripeWrapper = new StripeClient();
exports.StripeWrapper = StripeWrapper;
//# sourceMappingURL=stripe.wrapper.js.map