const base = require('../controllers/AccountController');

const mockRequest = (body = {}) => ({ body });
const mockRequestParams = (params = {}) => ({ params });
const mockResponse = () => {
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
};

describe("Account API Test", () => {
    test("Get Data Account", async() => {
        const req = mockRequest(); 
        const res = mockResponse();
        await base.getAccounnt(req,res);

        expect(res.status).toBeCalledWith(200); 
    });
    test("Get Detail Data Account By ID", async() => {
        const req = mockRequestParams({id : 1}); 
        const res = mockResponse();
        await base.getDetailAccount(req,res)
        expect(res.status).toBeCalledWith(200)

        // expect (res.json).toBeCalledWith({
        //     "data": {
        //         "id": 1,
        //         "bank_name": "yoga",
        //         "bank_account_number": "1fe0abbd-9e64-4da5-afab-dbafd120cdce",
        //         "balance": "3000",
        //         "user_id": 1
        //     }
        // })
    } ),
    test("Register  Account", async() => {
        const req = mockRequest({
            "id":5,
            "balance":3000
        }); 
        const res = mockResponse();
        await base.registerAccount(req,res)

        expect(res.status).toBeCalledWith(200); 
    });
});
