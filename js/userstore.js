const fs = require('fs');

let userDict = {};

function saveUser(id, rsn) {
    userDict[id] = rsn;

    const writeData = JSON.stringify(userDict, null, "\t");

    fs.writeFile('users.json', writeData, (err) => {
        if (err) {
            console.log(err);
            throw err;
        }
        console.log("RSN Saved to file.");
    });
}

function getUser(id) {
    return userDict[id];
}

function loadUsers() {
    userDict = JSON.parse(fs.readFileSync('users.json', 'utf-8'));
}

exports.saveUser = saveUser;
exports.getUser = getUser;
exports.loadUsers = loadUsers;
