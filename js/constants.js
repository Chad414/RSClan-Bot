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
];

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
];

const voragoRotations = [
    'Ceiling collapse',
    'Scopulus',
    'Vitalis',
    'Green bomb',
    'Team Split',
    'The end'
]

// TODO: Move to config file
const vosChannels = [
    "844326270418550804"
];

// TODO: Move to config file
const dailyChannels = [
    "848927179714723870"
    // "848930714606370917"
];

// TODO: Move to config file
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
};

// TODO: Move to config file
const merchRoles = [
    '<@&854058240581304350>',
    '<@&854058712691113994>',
    '<@&854059181198802946>',
    '<@&854058812411084816>',
    '<@&854058942727323689>'
];

function handleError(error) {
    console.log(`\t∟ ${error.name}: ${error.message}`);
};

const privateProfile = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setTitle('RuneMetrics Error')
    .setDescription(`Your RuneMetrics profile is set to private, please set it to public on the RuneScape website.`)
    .setImage('https://raw.githubusercontent.com/Chad414/rsclan-discord-bot/main/img/runemetrics.png')
    .setTimestamp()
    .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/rsclan-discord-bot/main/img/icon.png');

const noRSN = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setTitle('RSN Not Found')
    .setDescription("Please set your RSN with !rsn \nExample: `!rsn Zezima`")
    .setTimestamp()
    .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/rsclan-discord-bot/main/img/icon.png');

exports.embedColor = embedColor;
exports.commands = commands;
exports.skills = skills;
exports.months = months;
exports.voragoRotations = voragoRotations;
exports.vosChannels = vosChannels;
exports.vosRoles = vosRoles;
exports.merchRoles = merchRoles;
exports.dailyChannels = dailyChannels;
exports.handleError = handleError;
exports.privateProfile = privateProfile;
exports.noRSN = noRSN;