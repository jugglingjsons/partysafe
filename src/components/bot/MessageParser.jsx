import React, { useContext } from "react";
import { ChatContext } from "./ChatContext"; // Ensure you have the ChatContext set up
import { useChat } from "./ChatContext";

const MessageParser = () => {
  const { createChatBotMessage } = useContext(ChatContext); // Use the ChatContext to access createChatBotMessage from the context

  const parseMessages = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("name")) {
      // Handle questions about drug names
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else if (lowerCaseMessage.includes("aliases")) {
      // Handle questions about drug aliases
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else if (lowerCaseMessage.includes("description")) {
      // Handle questions about drug description
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else if (lowerCaseMessage.includes("effects")) {
      // Handle questions about drug effects
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else if (lowerCaseMessage.includes("dosage")) {
      // Handle questions about drug dosage
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else if (lowerCaseMessage.includes("usage")) {
      // Handle questions about drug usage
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else if (lowerCaseMessage.includes("duration")) {
      // Handle questions about drug duration
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else if (lowerCaseMessage.includes("risks")) {
      // Handle questions about drug risks
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else if (lowerCaseMessage.includes("side effects")) {
      // Handle questions about drug side effects
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else if (lowerCaseMessage.includes("sex use")) {
      // Handle questions about drug sex use
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else if (lowerCaseMessage.includes("mixed use")) {
      // Handle questions about drug mixed use
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else if (lowerCaseMessage.includes("other information")) {
      // Handle questions about drug other information
      createChatBotMessage({
        content: null, // You can set the content as needed
        actionProvider: "ActionProvider",
        type: "custom",
      });
    } else {
      // Handle other types of messages
      createChatBotMessage({
        content: "I'm sorry, I don't have the answer to that question.",
        type: "text",
      });
    }
  };

  return null; // MessageParser doesn't render anything directly
};

export default MessageParser;
