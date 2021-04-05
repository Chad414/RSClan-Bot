const Discord = require("discord.js");
const rp = require('request-promise');
const $ = require('cheerio');
const _ = require('lodash');

const config = require("./config.json");
const commands = require("./js/commands");
const userstore = require("./js/userstore");

const client = new Discord.Client();

const commandPrefix = "!";

userstore.loadUsers();

client.on("message", function (message) {

    if (message.author.bot) return;
    if (!message.content.startsWith(commandPrefix)) return;

    const commandBody = message.content.slice(commandPrefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    // Print Command Information to Console
    console.log(`Command: ${command} Args: ${args} - sent by ${message.author}`);

    // Process RSN
    let rsn = '';

    if (args.length === 0) {
        rsn = userstore.getUser(message.author);
    } else {
        for (i of args) {
            rsn += `${i}+`;
        }
        rsn = rsn.slice(0, rsn.length - 1);
    }

    switch (command) {
        case "ping":
            const timeTaken = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
            break;

        case "info":
            message.reply(commands.info(client.guilds.cache.size));
            break;

        case "help":
            message.reply(commands.help(commandPrefix));
            break;

        case "setrsn":
        case "rsn":
            if (rsn !== undefined) {
                userstore.saveUser(message.author, rsn);

                message.reply(commands.rsn(rsn));
            } else {
                message.reply('Missing argument, please specify a RSN. Example: `!rsn ChadTek`');
            }

            break;

        case "skills":
        case "skillz":
        case "stats":
            if (rsn === undefined) {
                message.reply('RSN not found, please assign one with !rsn. Example: `!rsn ChadTek`');
                break;
            }

            rp('https://apps.runescape.com/runemetrics/profile/profile?user=' + rsn + '&activities=10').then(function (html) {
                const data = JSON.parse(html);

                message.channel.send(commands.stats(data));
            }).catch(function (err) {});

            break;

        case "daily":
        case "gains":
        case "gainz":
        case "yesterday":
        case "weekly":
            rp(`https://www.runeclan.com/user/${rsn}`).then(function (html) {
                    const data = $('tr', html);

                    if (rsn === undefined) {
                        message.reply('RSN not found, please assign one with !rsn. Example: `!rsn ChadTek`');
                    } else {
                        message.channel.send(commands.daily(data, rsn));
                    }
                }).catch(function (err) {});
            break;

        case "spooder":
            rp('https://runescape.wiki/w/Araxxor').then(function (html) {
                const data = $('#reload', html);

                message.reply(commands.spooder(data));
            }).catch(function (err) {});
            break;

        case "rago":
            rp('https://runescape.wiki/w/Vorago').then(function (html) {
                const data = $('.table-bg-green', html);

                message.reply(commands.rago(data));
            }).catch(function (err) {});
            break;

        case "alog":
            if (rsn === undefined) {
                message.reply('RSN not found, please assign one with !rsn. Example: `!rsn ChadTek`');
                break;
            }

            rp('https://apps.runescape.com/runemetrics/profile/profile?user=' + rsn + '&activities=10').then(function (html) {
                const data = JSON.parse(html);

                message.reply(commands.log(data));
            }).catch(function (err) {});
            break;

        case "vis":
            rp('https://warbandtracker.com/goldberg/').then(function (html) {
                const data = $('.worldTable', html);

                message.reply(commands.vis(data));
            }).catch(function (err) {});
            break;

        case "merch":
            // rp('https://runescape.wiki/w/Travelling_Merchant%27s_Shop/Future').then(function (html) {
            rp('https://runescape.wiki/api.php?action=parse&disablelimitreport=1&format=json&prop=text&text=%7B%7BTravelling+Merchant%2Fapi%7Cformat%3Djson%7D%7D%7B%7BTravelling_Merchant%2Fapi%7Coffset%3D1%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D2%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D3%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D4%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D5%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D6%7Cformat%3Djson%7D%7D%7B%7BTravelling+Merchant%2Fapi%7Coffset%3D7%7Cformat%3Djson%7D%7D').then(function (html) {
                const data = JSON.parse(html);

                message.reply(commands.merch(data));
            }).catch(function (err) {});
            break;
        case "raven":
            rp('https://runescape.wiki/w/The_Ravensworn').then(function (html) {
                const data = $("p", html);

                message.reply(commands.raven(data));
            }).catch(function (err) {});
            break;
        case "nemi":
            rp('https://www.reddit.com/r/nemiforest/new.json?limit=1').then(function (html) {
                const data = JSON.parse(html);

                message.reply(commands.nemi(data));
            }).catch(function (err) {});
            break;
        case "portables":
            rp('https://spreadsheets.google.com/feeds/cells/16Yp-eLHQtgY05q6WBYA2MDyvQPmZ4Yr3RHYiBCBj2Hc/1/public/full?alt=json').then(function (html) {
                const data = JSON.parse(html);

                message.reply(commands.portables(data));
            }).catch(function (err) {});
            break;
        case "vos":
            rp('https://api.weirdgloop.org/runescape/vos').then(function (html) {
                const data = JSON.parse(html);

                commands.vos(data, message);
            }).catch(function (err) { });
            break;
    }
});

client.login(config.BOT_TOKEN);