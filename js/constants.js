const Discord = require("discord.js");

const embedColor = '1c22d4';

const commands = [
    "ping",
    "info",
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

const privateProfile = new Discord.MessageEmbed()
    .setColor(embedColor)
    .setTitle('RuneMetrics Error')
    .setDescription(`Your RuneMetrics profile is set to private, please set it to public on the RuneScape website.`)
    .setImage('https://i.imgur.com/bJpc8S2.png')
    .setTimestamp()
    .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/rsclan-discord-bot/main/img/icon.png');

exports.embedColor = embedColor;
exports.commands = commands;
exports.skills = skills;
exports.months = months;
exports.privateProfile = privateProfile;