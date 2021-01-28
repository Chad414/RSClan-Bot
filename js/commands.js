const _ = require('lodash');
const constants = require("./constants");

// Help Command
function help(prefix) {
    return `\n\`\`\`The RSClan Bot supports the following commands:\n
${prefix}ping                - Check bot latency
${prefix}info                - Displays bot info
${prefix}help                - Displays bot commands
${prefix}rsn "rsname"        - Add an RSN to your Discord account
${prefix}daily "rsname"      - Displays daily xp gain
${prefix}yesterday "rsname"  - Displays yesterday's xp gain
${prefix}weekly "rsname"     - Displays weekly xp gain
${prefix}spooder             - Displays current Araxxor paths
${prefix}rago                - Displays current and next Vorago rotation
${prefix}alog "rsname"       - Displays user's Adventure Log
${prefix}vis                 - Displays current Rune combinations
${prefix}merch               - Displays current and future Travelling Merchant items\n\`\`\``;
}

// Daily Command
function daily(data, user) {
    let xp = [];

    // Format user string
    user = user.replace('+', ' ');
    user = _.startCase(user);

    // Row, Column, Value
    // Daily Row = 4
    for (let i = 1; i < 30; i++) {
        xp.push(data[i].children[4].children[0].data);
    }

    let result = '\n```';
    result += `----- ${user}'s Daily Gainz -----\n`;
    for (let i = 0; i < xp.length; i++) {
        result += `${constants.skills[i]}\t${xp[i]} \n`;
    }
    result += '```';

    return result;
}

// Weekly Command
function weekly(data, user) {
    let xp = [];

    // Format user string
    user = user.replace('+', ' ');
    user = _.startCase(user);

    // Row, Column, Value
    // Daily Row = 4
    for (let i = 1; i < 30; i++) {
        xp.push(data[i].children[6].children[0].data);
    }

    let result = '\n```';
    result += `----- ${user}'s Weekly Gainz -----\n`;
    for (let i = 0; i < xp.length; i++) {
        result += `${constants.skills[i]}\t${xp[i]} \n`;
    }
    result += '```';

    return result;
}

// Yesterday Command
function yesterday(data, user) {
    let xp = [];

    // Format user string
    user = user.replace('+', ' ');
    user = _.startCase(user);

    // Row, Column, Value
    // Daily Row = 4
    for (let i = 1; i < 30; i++) {
        xp.push(data[i].children[5].children[0].data);
    }

    let result = '\n```';
    result += `----- ${user}'s Yesterday Gainz -----\n`;
    for (let i = 0; i < xp.length; i++) {
        result += `${constants.skills[i]}\t${xp[i]} \n`;
    }
    result += '```';

    return result;
}

// Spooder Command
function spooder(data) {
    let result = '\n```';

    result += `Path 1 (Minions):  ${data[0].children[0].children[1].children[0].children[0].data}\n`;
    result += `Path 2 (Acid):     ${data[0].children[0].children[1].children[1].children[0].data}\n`;
    result += `Path 3 (Darkness): ${data[0].children[0].children[1].children[2].children[0].data}\n`;
    result += `${data[0].children[0].children[2].children[0].children[0].data}\n`;

    result += '```';

    return result;
}

// Rago Command
function rago(data) {
    let result = '\n```';

    // Get current rotation
    let currentRotation = data[0].children[0].data;
    result += `Vorago Current:  ${currentRotation}\n`;

    // Find next rotation
    let nextRotation;
    switch (currentRotation) {
        case 'Ceiling collapse':
            nextRotation = 'Scopulus';
            break;
        case 'Scopulus':
            nextRotation = 'Vitalis';
            break;
        case 'Vitalis':
            nextRotation = 'Green bomb';
            break;
        case 'Green bomb':
            nextRotation = 'Team Split';
            break;
        case 'Team Split':
            nextRotation = 'The end';
            break;
        case 'The end':
            nextRotation = 'Ceiling collapse';
            break;
    }
    result += `Vorago Next:  ${nextRotation}\n`;

    // Find days left until rotation
    const d = new Date();
    let daysLeft;
    switch (d.getUTCDay()) {
        case 0:
            daysLeft = 3;
            break;
        case 1:
            daysLeft = 2;
            break;
        case 2:
            daysLeft = 1;
            break;
        case 3:
            daysLeft = 7;
            break;
        case 4:
            daysLeft = 6;
            break;
        case 5:
            daysLeft = 5;
            break;
        case 6:
            daysLeft = 4;
            break;
    }
    result += `Days Until Next Rotation: ${daysLeft}\n`;

    result += '```';

    return result;
}

// Adventure Log Command
function log(data) {
    let result = '\n```';

    result += `----- ${data.name}'s Adventure Log -----\n`;

    for (let i = data.activities.length - 1; i >= 8; i--) {
        result += `${data.activities[i].date}\n\t${data.activities[i].title}\n\n`;
    }

    result += '```';

    return result;
}

// Vis Command
function vis(data) {
    let result = '\n```';

    let firstRune = data[0].children[1].children[2].children[0].children[2].attribs.alt;
    result += `First Rune:\n\t${firstRune}\n`;

    let secondRune = [
        data[0].children[1].children[6].children[0].children[2].attribs.alt,
        data[0].children[1].children[6].children[1].children[2].attribs.alt,
        data[0].children[1].children[6].children[2].children[2].attribs.alt
    ];

    result += `Second Runes:\n\t${secondRune[0]}\n\t${secondRune[1]}\n\t${secondRune[2]}`;

    result += '```';

    return result;
}

// Merchant Command
function merch(data) {
    let result = '\n```';

    let currentItems = [
        data[0].children[0].children[1].children[1].children[0].attribs.title,
        data[0].children[0].children[1].children[2].children[0].attribs.title,
        data[0].children[0].children[1].children[3].children[0].attribs.title
    ];

    result += `----- Travelling Merchant's Shop -----\n`;

    result += `Current Items:\n\t${currentItems[0]} - ${currentItems[1]} - ${currentItems[2]}\n\n`;

    let futureItems = [
        [
            data[0].children[0].children[2].children[0].children[0].data,
            data[0].children[0].children[2].children[1].children[0].attribs.title,
            data[0].children[0].children[2].children[2].children[0].attribs.title,
            data[0].children[0].children[2].children[3].children[0].attribs.title
        ],
        [
            data[0].children[0].children[3].children[0].children[0].data,
            data[0].children[0].children[3].children[1].children[0].attribs.title,
            data[0].children[0].children[3].children[2].children[0].attribs.title,
            data[0].children[0].children[3].children[3].children[0].attribs.title
        ],
        [
            data[0].children[0].children[4].children[0].children[0].data,
            data[0].children[0].children[4].children[1].children[0].attribs.title,
            data[0].children[0].children[4].children[2].children[0].attribs.title,
            data[0].children[0].children[4].children[3].children[0].attribs.title
        ],
        [
            data[0].children[0].children[5].children[0].children[0].data,
            data[0].children[0].children[5].children[1].children[0].attribs.title,
            data[0].children[0].children[5].children[2].children[0].attribs.title,
            data[0].children[0].children[5].children[3].children[0].attribs.title
        ],
        [
            data[0].children[0].children[6].children[0].children[0].data,
            data[0].children[0].children[6].children[1].children[0].attribs.title,
            data[0].children[0].children[6].children[2].children[0].attribs.title,
            data[0].children[0].children[6].children[3].children[0].attribs.title
        ],
        [
            data[0].children[0].children[7].children[0].children[0].data,
            data[0].children[0].children[7].children[1].children[0].attribs.title,
            data[0].children[0].children[7].children[2].children[0].attribs.title,
            data[0].children[0].children[7].children[3].children[0].attribs.title
        ],
        [
            data[0].children[0].children[8].children[0].children[0].data,
            data[0].children[0].children[8].children[1].children[0].attribs.title,
            data[0].children[0].children[8].children[2].children[0].attribs.title,
            data[0].children[0].children[8].children[3].children[0].attribs.title
        ]
    ];

    result += `Future Items:\n`;
    for (let i = 0; i < futureItems.length; i++) {
        result += `${futureItems[i][0]}\n`
        result += `\t${futureItems[i][1]} - ${futureItems[i][2]} - ${futureItems[i][3]}\n`;
    }

    result += '```';

    return result;
}

exports.help = help;
exports.daily = daily;
exports.weekly = weekly;
exports.yesterday = yesterday;
exports.spooder = spooder;
exports.rago = rago;
exports.log = log;
exports.vis = vis;
exports.merch = merch;
