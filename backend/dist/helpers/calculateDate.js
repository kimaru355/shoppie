"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isProductCompleted = void 0;
function isProductCompleted(product, order) {
    const durationTypes = ["years", "months", "weeks", "days", "hours"];
    if (!durationTypes.includes(product.durationType)) {
        return false;
    }
    const now = new Date();
    const orderDate = new Date(order.orderDate);
    if (product.durationType === "years") {
        orderDate.setFullYear(orderDate.getFullYear() + product.duration);
    }
    else if (product.durationType === "months") {
        orderDate.setMonth(orderDate.getMonth() + product.duration);
    }
    else if (product.durationType === "weeks") {
        orderDate.setDate(orderDate.getDate() + product.duration * 7);
    }
    else if (product.durationType === "days") {
        orderDate.setDate(orderDate.getDate() + product.duration);
    }
    else if (product.durationType === "hours") {
        orderDate.setHours(orderDate.getHours() + product.duration);
    }
    if (now < orderDate) {
        return false;
    }
    else {
        return true;
    }
}
exports.isProductCompleted = isProductCompleted;
