const Discord = require("discord.js");

const embedColor = '1c22d4';
exports.embedColor = embedColor;

exports.commands = [
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
    "rax",
    "spooder",
    "rago",
    "rots",
    "alog",
    "vis",
    "merch",
    "raven",
    "nemi",
    "portables",
    "vos",
    "ge"
];

exports.skills = [
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

exports.months = [
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

exports.voragoRotations = [
    'Ceiling collapse',
    'Scopulus',
    'Vitalis',
    'Green bomb',
    'Team Split',
    'The end'
]

exports.rotsRotations = [
    [['Dharok', 'Torag', 'Verac'], ['Karil', 'Ahrim', 'Guthan']],
    [['Karil', 'Torag', 'Guthan'], ['Ahrim', 'Dharok', 'Verac']],
    [['Karil', 'Guthan', 'Verac'], ['Ahrim', 'Torag', 'Dharok']],
    [['Guthan', 'Torag', 'Verac'], ['Karil', 'Ahrim', 'Dharok']],
    [['Karil', 'Torag', 'Verac'], ['Ahrim', 'Guthan', 'Dharok']],
    [['Ahrim', 'Guthan', 'Dharok'], ['Karil', 'Torag', 'Verac']],
    [['Karil', 'Ahrim', 'Dharok'], ['Guthan', 'Torag', 'Verac']],
    [['Ahrim', 'Torag', 'Dharok'], ['Karil', 'Guthan', 'Verac']],
    [['Ahrim', 'Dharok', 'Verac'], ['Karil', 'Torag', 'Guthan']],
    [['Karil', 'Ahrim', 'Guthan'], ['Torag', 'Dharok', 'Verac']],
    [['Ahrim', 'Torag', 'Guthan'], ['Karil', 'Dharok', 'Verac']],
    [['Ahrim', 'Guthan', 'Verac'], ['Karil', 'Torag', 'Dharok']],
    [['Karil', 'Ahrim', 'Torag'], ['Guthan', 'Dharok', 'Verac']],
    [['Karil', 'Ahrim', 'Verac'], ['Dharok', 'Torag', 'Guthan']],
    [['Ahrim', 'Torag', 'Verac'], ['Karil', 'Dharok', 'Guthan']],
    [['Karil', 'Dharok', 'Guthan'], ['Ahrim', 'Torag', 'Verac']],
    [['Dharok', 'Torag', 'Guthan'], ['Karil', 'Ahrim', 'Verac']],
    [['Guthan', 'Dharok', 'Verac'], ['Karil', 'Ahrim', 'Torag']],
    [['Karil', 'Torag', 'Dharok'], ['Ahrim', 'Guthan', 'Verac']],
    [['Karil', 'Dharok', 'Verac'], ['Ahrim', 'Torag', 'Guthan']]
];

exports.nonVirtualSkillIDs = [
    15,
    18,
    19,
    24,
    26,
    27
];

// TODO: Move to config file
exports.vosChannels = [
    "844326270418550804"
];

// TODO: Move to config file
exports.dailyChannels = [
    "848927179714723870"
    // "848930714606370917"
];

exports.eventChannels = [
    "1122577008900198541"
]

// TODO: Move to config file
exports.vosRoles = (district) => {
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

exports.wildyEvents = [
    "Spider Swarm",
    "Unnatural Outcrop",
    "Demon Stragglers",
    "Butterfly Swarm",
    "King Black Dragon Rampage",
    "Forgotten Soldiers",
    "Surprising Seedlings",
    "Hellhound Pack",
    "Infernal Star",
    "Lost Souls",
    "Ramokee Incursion",
    "Displaced Energy",
    "Evil Bloodwood Tree"
];

// TODO: Move to config file
exports.merchRoles = [
    '<@&854058240581304350>',
    '<@&854058712691113994>',
    '<@&854059181198802946>',
    '<@&854058812411084816>',
    '<@&854058942727323689>'
];

exports.portRole = '<@&858809588904099871>'

exports.authorAvatar = 'https://cdn.discordapp.com/avatars/115057951319916546/a_ee38ffa2d9b07ac20363e8989e743e0e.webp'

exports.logError = (error) => {
    console.log(`\t∟ ${error.name}: ${error.message}`);
};

exports.runeClanError = new Discord.EmbedBuilder()
    .setColor(embedColor)
    .setTitle('❌ Gains Error')
    .setURL('https://runepixels.com')
    .setDescription(`Please make sure you're being tracked by RunePixels`)
    .setTimestamp()
    .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

exports.privateProfile = new Discord.EmbedBuilder()
    .setColor(embedColor)
    .setTitle('❌ RuneMetrics Error')
    .setDescription(`Your RuneMetrics profile is set to private, please set it to public on the RuneScape website.`)
    .setImage('https://raw.githubusercontent.com/Chad414/rsclan-discord-bot/main/img/runemetrics.png')
    .setTimestamp()
    .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

exports.runeMetricsUnavailable = new Discord.EmbedBuilder()
    .setColor(embedColor)
    .setTitle('❌ RuneMetrics Error')
    .setDescription(`RuneMetrics is currently unavailable or the user does not exist.`)
    .setTimestamp()
    .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

exports.noRSN = new Discord.EmbedBuilder()
    .setColor(embedColor)
    .setTitle('❌ RSN Not Found')
    .setDescription("Please set your RSN with /setrsn \nExample: `/setrsn Zezima`")
    .setTimestamp()
    .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

exports.noItem = new Discord.EmbedBuilder()
    .setColor(embedColor)
    .setTitle('❌ Item not found')
    .setDescription("Please make sure you enter an item exactly as it's shown in-game \nExample: `/ge Ascension Crossbow`")
    .setTimestamp()
    .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

exports.portablesError = new Discord.EmbedBuilder()
    .setColor(embedColor)
    .setTitle('❌ Portables Error')
    .setDescription(`Unable to retrieve Portables data.`)
    .setTimestamp()
    .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

exports.vosError = new Discord.EmbedBuilder()
    .setColor(embedColor)
    .setTitle('❌ VoS Error')
    .setDescription(`Unable to retrieve VoS data.`)
    .setTimestamp()
    .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });
