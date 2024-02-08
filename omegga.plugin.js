// omegga.plugin.js
class KickOnPhrasePlugin {
  constructor(omegga, config, store) {
    this.omegga = omegga;
    this.config = config;
    this.store = store;
  }

  // Utility function to check if the message tells the time
  tellsTime(msg) {
    // Simple regex to match time patterns, e.g., "It's 9:45" or "The time is 14:00"
    const timeRegex = /(\b\d{1,2}:\d{2}\b)/;
    return timeRegex.test(msg);
  }

  async init() {
    // Listen to chat messages
    this.omegga.on('chat', async (name, message) => {
      // Check if the message tells the time or says "is that bad?"
      if (this.tellsTime(message) || message.toLowerCase().includes("is that bad?")) {
        // Kick the user with a reason
        this.omegga.writeln(`kick "${name}" "Do not tell the time or ask if that's bad."`);
      }
    });

    return {registeredCommands: []};
  }

  async stop() {
    // Plugin is stopped
  }
}

module.exports = KickOnPhrasePlugin;
