const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const _ = require('lodash');
const rp = require('request-promise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('vos')
    .setDescription(`Displays current Voice of Seren`),
  async execute(interaction) {
    await rp('https://api.weirdgloop.org/runescape/vos').then(function (json) {
      const data = JSON.parse(json);

      let date = new Date();
      let updateTime = `${date.getUTCHours()}:00`

      let district1Embed = new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`${data.district1}`)
        .setDescription(`District 1`)
        .setImage(`https://github.com/Chad414/RSClan-Bot/blob/main/img/vos/${data.district1}.png?raw=true`)
        .setFooter(`ChadTek • Updated at ${updateTime} GMT`, 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');

      let district2Embed = new Discord.MessageEmbed()
        .setColor(constants.embedColor)
        .setTitle(`${data.district2}`)
        .setDescription(`District 2`)
        .setImage(`https://github.com/Chad414/RSClan-Bot/blob/main/img/vos/${data.district2}.png?raw=true`)
        .setFooter(`ChadTek • Updated at ${updateTime} GMT`, 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png');

      interaction.reply({ embeds: [district1Embed, district2Embed] });

    }).catch(function (err) {
      interaction.reply({ embeds: [constants.portablesError] });
      constants.logError({
        name: "Vos",
        message: "Vos Command Error" + err,
      });
    });
  }
};