const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const { token } = require('./config.json');
const { setActivity } = require('./commands/activity.js');

const client = new Client({ 
    intents: GatewayIntentBits.Guilds | GatewayIntentBits.GuildMessages,
    partials: ['MESSAGE', 'CHANNEL', 'REACTION'] 
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.nam, command);
} 
client.once('ready', () => {
    console.log('Bot is ready!');
    // Refresh slash commands
    refreshCommands();
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

async function refreshCommands() {
    const commands = [];
    client.commands.forEach(command => {
        commands.push(command.data);
    });
    try {
        const guildId = '915405063961337977'; // Ganti dengan ID guild Anda
        await client.guilds.cache.get(guildId)?.commands.set(commands);
        console.log('Slash commands refreshed!');
    } catch (error) {
        console.error('Error refreshing slash commands:', error);
    }
}

client.login(token);
