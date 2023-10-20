const base = require('../controllers/userControllers');

const mockRequest = (body = {}) => ({ body });
const mockRequestParams = (params = {}) => ({ params });
const mockResponse = () => {
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
};

describe("User API Test", () => {
    test("Get Data User", async() => {
        const req = mockRequest(); 
        const res = mockResponse();
        await base.getUser(req,res);

        expect(res.status).toBeCalledWith(200); 
    });
    test("Get Data Detail User", async() =>{
        const req = mockRequestParams({id:1})
        const res = mockResponse()
        await base.getUserById(req,res)
        
        expect(res.status).toBeCalledWith(200); 
    });
    test("Make Data User", async() =>{
        const req = mockRequest({
            "name": "testing",
            "email": "testing@test.com",
            "password": "test",
            "identity_number": "124656332",
            "identity_type":"Kartu Spesial",
            "address":"Perum Tidar"
        })
        const res = mockResponse()
        await base.registerUser(req,res)
        
        expect(res.status).toBeCalledWith(200); 
        // expect(res.json).toBeCalledWith({
        //     "data": {
        //         "id": 8,
        //         "source_account_id": 2,
        //         "destination_account_id": 1,
        //         "amount": "100"
        //     }
        // }); 
    })
})