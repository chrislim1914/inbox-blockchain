const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    //get list of all accouct
    accounts = await web3.eth.getAccounts();

    //use one account to deploy
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['Say Something'] })
        .send({ from: accounts[0], gas: '1000000' });
        
});

describe('Inbox', () => {
    it('should deploy contacts', () => {
        assert.ok(inbox.options.address);
    });

    it('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Say Something');
    })

    it('can set new message', async () => {
        await inbox.methods.setMessage('Ok!').send({ from: accounts[0]});
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Ok!');
    });
});

// class Car {
//     park() {
//         return 'stopped';
//     }

//     drive() {
//         return 'broom';
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// });

// describe('Car', () => {

//     it('should park', () => {
//         assert.equal(car.park(), 'stopped');
//     });

//     it('should drive', () => {
//         assert.equal(car.drive(), 'broom');      
//     });
// });