const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../index');
const should = chai.should();
const expect = chai.expect;

describe('GET /containers/:id/logs', () => {
    it('should return code 200 Ok', async function() {
        const res = await chai.request(app)
            .get('/api/v1/containers')
            .send();
        
        const res2 = await chai.request(app)
            .get(`/api/v1/containers/${res.body[0].Id}/logs`)
            .send();
        expect(res2.status).to.equal(200)
        
    });

    it('should return code 404 not found', async function() {
        const res = await chai.request(app)
            .get(`/api/v1/containers//logs`)
            .send();
        expect(res.status).to.equal(404)
        
    });
  });

  describe('GET /container_stats', () => {
    it('should return code 200 Ok', async function() {
        
        const res = await chai.request(app)
            .get(`/api/v1/container_stats`)
            .send();
        expect(res.status).to.equal(200)
        
    });

    it('should return at least these properties', async function() {
        const res = await chai.request(app)
            .get(`/api/v1/container_stats`)
            .send();
        expect(res.body).to.have.property('total_memory_usage')
        expect(res.body).to.have.property('total_cpu_usage')
        expect(res.body).to.have.property('containers_stats')
        
    });
  });

