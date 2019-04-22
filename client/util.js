export const priceSum = function(total, book) {
    total += book.price * book.order_log.quantity
    return total
}