const MEMBER_CONTROLLER = require('../../../presentation/controller/member.controller');
const MEMBER_SERVICE = require('../../../application/services/member.service');

// Mock MEMBER_SERVICE
jest.mock('../../../application/services/member.service');

describe('Member Controller', () => {
    let req, res, next;

    beforeEach(() => {
        // Mock request, response, and next
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
        it('should return all members successfully', async () => {
            const members = [{
                name: 'John Doe'
            }, {
                name: 'Jane Smith'
            }];

            // Mock the service to return the members
            MEMBER_SERVICE.getAllMembers.mockResolvedValue(members);

            // Call the controller method
            await MEMBER_CONTROLLER.index(req, res, next);

            // Expect the service to be called
            expect(MEMBER_SERVICE.getAllMembers).toHaveBeenCalled();

            // Expect the response to be 200 and return the members
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'members fetched successfully',
                data: members,
            });
        });

        it('should handle errors when fetching members', async () => {
            const errorMessage = 'Error fetching members';

            // Mock the service to throw an error
            MEMBER_SERVICE.getAllMembers.mockRejectedValue(new Error(errorMessage));

            // Call the controller method
            await MEMBER_CONTROLLER.index(req, res, next);

            // Expect the response to be 500 and return the error message
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error fetching members',
                error: errorMessage,
            });
        });
    });

    describe('create()', () => {
        it('should create a member successfully', async () => {
            const newMember = {
                name: 'New Member'
            };

            // Mock the service to return the created member
            MEMBER_SERVICE.createMember.mockResolvedValue(newMember);

            // Set the request body
            req.body = newMember;

            // Call the controller method
            await MEMBER_CONTROLLER.create(req, res, next);

            // Expect the service to be called with the correct data
            expect(MEMBER_SERVICE.createMember).toHaveBeenCalledWith(newMember);

            // Expect the response to be 200 and return the created member
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'members created successfully',
                data: newMember,
            });
        });

        it('should handle errors when creating a member', async () => {
            const errorMessage = 'Error creating data book';

            // Mock the service to throw an error
            MEMBER_SERVICE.createMember.mockRejectedValue(new Error(errorMessage));

            // Call the controller method
            await MEMBER_CONTROLLER.create(req, res, next);

            // Expect the response to be 500 and return the error message
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error creating data book',
                error: errorMessage,
            });
        });
    });

    describe('updateData()', () => {
        it('should update a member successfully', async () => {
            const updatedMember = {
                name: 'Updated Member'
            };
            const memberId = '1';

            // Mock the service to return the updated member
            MEMBER_SERVICE.updateMember.mockResolvedValue(updatedMember);

            // Set the request params and body
            req.params.id = memberId;
            req.body = updatedMember;

            // Call the controller method
            await MEMBER_CONTROLLER.updateData(req, res, next);

            // Expect the service to be called with the correct ID and data
            expect(MEMBER_SERVICE.updateMember).toHaveBeenCalledWith(memberId, updatedMember);

            // Expect the response to be 200 and return the updated member
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'members updated successfully',
                data: updatedMember,
            });
        });

        it('should handle errors when updating a member', async () => {
            const errorMessage = 'Error updating data book';

            // Mock the service to throw an error
            MEMBER_SERVICE.updateMember.mockRejectedValue(new Error(errorMessage));

            // Call the controller method
            await MEMBER_CONTROLLER.updateData(req, res, next);

            // Expect the response to be 500 and return the error message
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error updating data book',
                error: errorMessage,
            });
        });
    });

    describe('deleteData()', () => {
        it('should delete a member successfully', async () => {
            const deletedMember = {
                name: 'Deleted Member'
            };
            const memberId = '1';

            // Mock the service to return the deleted member
            MEMBER_SERVICE.deleteMember.mockResolvedValue(deletedMember);

            // Set the request params
            req.params.id = memberId;

            // Call the controller method
            await MEMBER_CONTROLLER.deleteData(req, res, next);

            // Expect the service to be called with the correct ID
            expect(MEMBER_SERVICE.deleteMember).toHaveBeenCalledWith(memberId);

            // Expect the response to be 200 and return the deleted member
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({
                message: 'members deleted successfully',
                data: deletedMember,
            });
        });

        it('should handle errors when deleting a member', async () => {
            const errorMessage = 'Error deleting data book';

            // Mock the service to throw an error
            MEMBER_SERVICE.deleteMember.mockRejectedValue(new Error(errorMessage));

            // Call the controller method
            await MEMBER_CONTROLLER.deleteData(req, res, next);

            // Expect the response to be 500 and return the error message
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Error deleting data book',
                error: errorMessage,
            });
        });
    });
});