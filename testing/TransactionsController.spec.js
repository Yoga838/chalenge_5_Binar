const base = require('../controllers/TransactionsController');

const mockRequest = (body = {}) => ({ body });
const mockRequestParams = (params = {}) => ({ params });
const mockResponse = () => {
    const res = {};
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
};

describe("Transactions API Test", () => {
    test("Get Data Transactions", async() => {
        const req = mockRequest(); 
        const res = mockResponse();
        await base.getAllTransactions(req,res);

        expect(res.status).toBeCalledWith(200); 
    });
    test("Get Data Detail Transactions", async() =>{
        const req = mockRequestParams({id:1})
        const res = mockResponse()
        await base.getDetailTransaction(req,res)
        
        expect(res.status).toBeCalledWith(200); 
    }),
    test("Make Data Transactions", async() =>{
        const req = mockRequest({
            "source_account_id":2,
            "destination_account_id":1,
            "amount":100
        })
        const res = mockResponse()
        await base.makeTransactions(req,res)
        
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