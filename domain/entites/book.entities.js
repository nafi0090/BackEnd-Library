class Book {
    constructor(id, code, title, author, stock) {
        this.id = id;
        this.code = code;
        this.title = title;
        this.author = author;
        this.stock = stock;
    }

    // check book is available
    isAvailable() {
        return this.stock > 0;
    }

    // update book after borrowed or returned book
    updateStock(amount) {
        if (this.stock + amount < 0) {
            throw new Error('Stock is not available');
        }
        this.stock += amount;
    }
}

module.exports = Book;