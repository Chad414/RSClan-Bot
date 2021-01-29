const Discord = require("discord.js");
const _ = require('lodash');

const pkg = require("../package.json");
const constants = require("./constants");

// Info Command
function info() {
    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle('RSClan Bot')
        .setURL('https://github.com/Chad414/rsclan-discord-bot')
        .setDescription('The RSClan bot was created on 01/26/21')
        .setThumbnail('https://i.imgur.com/MJ5cEWu.png')
        .addFields(
            { name: `Version ${pkg.version}`, value: 'Please report issues to @Chadathan#0100' },
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://i.imgur.com/MJ5cEWu.png');
}

// Help Command
function help(prefix) {
    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle('RSClan Bot Commands')
        .setDescription('The RSClan Bot supports the following commands')
        .addFields(
            { name: `${prefix}ping`, value: 'Check bot latency' },
            { name: `${prefix}info`, value: 'Displays bot info' },
            { name: `${prefix}help`, value: 'Displays bot commands' },
            { name: `${prefix}rsn "rsname"`, value: 'Assign a RSN to your Discord account' },
            { name: `${prefix}gains "rsn"`, value: 'Display your Daily, Yesrday, and Weekly XP Gains' },
/*            { name: `${prefix}daily "rsname"`, value: 'Displays daily xp gain' },
            { name: `${prefix}yesterday "rsname"`, value: 'Displays yesterday\'s xp gain' },
            { name: `${prefix}weekly "rsname"`, value: 'Displays weekly xp gain' },*/
            { name: `${prefix}spooder`, value: 'Displays current Araxxor paths' },
            { name: `${prefix}rago`, value: 'Displays current and next Vorago rotation' },
            { name: `${prefix}alog "rsname"`, value: 'Displays user\'s Adventure Log' },
            { name: `${prefix}vis`, value: 'Displays current Rune combinations' },
            { name: `${prefix}merch`, value: 'Displays current and future Travelling Merchant items' }
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://i.imgur.com/MJ5cEWu.png');
}

// RSN Command
function rsn(rsn) {
    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle('RSN Assigned')
        .setDescription(`Assigned ${_.startCase(rsn.replace('+', ' '))} to your discord account.`)
        .setTimestamp()
        .setFooter('ChadTek', 'https://i.imgur.com/MJ5cEWu.png');
}

// Daily Command
function daily(data, user) {
    let daily = [];
    let yesterday = [];
    let weekly = [];
    let url = `https://www.runeclan.com/user/${rsn}`;

    // Format user string
    user = user.replace('+', ' ');
    user = _.startCase(user);

    // Row, Column, Value
    // Daily Row
    for (let i = 1; i < 30; i++) {
        daily.push(data[i].children[4].children[0].data);
    }

    // Yesterday Row
    for (let i = 1; i < 30; i++) {
        yesterday.push(data[i].children[5].children[0].data);
    }

    // Weekly Row
    for (let i = 1; i < 30; i++) {
        weekly.push(data[i].children[6].children[0].data);
    }

    // Format XP Labels
    for (let i = 0; i < daily.length; i++) {
        daily[i] = daily[i].replace(/\s+/g, '');
        daily[i] = _.padStart(daily[i], 9, " ");
    }

    for (let i = 0; i < yesterday.length; i++) {
        yesterday[i] = yesterday[i].replace(/\s+/g, '');
        yesterday[i] = _.padStart(yesterday[i], 10, " ");
    }

    for (let i = 0; i < weekly.length; i++) {
        weekly[i] = weekly[i].replace(/\s+/g, '');
        weekly[i] = _.padStart(weekly[i], 10, " ");
    }

    let result = `**${user}'s XP Gains**\n\`\`\`swift\n`;
    result += `✚--------------------------------------------------✚
|     Skill     |  Today   | Yesterday | This Week |
|---------------|----------|-----------|-----------|
| Overall       |${daily[0]} |${yesterday[0]} |${weekly[0]} |
| Attack        |${daily[1]} |${yesterday[1]} |${weekly[1]} |
| Defence       |${daily[2]} |${yesterday[2]} |${weekly[2]} |
| Strength      |${daily[3]} |${yesterday[3]} |${weekly[3]} |
| Constitution  |${daily[4]} |${yesterday[4]} |${weekly[4]} |
| Ranged        |${daily[5]} |${yesterday[5]} |${weekly[5]} |
| Prayer        |${daily[6]} |${yesterday[6]} |${weekly[6]} |
| Magic         |${daily[7]} |${yesterday[7]} |${weekly[7]} |
| Cooking       |${daily[8]} |${yesterday[8]} |${weekly[8]} |
| Woodcutting   |${daily[9]} |${yesterday[9]} |${weekly[9]} |
| Fletching     |${daily[10]} |${yesterday[10]} |${weekly[10]} |
| Fishing       |${daily[11]} |${yesterday[11]} |${weekly[11]} |
| Firemaking    |${daily[12]} |${yesterday[12]} |${weekly[12]} |
| Crafting      |${daily[13]} |${yesterday[13]} |${weekly[13]} |
| Smithing      |${daily[14]} |${yesterday[14]} |${weekly[14]} |
| Mining        |${daily[15]} |${yesterday[15]} |${weekly[15]} |
| Herblore      |${daily[16]} |${yesterday[16]} |${weekly[16]} |
| Agility       |${daily[17]} |${yesterday[17]} |${weekly[17]} |
| Thieving      |${daily[18]} |${yesterday[18]} |${weekly[18]} |
| Slayer        |${daily[19]} |${yesterday[19]} |${weekly[19]} |
| Farming       |${daily[20]} |${yesterday[20]} |${weekly[20]} |
| Runecrafting  |${daily[21]} |${yesterday[21]} |${weekly[21]} |
| Hunter        |${daily[22]} |${yesterday[22]} |${weekly[22]} |
| Construction  |${daily[23]} |${yesterday[23]} |${weekly[23]} |
| Summoning     |${daily[24]} |${yesterday[24]} |${weekly[24]} |
| Dungeoneering |${daily[25]} |${yesterday[25]} |${weekly[25]} |
| Divination    |${daily[26]} |${yesterday[26]} |${weekly[26]} |
| Invention     |${daily[27]} |${yesterday[27]} |${weekly[27]} |
| Archaeology   |${daily[28]} |${yesterday[28]} |${weekly[28]} |
✚--------------------------------------------------✚
\`\`\``;

    return result;
}

// Weekly Command
function weekly(data, user) {
    let xp = [];

    // Format user string
    user = user.replace('+', ' ');
    user = _.startCase(user);

    // Row, Column, Value
    // Weekly Row
    for (let i = 1; i < 30; i++) {
        xp.push(data[i].children[6].children[0].data);
    }

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`${user}'s Weekly XP Gains`)
        .setDescription(`Attack: ${xp[1]}
            \nDefence: ${xp[2]}
            \nStrength: ${xp[3]}
            \nConstitution: ${xp[4]}
            \nRanged: ${xp[5]}
            \nPrayer: ${xp[6]}
            \nMagic: ${xp[7]}
            \nCooking: ${xp[8]}
            \nWoodcutting: ${xp[9]}
            \nFletching: ${xp[10]}
            \nFishing: ${xp[11]}
            \nFiremaking: ${xp[12]}
            \nCrafting: ${xp[13]}
            \nSmithing: ${xp[14]}
            \nMining: ${xp[15]}
            \nHerblore: ${xp[16]}
            \nAgility: ${xp[17]}
            \nThieving: ${xp[18]}
            \nSlayer: ${xp[19]}
            \nFarming: ${xp[20]}
            \nRunecrafting: ${xp[21]}
            \nHunter: ${xp[22]}
            \nConstruction: ${xp[23]}
            \nSummoning: ${xp[24]}
            \nDungeoneering: ${xp[25]}
            \nDivination: ${xp[26]}
            \nInvention: ${xp[27]}
            \nArchaeology: ${xp[28]}`)
        .setThumbnail('https://i.imgur.com/XMgKR8S.png')
        .addField('\u100b', '\u100b')
        .addFields(
            { name: `Overall: ${xp[0]}`, value: `Provided by RuneClan\n` },
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://i.imgur.com/MJ5cEWu.png');
}

// Yesterday Command
function yesterday(data, user) {
    let xp = [];

    // Format user string
    user = user.replace('+', ' ');
    user = _.startCase(user);

    // Row, Column, Value
    // Yesterday Row
    for (let i = 1; i < 30; i++) {
        xp.push(data[i].children[5].children[0].data);
    }

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`${user}'s Yesterday XP Gains`)
        .setDescription(`Attack: ${xp[1]}
            \nDefence: ${xp[2]}
            \nStrength: ${xp[3]}
            \nConstitution: ${xp[4]}
            \nRanged: ${xp[5]}
            \nPrayer: ${xp[6]}
            \nMagic: ${xp[7]}
            \nCooking: ${xp[8]}
            \nWoodcutting: ${xp[9]}
            \nFletching: ${xp[10]}
            \nFishing: ${xp[11]}
            \nFiremaking: ${xp[12]}
            \nCrafting: ${xp[13]}
            \nSmithing: ${xp[14]}
            \nMining: ${xp[15]}
            \nHerblore: ${xp[16]}
            \nAgility: ${xp[17]}
            \nThieving: ${xp[18]}
            \nSlayer: ${xp[19]}
            \nFarming: ${xp[20]}
            \nRunecrafting: ${xp[21]}
            \nHunter: ${xp[22]}
            \nConstruction: ${xp[23]}
            \nSummoning: ${xp[24]}
            \nDungeoneering: ${xp[25]}
            \nDivination: ${xp[26]}
            \nInvention: ${xp[27]}
            \nArchaeology: ${xp[28]}`)
        .setThumbnail('https://i.imgur.com/XMgKR8S.png')
        .addField('\u100b', '\u100b')
        .addFields(
            { name: `Overall: ${xp[0]}`, value: `Provided by RuneClan\n` },
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://i.imgur.com/MJ5cEWu.png');
}

// Spooder Command
function spooder(data) {

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Araxxor's Current Rotation`)
        .setDescription(`${data[0].children[0].children[2].children[0].children[0].data}`)
        .setThumbnail('https://i.imgur.com/WNIlW3T.png')
        .addFields(
            { name: 'Path 1 (Minions)', value: `${data[0].children[0].children[1].children[0].children[0].data}`},
            { name: 'Path 2 (Acid)', value: `${data[0].children[0].children[1].children[1].children[0].data}`},
            { name: 'Path 3 (Darkness)', value: `${data[0].children[0].children[1].children[2].children[0].data}`},
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://i.imgur.com/MJ5cEWu.png');

    return result;
}

// Rago Command
function rago(data) {

    // Get current rotation
    let currentRotation = data[0].children[0].data;

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

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Vorago's Current Rotation`)
        .setDescription(`Days Until Next Rotation: ${daysLeft}`)
        .setThumbnail('https://i.imgur.com/J4UZu2M.png')
        .addFields(
            { name: 'Vorago Current', value: `${currentRotation}`},
            { name: 'Vorago Next', value: `${nextRotation}`},
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://i.imgur.com/MJ5cEWu.png');
}

// Adventure Log Command
function log(data) {
    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`${data.name}'s Adventure Log`)
        .setThumbnail('https://i.imgur.com/LWcpp7Y.png')
        .addFields(
            { name: `${data.activities[0].title}`, value: `${data.activities[0].date}`},
            { name: `${data.activities[1].title}`, value: `${data.activities[1].date}`},
            { name: `${data.activities[2].title}`, value: `${data.activities[2].date}`},
            { name: `${data.activities[3].title}`, value: `${data.activities[3].date}`},
            { name: `${data.activities[4].title}`, value: `${data.activities[4].date}`},
            { name: `${data.activities[5].title}`, value: `${data.activities[5].date}`},
            { name: `${data.activities[6].title}`, value: `${data.activities[6].date}`},
            { name: `${data.activities[7].title}`, value: `${data.activities[7].date}`},
            { name: `${data.activities[8].title}`, value: `${data.activities[9].date}`},
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://i.imgur.com/MJ5cEWu.png');
}

// Vis Command
function vis(data) {
    let firstRune = data[0].children[1].children[2].children[0].children[2].attribs.alt;

    let secondRune = [
        data[0].children[1].children[6].children[0].children[2].attribs.alt,
        data[0].children[1].children[6].children[1].children[2].attribs.alt,
        data[0].children[1].children[6].children[2].children[2].attribs.alt
    ];

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Correct Rune Combinations`)
        .setThumbnail('https://i.imgur.com/qsRI2mS.png')
        .addFields(
            { name: `First Rune`, value: `${firstRune}`},
            { name: `Second Rune`, value: `${secondRune[0]}\n${secondRune[1]}\n${secondRune[2]}`},

        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://i.imgur.com/MJ5cEWu.png');
}

// Merchant Command
function merch(data) {

    let currentItems = [
        data[0].children[0].children[1].children[1].children[0].attribs.title,
        data[0].children[0].children[1].children[2].children[0].attribs.title,
        data[0].children[0].children[1].children[3].children[0].attribs.title
    ];

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

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Travelling Merchant's Shop`)
        .addFields(
            { name: `Current Items`, value: `${currentItems[0]}\n${currentItems[1]}\n${currentItems[2]}`},
            { name: `${futureItems[0][0]}`, value: `${futureItems[0][1]}\n${futureItems[0][2]}\n${futureItems[0][3]}`},
            { name: `${futureItems[1][0]}`, value: `${futureItems[1][1]}\n${futureItems[1][2]}\n${futureItems[1][3]}`},
            { name: `${futureItems[2][0]}`, value: `${futureItems[2][1]}\n${futureItems[2][2]}\n${futureItems[2][3]}`},
            { name: `${futureItems[3][0]}`, value: `${futureItems[3][1]}\n${futureItems[3][2]}\n${futureItems[3][3]}`},
            { name: `${futureItems[4][0]}`, value: `${futureItems[4][1]}\n${futureItems[4][2]}\n${futureItems[4][3]}`},
            { name: `${futureItems[5][0]}`, value: `${futureItems[5][1]}\n${futureItems[5][2]}\n${futureItems[5][3]}`},
            { name: `${futureItems[6][0]}`, value: `${futureItems[6][1]}\n${futureItems[6][2]}\n${futureItems[6][3]}`},
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://i.imgur.com/MJ5cEWu.png');
}

exports.info = info;
exports.help = help;
exports.rsn = rsn;
exports.daily = daily;
exports.weekly = weekly;
exports.yesterday = yesterday;
exports.spooder = spooder;
exports.rago = rago;
exports.log = log;
exports.vis = vis;
exports.merch = merch;
