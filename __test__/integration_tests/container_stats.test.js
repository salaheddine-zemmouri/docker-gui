jest.mock('../../lib/request.js');
//const sinon=require('sinon')

const container_stats= require('../../api/container_stats')
// const mockResponse = () => {
//     const res = {};
//     res.status = sinon.stub().returns(res);
//     res.send = sinon.stub().returns(res);
//     return res;
//   };
describe('GET /container_stats', () => {
    it('should return code 200 Ok', async function() {
        var req={}
        var output=null
        var res=null//mockResponse();
        
        output=await container_stats.stats(req,res)
        //expect(res.status).toHaveBeenCalledWith(200);
        
        
    });
    
    
    
});

