const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const userstore = require("../userstore");
const _ = require('lodash');
const rp = require('request-promise');
const cheerio = require('cheerio');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vis')
    .setDescription(`Displays current Rune combinations from Warband PK`),
  async execute(interaction) {
    await rp(`https://warbandtracker.com/goldberg/`).then(function (html) {
      const $ = cheerio.load(html);
      const data = $('.worldTable');

      let firstRune = data[0].children[1].children[2].children[0].children[2].attribs.alt;

      let secondRune = [
        data[0].children[1].children[6].children[0].children[2].attribs.alt,
        data[0].children[1].children[6].children[1].children[2].attribs.alt,
        data[0].children[1].children[6].children[2].children[2].attribs.alt
      ];

      let embed = new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`Correct Rune Combinations`)
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/vis.png')
        .addFields(
          { name: `First Rune`, value: `${firstRune}` },
          { name: `Second Rune`, value: `${secondRune[0]}\n${secondRune[1]}\n${secondRune[2]}` },

        )
        .setTimestamp()
        .setFooter('ChadTek', 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');

      interaction.reply({ embeds: [embed] })

    }).catch(function (err) {
      constants.logError({
        name: "Vis",
        message: "Vis Command Error" + err,
      });
    });

  }
};