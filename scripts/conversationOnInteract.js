module.exports = function (self, event, world) {
  if (self !== event.target) {
    // This isn't our conversationalist
    return;
  }

  if (self.observation) {
    // The "observation" property can be set to have the Operator
    // make an observation about a character without kicking off a convo
    world.showNotification(self.observation);
    return;
  }

  // Default to conversation and ensure appropriate values are set
  const conversationName = self.conversation;
  const conversationAvatar = self.conversationAvatar;

  if (!conversationName) {
    console.error(`La propriété "conversationName" n'est pas définie sur la cible de l'interaction.`);
    return;
  }

  if (!conversationAvatar) {
    console.error(
      `La propriété "conversationAvatar" n'est pas définie sur la cible de l'interaction.`
    );
    return;
  }

  // Kick off conversation
  world.startConversation(conversationName, conversationAvatar);
};
