const Discord = require("discord.js");
const _ = require('lodash');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
const { MessageAttachment } = require('discord.js');

const pkg = require("../package.json");
const constants = require("./constants");

// Info Command
exports.info = (serverCount) => {
    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle('RSClan Bot')
        .setURL('https://top.gg/bot/803690098839126016')
        .setDescription(`Currently serving ${serverCount} RuneScape communities`)
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png')
        .addFields(
            { name: `Version ${pkg.version}`, value: 'Developed by Chadathan#0100 with support from Dark Perception' },
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
}

// Help Command
exports.help = (prefix) => {
    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle('RSClan Bot Commands')
        .setDescription('The RSClan Bot supports the following commands')
        .addFields(
            { name: `${prefix}info`, value: 'Displays bot info' },
            { name: `${prefix}help`, value: 'Displays bot commands' },
            { name: `${prefix}rsn "rsname"`, value: 'Assign a RSN to your Discord account' },
            { name: `${prefix}stats "rsn"`, value: 'Displays user\'s account levels and experience points' },
            { name: `${prefix}gains "rsn"`, value: 'Displays user\'s Daily, Yesterday, and Weekly XP Gains' },
            { name: `${prefix}ge "item"`, value: 'Displays item\'s current and previous Grand Exchange price' },
            { name: `${prefix}rax`, value: 'Displays current Araxxor paths' },
            { name: `${prefix}rago`, value: 'Displays current and next Vorago rotation' },
            { name: `${prefix}rots`, value: 'Displays current and next Rots rotation' },
            { name: `${prefix}alog "rsname"`, value: 'Displays user\'s Adventure Log' },
            { name: `${prefix}vis`, value: 'Displays current Rune combinations' },
            { name: `${prefix}merch`, value: 'Displays current and future Travelling Merchant items' },
            { name: `${prefix}raven`, value: 'Displays when the Raven will spawn in Prifddinas' },
            { name: `${prefix}nemi`, value: 'Displays current Nemi Forest Map' },
            { name: `${prefix}portables`, value: 'Displays currently spawned portables' },
            { name: `${prefix}vos`, value: 'Displays current Voice of Seren' }
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
}

// RSN Command
exports.rsn = (rsn) => {

    // Format RSN if spaced
    rsn = (rsn.includes('+')) ? _.startCase(rsn.replace('+', ' ')) : _.upperFirst(rsn)

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle('✅ RSN Assigned')
        .setDescription(`Assigned ${rsn} to your Discord account.`)
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
}

exports.stats = (data) => {

    if (data.error == 'PROFILE_PRIVATE') {
        console.log(`\t∟ RuneMetrics Profile is Private`);
        return constants.privateProfile;
    } else if (data.error == 'NO_PROFILE') {
        console.log(`\t∟ RuneMetrics Profile not found`);
        return constants.runeMetricsUnavailable;
    }

    let nf = new Intl.NumberFormat();

    let totalSkill = data.totalskill.toString();
    let totalExperience = data.totalxp.toString();

    let levels = [];
    let exp = [];
    for (let i = 0; i < data.skillvalues.length; i++) {
        levels[data.skillvalues[i].id] = data.skillvalues[i].level.toString();
        exp[data.skillvalues[i].id] = data.skillvalues[i].xp.toString();
    }

    // // Format Labels
    for (let i = 0; i < levels.length; i++) {
        levels[i] = levels[i].replace(/\s+/g, '');
        levels[i] = _.padStart(levels[i], 6, " ");

        exp[i] = exp[i].slice(0, -1);
        exp[i] = nf.format(exp[i]);
        exp[i] = exp[i].replace(/\s+/g, '');
        exp[i] = _.padStart(exp[i], 14, " ");
    }

    totalSkill = totalSkill.replace(/\s+/g, '');
    totalSkill = _.padStart(totalSkill, 6, " ");

    totalExperience = nf.format(totalExperience);
    totalExperience = totalExperience.replace(/\s+/g, '');
    totalExperience = _.padStart(totalExperience, 14, " ");

    let result = `**${data.name}'s Stats**\n\`\`\`swift\n`;
    result += `✚---------------------------------------✚
|     Skill     | Level |   Experience   |
|---------------|-------|----------------|
| Overall       |${totalSkill} | ${totalExperience} |
| Attack        |${levels[0]} | ${exp[0]} |
| Defence       |${levels[1]} | ${exp[1]} |
| Strength      |${levels[2]} | ${exp[2]} |
| Constitution  |${levels[3]} | ${exp[3]} |
| Ranged        |${levels[4]} | ${exp[4]} |
| Prayer        |${levels[5]} | ${exp[5]} |
| Magic         |${levels[6]} | ${exp[6]} |
| Cooking       |${levels[7]} | ${exp[7]} |
| Woodcutting   |${levels[8]} | ${exp[8]} |
| Fletching     |${levels[9]} | ${exp[9]} |
| Fishing       |${levels[10]} | ${exp[10]} |
| Firemaking    |${levels[11]} | ${exp[11]} |
| Crafting      |${levels[12]} | ${exp[12]} |
| Smithing      |${levels[13]} | ${exp[13]} |
| Mining        |${levels[14]} | ${exp[14]} |
| Herblore      |${levels[15]} | ${exp[15]} |
| Agility       |${levels[16]} | ${exp[16]} |
| Thieving      |${levels[17]} | ${exp[17]} |
| Slayer        |${levels[18]} | ${exp[18]} |
| Farming       |${levels[19]} | ${exp[19]} |
| Runecrafting  |${levels[20]} | ${exp[20]} |
| Hunter        |${levels[21]} | ${exp[21]} |
| Construction  |${levels[22]} | ${exp[22]} |
| Summoning     |${levels[23]} | ${exp[23]} |
| Dungeoneering |${levels[24]} | ${exp[24]} |
| Divination    |${levels[25]} | ${exp[25]} |
| Invention     |${levels[26]} | ${exp[26]} |
| Archaeology   |${levels[27]} | ${exp[27]} |
✚---------------------------------------✚
\`\`\``;

    return result;
}

// Daily Command
exports.daily = (data, user) => {
    let daily = [];
    let yesterday = [];
    let weekly = [];

    // Format RSN if spaced
    user = (user.includes('+')) ? _.startCase(user.replace('+', ' ')) : _.upperFirst(user)

    // Row, Column, Value
    // Daily Row
    for (let i = 1; i < 30; i++) {
        daily.push(data[i].children[4].children[0].data);
        yesterday.push(data[i].children[5].children[0].data);
        weekly.push(data[i].children[6].children[0].data);
    }

    // Format XP Labels
    for (let i = 0; i < daily.length; i++) {
        daily[i] = daily[i].replace(/\s+/g, '');
        daily[i] = _.padStart(daily[i], 9, " ");

        yesterday[i] = yesterday[i].replace(/\s+/g, '');
        yesterday[i] = _.padStart(yesterday[i], 10, " ");

        weekly[i] = weekly[i].replace(/\s+/g, '');
        weekly[i] = _.padStart(weekly[i], 10, " ");
    }

    let result = `**${user}'s XP Gains**\n\`\`\`swift\n`;
    result += `✚-------------------------------------------------✚
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
✚-------------------------------------------------✚
\`\`\``;

    return result;
}

// Rax Command
exports.rax = () => {

    // Find Rotation
    let firstRotationDate = new Date('June 11, 2021 00:00:00 GMT+0:00');

    let currentDate = new Date();

    let timeDifference = currentDate.getTime() - firstRotationDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    let numberOfRotations = Math.floor(daysDifference / 4);

    let closedPath = numberOfRotations % 3;

    let daysUntilRotation = 4 - (daysDifference % 4);

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Araxxor's Current Rotation`)
        .setDescription(`Days until next rotation: ${daysUntilRotation}`)
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/spooder.png')
        .addFields(
            { name: 'Path 1 (Minions)', value: `${(closedPath == 0) ? "Closed" : "Open"}` },
            { name: 'Path 2 (Acid)', value: `${(closedPath == 1) ? "Closed" : "Open"}` },
            { name: 'Path 3 (Darkness)', value: `${(closedPath == 2) ? "Closed" : "Open"}` },
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
}

// Rago Command
exports.rago = () => {

    let firstRotationDate = new Date('June 2, 2021 00:00:00 GMT+0:00');
    let currentDate = new Date();

    let timeDifference = currentDate.getTime() - firstRotationDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    let numberOfRotations = Math.floor(daysDifference / 7);

    let currentRotation = numberOfRotations % 6;

    let daysUntilRotation = 7 - (daysDifference % 7);

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Vorago's Current Rotation`)
        .setDescription(`Days Until Next Rotation: ${daysUntilRotation}`)
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/rago.png')
        .addFields(
            { name: 'Vorago Current', value: `${constants.voragoRotations[currentRotation]}` },
            { name: 'Vorago Next', value: `${constants.voragoRotations[(currentRotation + 1) % 6]}` },
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
}

// Rots Command
exports.rots = () => {

    let firstRotationDate = new Date('September 30, 2021 00:00:00 GMT+0:00');
    let currentDate = new Date();

    let timeDifference = currentDate.getTime() - firstRotationDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

    let index = daysDifference % 20;

    let rotation = constants.rotsRotations[index]
    let t_rotation = constants.rotsRotations[(index + 1) % 20]

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Rots Current Rotation`)
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/rots.png')
        .addFields(
            { name: 'West', value: `${rotation[0][0]}\n${rotation[0][1]}\n${rotation[0][2]}`, inline: true },
            { name: 'East', value: `${rotation[1][0]}\n${rotation[1][1]}\n${rotation[1][2]}`, inline: true },
            { name: 'Next Rotation', value: `**W:** ${t_rotation[0][0]}, ${t_rotation[0][1]}, ${t_rotation[0][2]}\n**E:** ${t_rotation[1][0]}, ${t_rotation[1][1]}, ${t_rotation[1][2]}`},
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
}

// Adventure Log Command
exports.log = (data) => {

    if (data.error == 'PROFILE_PRIVATE') {
        console.log(`\t∟ RuneMetrics Profile is Private`)
        return constants.privateProfile;
    } else if (data.error == 'NO_PROFILE') {
        console.log(`\t∟ RuneMetrics Unavailable`)
        return constants.runeMetricsUnavailable;
    }

    let username = data.name.replace(/ /g, '+');

    // Format log entries
    let entries = [];
    for(let i = 0; i <= 8; i++) {
        let entry = data.activities[i].text

        if (entry.includes("XP")) {
            let xp = entry.slice(0, entry.indexOf('X'))
            xp = xp.slice(0, xp.length - 6)

            let skill = entry.slice(entry.indexOf(' '), entry.length)
            entry = xp + " Million XP" + skill
        }

        entries[i] = entry
    }

    // Format log dates
    // Number suffix solution from https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
    function nth(n) { return ["st", "nd", "rd"][((n + 90) % 100 - 10) % 10 - 1] || "th" }
    let dates = [];
    for (let i = 0; i <= 8; i++) {
        let date = data.activities[i].date.replace(/-/g, ' ')
        let time = date.slice(-5)
        let day = date.slice(0, 2)
        let month = date.slice(3, 6)
        let year = date.slice(7, 11)

        date = `${month} ${day + nth(day)} ${year} at ${time}`

        dates[i] = date
    }

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`${data.name}'s Adventure Log`)
        .setThumbnail(`http://secure.runescape.com/m=avatar-rs/${username}/chat.png`)
        .addFields(
            { name: `${entries[0]}`, value: `${dates[0]}`},
            { name: `${entries[1]}`, value: `${dates[1]}`},
            { name: `${entries[2]}`, value: `${dates[2]}`},
            { name: `${entries[3]}`, value: `${dates[3]}`},
            { name: `${entries[4]}`, value: `${dates[4]}`},
            { name: `${entries[5]}`, value: `${dates[5]}`},
            { name: `${entries[6]}`, value: `${dates[6]}`},
            { name: `${entries[7]}`, value: `${dates[7]}`},
            { name: `${entries[8]}`, value: `${dates[8]}`},
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
}

// Vis Command
exports.vis = (data) => {
    let firstRune = data[0].children[1].children[2].children[0].children[2].attribs.alt;

    let secondRune = [
        data[0].children[1].children[6].children[0].children[2].attribs.alt,
        data[0].children[1].children[6].children[1].children[2].attribs.alt,
        data[0].children[1].children[6].children[2].children[2].attribs.alt
    ];

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Correct Rune Combinations`)
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/vis.png')
        .addFields(
            { name: `First Rune`, value: `${firstRune}`},
            { name: `Second Rune`, value: `${secondRune[0]}\n${secondRune[1]}\n${secondRune[2]}`},

        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
}

// Merchant Command
exports.merch = (data, future) => {

    let jsonData = data.parse.text["*"];
    let merchData = [];

    jsonData = jsonData.slice(jsonData.indexOf("{"));
    jsonData = jsonData.slice(0, jsonData.lastIndexOf("}") + 1);

    jsonData = jsonData.split('{"items":');
    jsonData.shift();

    for (let i = 0; i < jsonData.length; i++) {
        jsonData[i] = '{"items":' + jsonData[i];
        merchData[i] = JSON.parse(jsonData[i]);
    }

    let date = new Date();

    let futureDates = [];

    for(let i = 0; i < 7; i++) {
        date = new Date();
        futureDates[i] = date.setDate(date.getDate() + (i + 1));
        futureDates[i] = new Date(futureDates[i]);
    }

    let currentItems = [
        merchData[0].items[0].name,
        merchData[0].items[1].name,
        merchData[0].items[2].name
    ];

    let futureItems = [
        [
            `${futureDates[0].getUTCDate()} ${constants.months[futureDates[0].getUTCMonth()]} ${futureDates[0].getUTCFullYear()}`,
            merchData[1].items[0].name,
            merchData[1].items[1].name,
            merchData[1].items[2].name
        ],
        [
            `${futureDates[1].getUTCDate()} ${constants.months[futureDates[1].getUTCMonth()]} ${futureDates[1].getUTCFullYear()}`,
            merchData[2].items[0].name,
            merchData[2].items[1].name,
            merchData[2].items[2].name
        ],
        [
            `${futureDates[2].getUTCDate()} ${constants.months[futureDates[2].getUTCMonth()]} ${futureDates[2].getUTCFullYear()}`,
            merchData[3].items[0].name,
            merchData[3].items[1].name,
            merchData[3].items[2].name
        ],
        [
            `${futureDates[3].getUTCDate()} ${constants.months[futureDates[3].getUTCMonth()]} ${futureDates[3].getUTCFullYear()}`,
            merchData[4].items[0].name,
            merchData[4].items[1].name,
            merchData[4].items[2].name
        ],
        [
            `${futureDates[4].getUTCDate()} ${constants.months[futureDates[4].getUTCMonth()]} ${futureDates[4].getUTCFullYear()}`,
            merchData[5].items[0].name,
            merchData[5].items[1].name,
            merchData[5].items[2].name
        ],
        [
            `${futureDates[5].getUTCDate()} ${constants.months[futureDates[5].getUTCMonth()]} ${futureDates[5].getUTCFullYear()}`,
            merchData[6].items[0].name,
            merchData[6].items[1].name,
            merchData[6].items[2].name
        ],
        [
            `${futureDates[6].getUTCDate()} ${constants.months[futureDates[6].getUTCMonth()]} ${futureDates[6].getUTCFullYear()}`,
            merchData[7].items[0].name,
            merchData[7].items[1].name,
            merchData[7].items[2].name
        ]
    ];

    for(let i = 0; i < currentItems.length; i++) {
        currentItems[i] = currentItems[i].replace('&amp;', '&');
    }

    for(let i = 0; i < 7; i++) {
        for(let j = 0; j < 4; j++) {
            futureItems[i][j] = futureItems[i][j].replace('&amp;', '&');
        }
    }

    if (future) {
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
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
    } else {
        return {
            embed: new Discord.MessageEmbed()
                .setColor(constants.embedColor)
                .setTitle(`Travelling Merchant's Shop`)
                .addFields(
                    { name: `Current Items`, value: `${currentItems[0]}\n${currentItems[1]}\n${currentItems[2]}` },
                )
                .setTimestamp()
                .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png'),
            items: currentItems
        }
    }

}

// Raven Command
exports.raven = () => {

    // Number suffix solution from https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
    function nth(n){return["st","nd","rd"][((n+90)%100-10)%10-1]||"th"}

    let firstRotationDate = new Date('June 13, 2021 00:00:00 GMT+0:00');

    let currentDate = new Date();
  
    let timeDifference = currentDate.getTime() - firstRotationDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  
    let isSpawned = (daysDifference % 13 === 0);
  
    let daysUntilRotation = 13 - (daysDifference % 13);

    let nextSpawnDate = new Date(currentDate);
    nextSpawnDate.setDate(nextSpawnDate.getDate() + daysUntilRotation);

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Raven`)
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/raven.png')
        .setDescription((isSpawned) ? "The raven has spawned" : `The next raven will spawn in ${daysUntilRotation} days on ${constants.months[nextSpawnDate.getUTCMonth()]} ${nextSpawnDate.getUTCDate()}${nth(nextSpawnDate.getUTCDate())}`)
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
}

// Nemi Command
exports.nemi = (data) => {

    let title = data.data.children[0].data.title;
    let imageURL = data.data.children[0].data.url_overridden_by_dest;

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`NemiForest`)
        .setImage(imageURL)
        .setDescription(title)
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
}

// Portables Command
exports.portables = (data) => {

    let rows = data.table.rows;

    return new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Portables`)
        .setURL('https://docs.google.com/spreadsheets/d/16Yp-eLHQtgY05q6WBYA2MDyvQPmZ4Yr3RHYiBCBj2Hc/')
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/portables.png')
        .setDescription("Information provided by Portables FC")
        .addFields(
            { name: `Fletcher`, value: `${rows[4].c[1].v.replace(/\*/g, '')}`},
            { name: `Crafter`, value: `${rows[5].c[1].v.replace(/\*/g, '')}`},
            { name: `Brazier`, value: `${rows[6].c[1].v.replace(/\*/g, '')}`},
            { name: `Sawmill`, value: `${rows[7].c[1].v.replace(/\*/g, '')}`},
            { name: `Range`, value: `${rows[8].c[1].v.replace(/\*/g, '')}`},
            { name: `Well`, value: `${rows[9].c[1].v.replace(/\*/g, '')}`},
            { name: `Workbench`, value: `${rows[10].c[1].v.replace(/\*/g, '')}`},
        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');
}

// VoS Command
exports.vos = (data, message) => {
    let date = new Date();
    let updateTime = `${date.getUTCHours()}:00`

    let district1Embed = new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`${data.district1}`)
        .setDescription(`District 1`)
        .setImage(`https://github.com/Chad414/RSClan-Bot/blob/main/img/vos/${data.district1}.png?raw=true`)
        .setFooter(`ChadTek • Updated at ${updateTime} GMT`, 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');

    let district2Embed = new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`${data.district2}`)
        .setDescription(`District 2`)
        .setImage(`https://github.com/Chad414/RSClan-Bot/blob/main/img/vos/${data.district2}.png?raw=true`)
        .setFooter(`ChadTek • Updated at ${updateTime} GMT`, 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');

    if (message) {
        message.reply(district1Embed)
            .then(() => { })
            .catch(constants.handleError);

        message.reply(district2Embed)
            .then(() => { })
            .catch(constants.handleError);
    } else {
        return {
            embed1: district1Embed,
            embed2: district2Embed
        };
    }

}

// GE Command
exports.ge = (data, message) => {

    // Comma separators solution from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    function numberWithCommas(x) {return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");}

    if (data.error != undefined) {
        message.reply(constants.noItem);
        return;
    }
    
    let itemName;
    for (const i in data) {
        itemName = i;
    }

    const priceData = data[itemName];

    // Create graph
    let graphData = [];
    let labels = [];
    for (let i = 7; i < priceData.length; i += 7) {
        graphData.push(priceData[i].price);
        let date = new Date(priceData[i].timestamp);
        labels.push(`${constants.months[date.getMonth()]} ${date.getDate()}`);
    }
    graphData.push(priceData[priceData.length - 1].price);
    let date = new Date(priceData[priceData.length - 1].timestamp);
    labels.push(`${constants.months[date.getMonth()]} ${date.getDate()}`);

    const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'AliceBlue';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };

    const width = 420; //px
    const height = 220; //px
    const msg = message;
    const title = `${itemName}`
    const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

    (async () => {
        const configuration = {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{ 
                    data: graphData,
                    label: "Guide Price",
                    borderColor: "#3e95cd",
                    backgroundColor: "#7bb6dd",
                    fill: false,
                  }],
            },
            plugins: [plugin],
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: `${title}`,
                        color: 'black',
                    },
                    subtitle: {
                        display: true,
                        text: `${numberWithCommas(priceData[priceData.length - 1].price)} GP`,
                        color: 'black',
                        font: {
                            size: 14,
                            family: "Arial",
                            weight: "bold",
                            lineHeight: 0.5,
                        }
                    }
                },
                layout: {
                    padding: {
                        left: 6,
                    }
                }
            },
        };
        const image = await chartJSNodeCanvas.renderToBuffer(configuration);

        const attachment = new MessageAttachment(image);

        msg.reply(attachment);
    })();
}
