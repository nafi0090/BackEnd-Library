const BOOK_CONTROLLER = require('../../../presentation/controller/book.controller');
const BOOK_SERVICE = require('../../../application/services/book.service');

// Mock BOOK_SERVICE
jest.mock('../../../application/services/book.service.js');

describe('Book Controller', () => {
    let req, res, next;

    beforeEach(() => {
        // Mocking request, response, and next
        req = {
            params: {},
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    describe('index()', () => {
        it('should return all books successfully', async () => {
            const books = [{
                title: 'Book 1'
            }, {
                title: 'Book 2'
            }];

            // Mock the service to return the books
            BOOK_SERVICE.getAllBooks.mockResolvedValue(books);

            // Call the controller method
            await BOOK_CONTROLLER.index(req, res, next);

            // Expect the service to be called
            expect(BOOK_SERVICE.getAllBooks).toHaveBeenCalled();

            // Expect the response to be 200 and return the books
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Books fetched successfully',
                data: books,
            });
        });

        it('should handle errors when fetching books', async () => {
            const errorMessage = 'Error fetching books';

            // Mock the service to throw an error
            BOOK_SERVICE.getAllBooks.mockRejectedValue(new Error(errorMessage));

            // Call the controller method
            await BOOK_CONTROLLER.index(req, res, next);

            // Expect the response to be 500 and return the error message
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error fetching books',
                error: errorMessage,
            });
        });
    });

    describe('create()', () => {
        it('should create a book successfully', async () => {
            const newBook = {
                title: 'New Book'
            };

            // Mock the service to return the created book
            BOOK_SERVICE.createBook.mockResolvedValue(newBook);

            // Set the request body
            req.body = newBook;

            // Call the controller method
            await BOOK_CONTROLLER.create(req, res, next);

            // Expect the service to be called
            expect(BOOK_SERVICE.createBook).toHaveBeenCalledWith(newBook);

            // Expect the response to be 200 and return the created book
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Books created successfully',
                data: newBook,
            });
        });

        it('should handle errors when creating a book', async () => {
            const errorMessage = 'Error creating data book';

            // Mock the service to throw an error
            BOOK_SERVICE.createBook.mockRejectedValue(new Error(errorMessage));

            // Call the controller method
            await BOOK_CONTROLLER.create(req, res, next);

            // Expect the response to be 500 and return the error message
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error creating data book',
                error: errorMessage,
            });
        });
    });

    describe('updateData()', () => {
        it('should update a book successfully', async () => {
            const updatedBook = {
                title: 'Updated Book'
            };
            const bookId = '1';

            // Mock the service to return the updated book
            BOOK_SERVICE.updateBook.mockResolvedValue(updatedBook);

            // Set the request params and body
            req.params.id = bookId;
            req.body = updatedBook;

            // Call the controller method
            await BOOK_CONTROLLER.updateData(req, res, next);

            // Expect the service to be called with the correct ID and data
            expect(BOOK_SERVICE.updateBook).toHaveBeenCalledWith(bookId, updatedBook);

            // Expect the response to be 200 and return the updated book
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Books updated successfully',
                data: updatedBook,
            });
        });

        it('should handle errors when updating a book', async () => {
            const errorMessage = 'Error updating data book';

            // Mock the service to throw an error
            BOOK_SERVICE.updateBook.mockRejectedValue(new Error(errorMessage));

            // Call the controller method
            await BOOK_CONTROLLER.updateData(req, res, next);

            // Expect the response to be 500 and return the error message
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error updating data book',
                error: errorMessage,
            });
        });
    });

    describe('deleteData()', () => {
        it('should delete a book successfully', async () => {
            const deletedBook = {
                title: 'Deleted Book'
            };
            const bookId = '1';

            // Mock the service to return the deleted book
            BOOK_SERVICE.deleteBook.mockResolvedValue(deletedBook);

            // Set the request params
            req.params.id = bookId;

            // Call the controller method
            await BOOK_CONTROLLER.deleteData(req, res, next);

            // Expect the service to be called with the correct ID
            expect(BOOK_SERVICE.deleteBook).toHaveBeenCalledWith(bookId);

            // Expect the response to be 200 and return the deleted book
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Books deleted successfully',
                data: deletedBook,
            });
        });

        it('should handle errors when deleting a book', async () => {
            const errorMessage = 'Error deleting data book';

            // Mock the service to throw an error
            BOOK_SERVICE.deleteBook.mockRejectedValue(new Error(errorMessage));

            // Call the controller method
            await BOOK_CONTROLLER.deleteData(req, res, next);

            // Expect the response to be 500 and return the error message
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error deleting data book',
                error: errorMessage,
            });
        });
    });
});