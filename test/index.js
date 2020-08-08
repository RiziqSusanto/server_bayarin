const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../app');
const fs = require('fs');

chai.use(chaiHttp);

describe('API ENDPOINT TESTING', () => {
    it('GET Bank', (done) => {
        chai.request(app).get('/api/v1/member/bank').end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('bank')
            expect(res.body.bank).to.have.an('array')
            done()
        })
    })

    it('POST Booking Page', (done) => {
        const image = __dirname + '/bukti.jpeg';
        const dataSample = {
            image,
            transaksiDate: '9-4-2020',
            firstName: 'itce',
            lastName: 'diasari',
            phoneNumber: '08150008989',
            nisnMurid: '181910102',
            namaMurid: 'Ini Percobaan',
            accountHolder: 'itce',
            bankFrom: 'BNI',
        }
        chai.request(app).post('/api/v1/member/home')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .field('transaksiDate', dataSample.transaksiDate)
            .field('firstName', dataSample.firstName)
            .field('lastName', dataSample.lastName)
            .field('phoneNumber', dataSample.phoneNumber)
            .field('nisnMurid', dataSample.nisnMurid)
            .field('namaMurid', dataSample.namaMurid)
            .field('accountHolder', dataSample.accountHolder)
            .field('bankFrom', dataSample.bankFrom)
            .attach('image', fs.readFileSync(dataSample.image), 'bukti.jpeg')
            .end((err, res) => {
                expect(err).to.be.null
                expect(res).to.have.status(201)
                expect(res.body).to.be.an('object')
                expect(res.body).to.have.property('message')
                expect(res.body.message).to.equal('Success Transaksi')
                expect(res.body).to.have.property('transaksi')
                expect(res.body.transaksi).to.have.all.keys('payments', '_id', 'invoice', 'transaksiDate', 'namaMurid', 'nisnMurid', 'memberId', '__v')
                expect(res.body.transaksi.payments).to.have.all.keys('status', 'proofPayment', 'bankFrom', 'accountHolder')
                done();
            })
    })
})