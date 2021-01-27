const Discord = require("discord.js");
const rp = require('request-promise');
const rs = require('runescape-api');
const $ = require('cheerio');
const config = require("./config.json");
const constants = require("./js/constants");

const client = new Discord.Client();

const commandPrefix = "::";

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(commandPrefix)) return;

    const commandBody = message.content.slice(commandPrefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    // Print Command Information to Console
    console.log('Message: ' + message.content);
    console.log('Command: ' + command);
    console.log('Arguments: ' + args);

    switch (command) {
        case "ping":
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
            break;
        case "gainz":
            let gainzUser = '';
            for (i of args) {
                gainzUser += `${i}+`;
            }
            gainzUser = gainzUser.slice(0, gainzUser.length - 1);
            rp(`https://www.runeclan.com/user/${gainzUser}`).then(function (html) {
                    const data = $('tr', html);

                    // Process Data Here
                    let response = processDaily(data, gainzUser);

                    message.reply(response);
                }).catch(function (err) {

                });
            break;
        case "weekly":
            let weeklyUser = '';
            for (i of args) {
                weeklyUser += `${i}+`;
            }
            weeklyUser = weeklyUser.slice(0, weeklyUser.length - 1);
            rp(`https://www.runeclan.com/user/${weeklyUser}`).then(function (html) {
                const data = $('tr', html);

                // Process Data Here
                let response = processWeekly(data, weeklyUser);

                message.reply(response);
            }).catch(function (err) {

            });
            break;
        case "spooder":
            rp('https://runescape.wiki/w/Araxxor').then(function (html) {
                const data = $('#reload', html);

                // Process Data Here
                let response = processSpooder(data);

                message.reply(response);
            }).catch(function (err) {

            });
            break;
        case "rago":
            rp('https://runescape.wiki/w/Vorago').then(function (html) {
                const data = $('.table-bg-green', html);

                // Process Data Here
                let response = processRago(data);

                message.reply(response);
            }).catch(function (err) {

            });
            break;
        case "alog":
            let alogUser = '';
            for (i of args) {
                alogUser += `${i}_`;
            }
            alogUser = alogUser.slice(0, alogUser.length - 1);
            rs.runemetrics.getProfile(alogUser).then(data => {
                let response = processLog(data);

                message.reply(response);
            })
            break;
        case "vis":
            rp('https://warbandtracker.com/goldberg/').then(function (html) {
                const data = $('.worldTable', html);

                // Process Data Here
                let response = processVis(data);

                message.reply(response);
            }).catch(function (err) {

            });
            break;
        case "merch":
            rp('https://runescape.wiki/w/Travelling_Merchant%27s_Shop/Future').then(function (html) {
                const data = $('.wikitable', html);

                // Process Data Here
                let response = processMerch(data);

                message.reply(response);
            }).catch(function (err) {

            });
            break;
    }
});

client.login(config.BOT_TOKEN);

// Command Functions
function processDaily(data, user) {
    let xp = [];

    // Row, Column, Value
    // Daily Row = 4
    for (let i = 1; i < 30; i++) {
        xp.push(data[i].children[4].children[0].data);
    }

    let result = '\n```';
    result += `----- Daily Gainz -----\n`;
    for (let i = 0; i < xp.length; i++) {
        result += `${constants.skills[i]}\t${xp[i]} \n`;
    }
    result += '```';

    return result;
}

function processWeekly(data, user) {
    let xp = [];

    // Row, Column, Value
    // Daily Row = 4
    for (let i = 1; i < 30; i++) {
        xp.push(data[i].children[6].children[0].data);
    }

    let result = '\n```';
    result += `----- Weekly Gainz -----\n`;
    for (let i = 0; i < xp.length; i++) {
        result += `${constants.skills[i]}\t${xp[i]} \n`;
    }
    result += '```';

    return result;
}

function processSpooder(data) {
    let result = '\n```';

    result += `Path 1 (Minions):  ${data[0].children[0].children[1].children[0].children[0].data}\n`;
    result += `Path 2 (Acid):     ${data[0].children[0].children[1].children[1].children[0].data}\n`;
    result += `Path 3 (Darkness): ${data[0].children[0].children[1].children[2].children[0].data}\n`;
    result += `${data[0].children[0].children[2].children[0].children[0].data}\n`;

    result += '```';

    return result;
}

function processRago(data) {
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

function processLog(data) {
    let result = '\n```';

    result += `----- ${data.name}'s Adventure Log -----\n`;

    for (let i = data.activities.length - 1; i >= 0; i--) {
        result += `${data.activities[i].date}\n\t${data.activities[i].title}\n\n`;
    }

    result += '```';

    return result;
}

function processVis(data) {
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

function processMerch(data) {
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