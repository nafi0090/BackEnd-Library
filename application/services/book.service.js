const BOOK_REPOSITORY = require('../../infrastructure/repositories/book.repository');

class BookService {
    constructor(databook) {
        this.databook = databook;
    }

    // get all book available
    async getAvailableBook() {
        const books = await this.databook.getAllBooks();
        return books.filter(book => book.isAvailable());
    }

    static async getAllBooks() {
        try {
            const result = await BOOK_REPOSITORY.index;
            return result;
        } catch (error) {
            throw new Error('Failed to fetch books from repository');
        }
    }
}

module.exports = BookService;