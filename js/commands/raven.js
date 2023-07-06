const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const _ = require('lodash');
const rp = require('request-promise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('raven')
    .setDescription(`Displays when the Raven will spawn in Prifddinas`),
  async execute(interaction) {

    // Number suffix solution from https://stackoverflow.com/questions/13627308/add-st-nd-rd-and-th-ordinal-suffix-to-a-number
    function nth(number) {
      let english_ordinal_rules = new Intl.PluralRules("en", { type: "ordinal" });
      let suffixes = {
        one: "st",
        two: "nd",
        few: "rd",
        other: "th"
      };
      let suffix = suffixes[english_ordinal_rules.select(number)];
      return suffix;
    }

    let firstRotationDate = new Date('June 13, 2021 00:00:00 GMT+0:00');

    let currentDate = new Date();
  
    let timeDifference = currentDate.getTime() - firstRotationDate.getTime();
    let daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
  
    let isSpawned = (daysDifference % 13 === 0);
  
    let daysUntilRotation = 13 - (daysDifference % 13);

    let nextSpawnDate = new Date(currentDate);
    nextSpawnDate.setDate(nextSpawnDate.getDate() + daysUntilRotation);

    let embed = new Discord.EmbedBuilder()
        .setColor(constants.embedColor)
        .setTitle(`Raven`)
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/raven.png')
        .setDescription((isSpawned) ? "The raven has spawned" : `The next raven will spawn in ${daysUntilRotation} days on ${constants.months[nextSpawnDate.getUTCMonth()]} ${nextSpawnDate.getUTCDate()}${nth(nextSpawnDate.getUTCDate())}`)
        .setTimestamp()
        .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

    interaction.reply({ embeds: [embed] });
  }
};