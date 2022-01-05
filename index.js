const config = require("./data/config.json");
const fs = require('fs');
const {
  REST
} = require('@discordjs/rest');
const {
  Routes
} = require('discord-api-types/v9');

const {
  Client,
  Intents,
  Collection
} = require('discord.js');


const client = new Client({
  intents: [Intents.FLAGS.GUILDS]
});

const TOKEN = config.BOT_TOKEN;

const commandFiles = fs.readdirSync('./js/commands').filter(file => file.endsWith('.js'));

const commands = [];

client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./js/commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
}

// Register slash commands globally
client.once('ready', () => {
    const CLIENT_ID = client.user.id;
    const rest = new REST({
        version: '9'
    }).setToken(TOKEN);
    (async () => {
        try {
          await rest.put(
              Routes.applicationCommands(CLIENT_ID), {
                  body: commands
              },
          );
          console.log('Successfully registered application commands globally');
        } catch (error) {
            if (error) console.error(error);
        }
    })();
});

// Listen for interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;
  const command = client.commands.get(interaction.commandName);
  if (!command) return;
  try {
      await command.execute(interaction, client);
  } catch (error) {
      if (error) console.error(error);
      await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});

client.login(TOKEN);