const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');
//export and compile solidity code --sol file --number of contracts to compile
module.exports = solc.compile(source, 1).contracts[':Inbox'];