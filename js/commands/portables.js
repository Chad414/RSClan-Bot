const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const _ = require('lodash');
const rp = require('request-promise');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('portables')
    .setDescription(`Displays currently spawned portables`),
  async execute(interaction) {
    await rp('https://docs.google.com/spreadsheets/d/16Yp-eLHQtgY05q6WBYA2MDyvQPmZ4Yr3RHYiBCBj2Hc/gviz/tq?tqx=out:json').then(function (json) {
      json = json.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/)[1];
      const data = JSON.parse(json);

      let rows = data.table.rows;

      let embed = new Discord.EmbedBuilder()
        .setColor(constants.embedColor)
        .setTitle(`Portables`)
        .setURL('https://docs.google.com/spreadsheets/d/16Yp-eLHQtgY05q6WBYA2MDyvQPmZ4Yr3RHYiBCBj2Hc/')
        .setThumbnail('https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/portables.png')
        .setDescription("Information provided by Portables FC")
        .addFields(
          { name: `Fletcher`, value: `${rows[6].c[1].v.replace(/\*/g, '')}` },
          { name: `Crafter`, value: `${rows[7].c[1].v.replace(/\*/g, '')}` },
          { name: `Brazier`, value: `${rows[8].c[1].v.replace(/\*/g, '')}` },
          { name: `Sawmill`, value: `${rows[9].c[1].v.replace(/\*/g, '')}` },
          { name: `Range`, value: `${rows[10].c[1].v.replace(/\*/g, '')}` },
          { name: `Well`, value: `${rows[11].c[1].v.replace(/\*/g, '')}` },
          { name: `Workbench`, value: `${rows[12].c[1].v.replace(/\*/g, '')}` },
        )
        .setTimestamp()
        .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

      interaction.reply({ embeds: [embed] });

    }).catch(function (err) {
      interaction.reply({ embeds: [constants.portablesError] });
      constants.logError({
        name: "Google Docs: Portables",
        message: "Portables Command Error" + err,
      });
    });
  }
};