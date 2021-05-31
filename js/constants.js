const Discord = require("discord.js");

const embedColor = '1c22d4';

const commands = [
    "ping",
    "info",
    "help",
    "setrsn",
    "rsn",
    "skills",
    "skillz",
    "stats",
    "daily",
    "gains",
    "gainz",
    "yesterday",
    "weekly",
    "spooder",
    "rago",
    "alog",
    "vis",
    "merch",
    "raven",
    "nemi",
    "portables",
    "vos"
]

const skills = [
    'Attack',
    'Defence',
    'Strength',
    'Constitution',
    'Ranged',
    'Prayer',
    'Magic',
    'Cooking',
    'Woodcutting',
    'Fletching',
    'Fishing',
    'Firemaking',
    'Crafting',
    'Smithing',
    'Mining',
    'Herblore',
    'Agility',
    'Thieving',
    'Slayer',
    'Farming',
    'Runecrafting',
    'Hunter',
    'Construction',
    'Summoning',
    'Dungeoneering',
    'Divination',
    'Invention',
    'Archaeology'
];

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
]

const vosChannels = [
    "844326270418550804"
]

const merchChannels = [
    "848927179714723870"
]

const vosRoles = (district) => {
    switch (district) {
        case 'Amlodd':
            return '<@&825933177603489802>';
        case 'Cadarn':
            return '<@&846415448026775552>';
        case 'Crwys':
            return '<@&846416115608846366>';
        case 'Hefin':
            return '<@&846416282106331167>';
        case 'Iorwerth':
            return '<@&846416361089662986>';
        case 'Ithell':
            return '<@&846416421453955082>';
        case 'Meilyr':
            return '<@&846416491108761660>';
        case 'Trahaearn':
            return '<@&846416609069105172>';
    }
}

function handleError(error) {
    console.log(`\t∟ ${error.name}: ${error.message}`);
}

const privateProfile = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setTitle('RuneMetrics Error')
    .setDescription(`Your RuneMetrics profile is set to private, please set it to public on the RuneScape website.`)
    .setImage('https://raw.githubusercontent.com/Chad414/rsclan-discord-bot/main/img/runemetrics.png')
    .setTimestamp()
    .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/rsclan-discord-bot/main/img/icon.png');

exports.embedColor = embedColor;
exports.commands = commands;
exports.skills = skills;
exports.months = months;
exports.vosChannels = vosChannels;
exports.vosRoles = vosRoles;
exports.merchChannels = merchChannels;
exports.handleError = handleError;
exports.privateProfile = privateProfile;