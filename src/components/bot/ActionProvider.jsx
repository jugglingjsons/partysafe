import React from "react";
import ChatContext from "./ChatContext"; // Import the ChatContext
import { useChat } from "./ChatContext"; // Import the useChat hook

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
      } else if (message.content.toLowerCase().includes("description")) {
        // Handle questions about drug description
        const drugDescription = data.map(
          (drug) => `${drug.name} Description: ${drug.details.description}`
        );
        const answer = `Drug Descriptions:\n${drugDescription.join("\n")}`;
        createChatBotMessage(answer);
      } else if (message.content.toLowerCase().includes("effects")) {
        // Handle questions about drug effects
        const drugEffects = data.map(
          (drug) => `${drug.name} Effects: ${drug.details.effects}`
        );
        const answer = `Drug Effects:\n${drugEffects.join("\n")}`;
        createChatBotMessage(answer);
      } else if (message.content.toLowerCase().includes("dosage")) {
        // Handle questions about drug dosage
        const drugDosage = data.map(
          (drug) => `${drug.name} Dosage: ${drug.details.dosage}`
        );
        const answer = `Drug Dosage:\n${drugDosage.join("\n")}`;
        createChatBotMessage(answer);
      } else if (message.content.toLowerCase().includes("usage")) {
        // Handle questions about drug usage
        const drugUsage = data.map(
          (drug) => `${drug.name} Usage: ${drug.details.usage}`
        );
        const answer = `Drug Usage:\n${drugUsage.join("\n")}`;
        createChatBotMessage(answer);
      } else if (message.content.toLowerCase().includes("duration")) {
        // Handle questions about drug duration
        const drugDuration = data.map(
          (drug) => `${drug.name} Duration: ${drug.details.duration}`
        );
        const answer = `Drug Duration:\n${drugDuration.join("\n")}`;
        createChatBotMessage(answer);
      } else if (message.content.toLowerCase().includes("risks")) {
        // Handle questions about drug risks
        const drugRisks = data.map(
          (drug) => `${drug.name} Risks: ${drug.details.risks}`
        );
        const answer = `Drug Risks:\n${drugRisks.join("\n")}`;
        createChatBotMessage(answer);
      } else if (message.content.toLowerCase().includes("sideeffects")) {
        // Handle questions about drug side effects
        const drugSideEffects = data.map(
          (drug) => `${drug.name} Side Effects: ${drug.details.sideEffects}`
        );
        const answer = `Drug Side Effects:\n${drugSideEffects.join("\n")}`;
        createChatBotMessage(answer);
      } else if (message.content.toLowerCase().includes("sexuse")) {
        // Handle questions about drug sex use
        const drugSexUse = data.map(
          (drug) => `${drug.name} Sex Use: ${drug.details.sexUse}`
        );
        const answer = `Drug Sex Use:\n${drugSexUse.join("\n")}`;
        createChatBotMessage(answer);
      } else if (message.content.toLowerCase().includes("mixeduse")) {
        // Handle questions about drug mixed use
        const drugMixedUse = data.map(
          (drug) => `${drug.name} Mixed Use: ${drug.details.mixedUse}`
        );
        const answer = `Drug Mixed Use:\n${drugMixedUse.join("\n")}`;
        createChatBotMessage(answer);
      } else if (message.content.toLowerCase().includes("otherinformation")) {
        // Handle questions about other drug information
        const drugOtherInformation = data.map(
          (drug) =>
            `${drug.name} Other Information: ${drug.details.otherInformation}`
        );
        const answer = `Other Drug Information:\n${drugOtherInformation.join(
          "\n"
        )}`;
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

  return <div>{/* Your component content here */}</div>;
};

export default ActionProvider;
