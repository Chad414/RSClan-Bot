const fs = require('fs');

let userDict = {};

function saveUser(id, rsn) {
    userDict[id] = rsn;

    const writeData = JSON.stringify(userDict, null, "\t");

    fs.writeFile('data/users.json', writeData, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("\t∟ RSN Saved to file");
    });
}

function getUser(id) {
    return userDict[id];
}

function loadUsers() {

    // Do not load data is file is empty
    fs.stat('data/users.json', (error, status) => {
        if (error) {
            console.log(error)
        }

        if (status.size != 0) {
            userDict = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
        }
    });
}

exports.saveUser = saveUser;
exports.getUser = getUser;
exports.loadUsers = loadUsers;
