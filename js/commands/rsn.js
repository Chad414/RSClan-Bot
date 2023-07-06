const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const _ = require('lodash');
const constants = require("../constants");
const userstore = require("../userstore");

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setrsn')
    .setDescription('Assigns a RSN to your Discord account')
    .addStringOption(option =>
      option.setName('rsn')
        .setDescription('RuneScape Name')
        .setRequired(true)),
  async execute(interaction) {
    let rsn = interaction.options.getString('rsn');
    let userID = interaction.user.id;

    while (rsn.includes(' ')) {
      rsn = rsn.replace(" ", "+");
    }

    userstore.saveUser(userID, rsn);

    // Format RSN for display
    rsn = (rsn.includes('+')) ? _.startCase(rsn.replace('+', ' ')) : _.upperFirst(rsn)

    let embed = new Discord.EmbedBuilder()
      .setColor(constants.embedColor)
      .setTitle('✅ RSN Assigned')
      .setDescription(`Assigned ${rsn} to your Discord account.`)
      .setTimestamp()
      .setFooter({ text: 'RSClan', iconURL: 'https://raw.githubusercontent.com/Chad414/RSClan-Bot/main/img/icon.png' });

    interaction.reply({ embeds: [embed] })

  }
};