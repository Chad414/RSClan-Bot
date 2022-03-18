const { SlashCommandBuilder } = require('@discordjs/builders');
const Discord = require("discord.js");
const constants = require("../constants");
const _ = require('lodash');
const rp = require('request-promise');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ge')
    .setDescription(`Displays item\'s current and previous Grand Exchange price`)
    .addStringOption(option =>
      option.setName('item')
        .setDescription('RuneScape Item Name')
        .setRequired(true)),
  async execute(interaction) {
    let item = interaction.options.getString('item');

    while (item.includes('+')) {
      item = item.replace("+", "%2B");
    }

    await rp('https://api.weirdgloop.org/exchange/history/rs/last90d?name=' + item).then(function (json) {
      const data = JSON.parse(json);

      // Comma separators solution from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
      function numberWithCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }

      if (data.error != undefined) {
        interaction.reply({ embeds: [constants.noItem] });
        return;
      }

      let itemName;
      for (const i in data) {
        itemName = i;
      }

      const priceData = data[itemName];

      // Create graph
      let graphData = [];
      let labels = [];
      for (let i = 7; i < priceData.length; i += 7) {
        graphData.push(priceData[i].price);
        let date = new Date(priceData[i].timestamp);
        labels.push(`${constants.months[date.getMonth()]} ${date.getDate()}`);
      }
      graphData.push(priceData[priceData.length - 1].price);
      let date = new Date(priceData[priceData.length - 1].timestamp);
      labels.push(`${constants.months[date.getMonth()]} ${date.getDate()}`);

      const plugin = {
        id: 'custom_canvas_background_color',
        beforeDraw: (chart) => {
          const ctx = chart.canvas.getContext('2d');
          ctx.save();
          ctx.globalCompositeOperation = 'destination-over';
          ctx.fillStyle = 'AliceBlue';
          ctx.fillRect(0, 0, chart.width, chart.height);
          ctx.restore();
        }
      };

      const width = 420; //px
      const height = 220; //px
      const title = `${itemName}`
      const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height });

      (async () => {
        const configuration = {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              data: graphData,
              label: "Guide Price",
              borderColor: "#3e95cd",
              backgroundColor: "#7bb6dd",
              fill: false,
            }],
          },
          plugins: [plugin],
          options: {
            plugins: {
              title: {
                display: true,
                text: `${title}`,
                color: 'black',
              },
              subtitle: {
                display: true,
                text: `${numberWithCommas(priceData[priceData.length - 1].price)} GP`,
                color: 'black',
                font: {
                  size: 14,
                  family: "Arial",
                  weight: "bold",
                  lineHeight: 0.5,
                }
              }
            },
            layout: {
              padding: {
                left: 6,
              }
            }
          },
        };
        const image = await chartJSNodeCanvas.renderToBuffer(configuration);

        interaction.reply({ files: [image] });
      })();

    }).catch(function (err) {
      constants.logError({
        name: "GE",
        message: "GE Command Error" + err,
      });
    });
  }
};