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
            const result = await BOOK_REPOSITORY.index();
            return result;
        } catch (error) {
            throw new Error('Failed to fetch books from repository');
        }
    }

    static async createBook(data) {
        try {
            const result = await BOOK_REPOSITORY.create(data);
            return result;
        } catch (error) {
            throw new Error('Failed to created books from repository');
        }
    }

    static async updateBook(id, data) {
        try {
            const result = await BOOK_REPOSITORY.updateData(id, data);
            return result;
        } catch (error) {
            throw new Error('Failed to updated books from repository');
        }
    }
    static async deleteBook(Id) {
        try {
            const result = await BOOK_REPOSITORY.deleteData(Id);
            return result;
        } catch (error) {
            throw new Error('Failed to deleted books from repository');
        }
    }
}

module.exports = BookService;