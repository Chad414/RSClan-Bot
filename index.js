const Discord = require("discord.js");
const rp = require('request-promise');
const rs = require('runescape-api');
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
            message.reply(commands.info());
            break;

        case "help":
            message.reply(commands.help(commandPrefix));
            break;

        case "rsn":
            userstore.saveUser(message.author, rsn);

            message.reply(commands.rsn(rsn));
            break;

        case "daily":
        case "gains":
        case "gainz":
        case "yesterday":
        case "weekly":
            rp(`https://www.runeclan.com/user/${rsn}`).then(function (html) {
                    const data = $('tr', html);

                    if (rsn === undefined) {
                        message.reply('RSN not found, please add one or pass it in as an argument.');
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
                message.reply('RSN not found, please add one or pass it in as an argument.');
                break;
            }

            rs.runemetrics.getProfile(rsn.replace('+', ' ')).then(data => {
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