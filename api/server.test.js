const request = require('supertest')
const server = require('./server')


const testUser = {username: 'test', password: 'test'}

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})

describe('server.js', () => {

  describe('[GET] /api/jokes', () => {

      it('should return status code 401', async () => {
          const res = await request(server).get('/api/jokes')
          expect(res.status).toBe(401);
      });
      
      it('should return format json', async() => {
          const res = await request(server).get('/api/jokes');
          expect(res.type).toBe('application/json')
      });
  });


  describe("[POST] /api/auth/register", () => {

    it('should err if missing params', async () => {
        const res = await request(server)
        .post('/api/auth/register')
        .send(testUser);
        expect(res.statusCode).toBe(500);
        expect(res.type).toBe('application/json');
    
    });

      it('invalid request returning status code  500', async () => {
          const res = await request(server)
          .post('/api/auth/register')
          .send({username: "marius", password: "marius" });
          expect(res.status).toBe(500);
      });
  });

  describe("[POST]/api/auth/login", ()=> {

      it('returns status code 500 when invalid credentials are provided', async () => {
          const res = await request(server)
          .post('/api/auth/login')
          .send(testUser);
          expect(res.status).toBe(500)
      })

      it('returns status code 500 when  credentials are not  provided', async () => {
          const res = await request(server)
          .post('/api/auth/login')
          .send({ username: 'marius', password: 'n/a' })
          expect(res.status).toBe(500)
      })
  });
});