const Discord = require("discord.js");
const _ = require('lodash');
const constants = require("./constants");

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
