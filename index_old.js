const Discord = require("discord.js");
const rp = require('request-promise');
const cheerio = require('cheerio');
const _ = require('lodash');
const cron = require('node-cron');

const config = require("./data/config.json");
const commands = require("./js/commands");
const userstore = require("./js/userstore");
const constants = require("./js/constants");

const client = new Discord.Client();

const commandPrefix = "!";

userstore.loadUsers();

client.on("message", (message) => {

    if (message.author.bot) return;
    if (!message.content.startsWith(commandPrefix)) return;

    const commandBody = message.content.slice(commandPrefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    // Print Command Information to Console
    let date = new Date()

    if (constants.commands.includes(command)) {
        console.log(`[${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}] ${command} ${args} - sent by ${message.author.username}`);
    }

    let rsnCommands = ["setrsn", "rsn", "skills", "skillz", "stats", "daily", "gains", "gainz", "yesterday", "weekly", "alog"];
    let itemCommands = ["ge"];

    // Remove unwanted characters from argument
    let cleanArgument = (s) => {
        while (s.includes('"')) {
            s = s.replace('"', '');
        }
        while (s.includes('{') || s.includes('}')) {
            s = s.replace('{', '');
            s = s.replace('}', '');
        }
        return s;
    }
    
    // Process RSN if command requires it
    if (rsnCommands.includes(command)) {
        var rsn = '';

        // If no RSN was passed we need to check if one is saved
        if (args.length === 0) {
            rsn = userstore.getUser(message.author);
        } else {
            // Process RSN argument
            rsn = args.join('+');

            rsn = cleanArgument(rsn);
        }
    }

    if (itemCommands.includes(command) && args.length > 0) {
        var item = '';

        item = args.join(' ')

        item = cleanArgument(item);
    }


    switch (command) {
        case "ping":
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`)
                .then(() => { })
                .catch(constants.logError);
            break;

        case "info":
            message.reply(commands.info(client.guilds.cache.size))
                .then(() => { })
                .catch(constants.logError);
            break;

        case "help":
            message.reply(commands.help(commandPrefix))
                .then(() => { })
                .catch(constants.logError);
            break;

        case "setrsn":
        case "rsn":
            if (rsn !== undefined) {
                userstore.saveUser(message.author, rsn);

                message.reply(commands.rsn(rsn))
                    .then(() => { })
                    .catch(constants.logError);
            } else {
                message.reply(constants.noRSN)
                    .then(() => { })
                    .catch(constants.logError);
            }

            break;

        case "skills":
        case "skillz":
        case "stats":
            if (rsn === undefined) {
                message.reply(constants.noRSN)
                    .then(() => { })
                    .catch(constants.logError);
                break;
            }

            rp('https://apps.runescape.com/runemetrics/profile/profile?user=' + rsn + '&activities=10').then(function (json) {
                const data = JSON.parse(json);

                message.channel.send(commands.stats(data))
                    .then(() => { })
                    .catch(constants.logError);
            }).catch(function (err) { });

            break;

        case "daily":
        case "gains":
        case "gainz":
        case "yesterday":
        case "weekly":
            rp(`https://www.runeclan.com/user/${rsn}`).then(function (html) {
                const $ = cheerio.load(html)
                const data = $('tr');

                if (rsn === undefined) {
                    message.reply(constants.noRSN)
                        .then(() => { })
                        .catch(constants.logError);
                } else {
                    message.channel.send(commands.daily(data, rsn))
                        .then(() => { })
                        .catch(constants.logError);
                }
            }).catch(function (err) {
                message.reply(constants.runeClanError);
                constants.logError({
                    name: "RuneClan",
                    message: "User not found/tracked",
                });
            });
            break;

        case "rax":
        case "spooder":
            message.reply(commands.rax())
                .then(() => { })
                .catch(constants.logError);

            break;

        case "rago":
            message.reply(commands.rago())
                .then(() => { })
                .catch(constants.logError);
            break;

        case "rots":
            message.reply(commands.rots())
                .then(() => { })
                .catch(constants.logError);
            break;

        case "alog":
            if (rsn === undefined) {
                message.reply(constants.noRSN)
                    .then(() => { })
                    .catch(constants.logError);
                break;
            }

            rp('https://apps.runescape.com/runemetrics/profile/profile?user=' + rsn + '&activities=10').then(function (json) {
                const data = JSON.parse(json);

                message.reply(commands.log(data))
                    .then(() => { })
                    .catch(constants.logError);
            }).catch(function (err) { });
            break;

        case "vis":
            rp('https://warbandtracker.com/goldberg/').then(function (html) {
                const $ = cheerio.load(html)
                const data = $('.worldTable');

                message.reply(commands.vis(data))
                    .then(() => { })
                    .catch(constants.logError);
            }).catch(function (err) { });
            break;

        case "merch":
            rp('https://runescape.wiki/api.php?action=parse&disablelimitreport=1&format=json&prop=text&text=%7B%7BTravelling+Merchant%2Fapi%7Cformat%3Djson%7D%7D%7B%7BTravelling_Merchant%2Fapi%7Coffset%3D1%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D2%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D3%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D4%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D5%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D6%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D7%7Cformat%3Djson%7D%7D').then(function (json) {
                const data = JSON.parse(json);

                message.reply(commands.merch(data, true))
                    .then(() => { })
                    .catch(constants.logError);
            }).catch(function (err) { });
            break;
        case "raven":
            message.reply(commands.raven())
                .then(() => { })
                .catch(constants.logError);
            break;
        case "nemi":
            rp('https://www.reddit.com/r/nemiforest/new.json?limit=1').then(function (json) {
                const data = JSON.parse(json);

                message.reply(commands.nemi(data))
                    .then(() => { })
                    .catch(constants.logError);
            }).catch(function (err) { });
            break;
        case "portables":
            rp('https://docs.google.com/spreadsheets/d/16Yp-eLHQtgY05q6WBYA2MDyvQPmZ4Yr3RHYiBCBj2Hc/gviz/tq?tqx=out:json').then(function (json) {
                json = json.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/)[1];

                const data = JSON.parse(json);

                message.reply(commands.portables(data))
                    .then(() => { })
                    .catch(constants.logError);
            }).catch(function (err) { message.reply(constants.portablesError) });
            break;
        case "vos":
            rp('https://api.weirdgloop.org/runescape/vos').then(function (json) {
                const data = JSON.parse(json);

                commands.vos(data, message);
            }).catch(function (err) { });
            break;
        case "ge":
            if (item === undefined) {
                message.reply(constants.noItem)
                    .then(() => { })
                    .catch(constants.logError);
                constants.logError({
                    name: "Grand Exchange",
                    message: "Item not found",
                });
                break;
            } else {
                while(item.includes('+')) {
                    item = item.replace("+", "%2B");
                }
            }

            rp('https://api.weirdgloop.org/exchange/history/rs/last90d?name=' + item).then(function (json) {
                const data = JSON.parse(json);

                commands.ge(data, message);
            }).catch(
                constants.logError({
                    name: "Grand Exchange",
                    message: "Item not found",
                })
            );
            break;
    }
});

client.login(config.BOT_TOKEN);

// Auto VOS
// This feature is currently exclusive to Dark Perception
cron.schedule('25 01 * * * *', () => {
    let date = new Date();
    console.log(`[${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}] Sending auto Voice of Seren`);

    rp('https://api.weirdgloop.org/runescape/vos').then(function (json) {
        const data = JSON.parse(json);

        for (let i = 0; i < constants.vosChannels.length; i++) {
            let channel = client.channels.cache.get(constants.vosChannels[i]);
            let embeds = commands.vos(data, null)

            // Remove previous VoS
            channel.bulkDelete(10)
                .then(() => { })
                .catch(console.error);

            // Send new VoS
            channel.send(embeds.embed1);
            channel.send(constants.vosRoles(embeds.embed1.title));

            channel.send(embeds.embed2);
            channel.send(constants.vosRoles(embeds.embed2.title));
        }
    }).catch(function (err) { });
});

// Auto Merch
// This feature is currently exclusive to Dark Perception
cron.schedule('35 00 00 * * *', () => {
    let date = new Date();
    console.log(`[${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}] Sending auto Merch`);

    rp('https://runescape.wiki/api.php?action=parse&disablelimitreport=1&format=json&prop=text&text=%7B%7BTravelling+Merchant%2Fapi%7Cformat%3Djson%7D%7D%7B%7BTravelling_Merchant%2Fapi%7Coffset%3D1%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D2%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D3%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D4%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D5%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D6%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D7%7Cformat%3Djson%7D%7D').then(function (json) {
        const data = JSON.parse(json);

        for (let i = 0; i < constants.dailyChannels.length; i++) {
            let channel = client.channels.cache.get(constants.dailyChannels[i]);
            let merch = commands.merch(data, false);

            // Send new Merch
            channel.send(merch.embed);

            for (let j = 0; j < merch.items.length; j++) {
                if (merch.items[j].includes("Livid")) {
                    channel.send(constants.merchRoles[0])
                } else if (merch.items[j].includes("Deathtouched")) {
                    channel.send(constants.merchRoles[1])
                } else if (merch.items[j].includes("Reaper")) {
                    channel.send(constants.merchRoles[2])
                } else if (merch.items[j].includes("Unstable")) {
                    channel.send(constants.merchRoles[3])
                } else if (merch.items[j].includes("goebie") || merch.items[j].includes("Goebie")) {
                    channel.send(constants.merchRoles[4])
                }
            }       

        }
    }).catch(function (err) { });
}, {
    timezone: "Africa/Accra"
});

// Auto Vis
// This feature is currently exclusive to Dark Perception
// cron.schedule('00 00 01 * * *', () => {
cron.schedule('55 00 * * * *', () => {
    let date = new Date();
    console.log(`[${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}] Sending auto Vis`);

    rp('https://warbandtracker.com/goldberg/').then(function (html) {
        const $ = cheerio.load(html)
        const data = $('.worldTable');

        for (let i = 0; i < constants.dailyChannels.length; i++) {
            let channel = client.channels.cache.get(constants.dailyChannels[i]);
            let embed = commands.vis(data);
            
            // Update at these hours of the day
            let visHours = [1, 2, 3, 6, 9, 15, 21];

            // Delete previous vis if not first vis of the day (1)
            let date = new Date();
            if (visHours.includes(date.getUTCHours()) && date.getUTCHours() > 1) {
                channel.bulkDelete(1)
                    .then(() => { })
                    .catch(console.error);
            }

            if (visHours.includes(date.getUTCHours())) {
                // Send new Vis
                channel.send(embed);
            }

        }
    }).catch(function (err) { });
}, {
    timezone: "Africa/Accra"
});

// Auto Boss Rotation
// This feature is currently exclusive to Dark Perception
cron.schedule('25 00 00 * * *', () => {
    let date = new Date();
    console.log(`[${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}] Sending auto Rotation`);

    for (let i = 0; i < constants.dailyChannels.length; i++) {
        let channel = client.channels.cache.get(constants.dailyChannels[i]);
        let raxEmbed = commands.rax();
        let rotsEmbed = commands.rots();

        // Remove previous auto Merch/Vis/Rax
        channel.bulkDelete(10)
            .then(() => { })
            .catch(console.error);

        channel.send(`Reminder to do your ${constants.portRole}`);
        
        channel.send(raxEmbed);

        channel.send(rotsEmbed);
    }

}, {
    timezone: "Africa/Accra"
});