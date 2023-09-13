// src/components/bot/ActionProvider.jsx

const ActionProvider = ({ createChatBotMessage }) => {
  const answerQuestion = async (message) => {
    try {
      const response = await fetch("/druglibrary.json"); // Replace with the correct path to your JSON file
      const data = await response.json();

      if (message.content.toLowerCase().includes("name")) {
        // Handle questions about drug names
        const drugNames = data.map((drug) => drug.name);
        const answer = `Drug Names: ${drugNames.join(", ")}`;
        createChatBotMessage(answer);
      } else if (message.content.toLowerCase().includes("aliases")) {
        // Handle questions about drug aliases
        const drugAliases = data
          .filter((drug) => drug.aliases && drug.aliases.length > 0)
          .map((drug) => `${drug.name}: ${drug.aliases.join(", ")}`);
        if (drugAliases.length > 0) {
          const answer = `Drug Aliases:\n${drugAliases.join("\n")}`;
          createChatBotMessage(answer);
        } else {
          createChatBotMessage("There are no drug aliases available.");
        }
      } else if (message.content.toLowerCase().includes("appearance")) {
        // Handle questions about drug appearance
        const drugAppearance = data.map(
          (drug) => `${drug.name}: ${drug.appearance}`
        );
        const answer = `Drug Appearance:\n${drugAppearance.join("\n")}`;
        createChatBotMessage(answer);
      } else {
        // Handle other types of questions or provide a default response
        createChatBotMessage(
          "I'm sorry, I don't have the answer to that question."
        );
      }
    } catch (error) {
      console.error("Error fetching drug library data:", error);
      createChatBotMessage("I'm sorry, there was an error fetching the data.");
    }
  };

  // Rest of your ActionProvider component
};

export default ActionProvider;
