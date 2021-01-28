const Discord = require("discord.js");
const rp = require('request-promise');
const rs = require('runescape-api');
const $ = require('cheerio');

const pkg = require("./package.json");
const config = require("./config.json");
const commands = require("./js/commands");

const client = new Discord.Client();

const commandPrefix = "!";

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

        case "info":
            message.reply(`\nThe RSClan bot was created on 01/26/21.\nCurrent version: ${pkg.version}\nPlease report issues to Chadathan#0100\n`);
            break;

        case "help":
            message.reply(commands.help(commandPrefix));
            break;

        case "daily":
        case "gainz":
            let gainzUser = '';
            for (i of args) {
                gainzUser += `${i}+`;
            }
            gainzUser = gainzUser.slice(0, gainzUser.length - 1);
            rp(`https://www.runeclan.com/user/${gainzUser}`).then(function (html) {
                    const data = $('tr', html);

                    message.reply(commands.daily(data, gainzUser));
                }).catch(function (err) {});
            break;

        case "weekly":
            let weeklyUser = '';
            for (i of args) {
                weeklyUser += `${i}+`;
            }
            weeklyUser = weeklyUser.slice(0, weeklyUser.length - 1);
            rp(`https://www.runeclan.com/user/${weeklyUser}`).then(function (html) {
                const data = $('tr', html);

                message.reply(commands.weekly(data, weeklyUser));
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
            let alogUser = '';
            for (i of args) {
                alogUser += `${i}_`;
            }
            alogUser = alogUser.slice(0, alogUser.length - 1);
            rs.runemetrics.getProfile(alogUser).then(data => {
                message.reply(commands.log(data));
            })
            break;

        case "vis":
            rp('https://warbandtracker.com/goldberg/').then(function (html) {
                const data = $('.worldTable', html);

                message.reply(commands.vis(data));
            }).catch(function (err) {});
            break;

        case "merch":
            rp('https://runescape.wiki/w/Travelling_Merchant%27s_Shop/Future').then(function (html) {
                const data = $('.wikitable', html);

                message.reply(commands.merch(data));
            }).catch(function (err) {});
            break;
    }
});

client.login(config.BOT_TOKEN);