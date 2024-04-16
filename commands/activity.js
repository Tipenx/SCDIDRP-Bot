// commands/activityset.js

module.exports = {
  data: {
    name: "activityset",
    description: "Set the activity of the bot",
    options: [
      {
        name: "activity",
        description: "The activity to set",
        type: 3,
        required: true,
      },
      {
        name: "status",
        description:
          'The status type (e.g., "online", "idle", "dnd", "invisible", "streaming")',
        type: 3,
        required: true,
        choices: [
          { name: "Online", value: "online" },
          { name: "Idle", value: "idle" },
          { name: "Do Not Disturb", value: "dnd" },
          { name: "Invisible", value: "invisible" },
          { name: "Streaming", value: "streaming" },
        ],
      },
    ],
  },
  async execute(interaction) {
    const activity = interaction.options.getString("activity");
    const status = interaction.options.getString("status");

    // Set activity and status
    if (status === "streaming") {
      await interaction.client.user.setPresence({
        activities: [
          {
            name: activity,
            type: "STREAMING",
            url: "https://www.twitch.tv/yourchannel", // Ganti dengan URL channel Twitch Anda
          },
        ],
        status: "streaming",
      });
    } else {
      await interaction.client.user.setPresence({
        activities: [{ name: activity }],
        status: status,
      });
    }

    await interaction.reply(
      `Activity set to: ${activity}, Status set to: ${status}`,
    );
  },
};
