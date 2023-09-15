import { createChatBotMessage } from "react-chatbot-kit";
import Image from "next/image";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";

const config = {
  botName: "DrugMaster",

  initialMessages: [
    createChatBotMessage("Welcome to DrugMaster! How can I assist you today?"),
  ],

  customComponents: {
    botAvatar: (props) => <imageg src="/favicon.ico" alt="Pill Icon" />,
  },

  widgets: [
    // Define widgets here
    {
      widgetName: "helpLinks",
      widgetFunc: (props) => {
        const message = createChatBotMessage("Here are some helpful links:", {
          withAvatar: true,
          delay: 500,
        });

        props.updateChatbotState((prevState) => ({
          ...prevState,
          user: null,
        }));

        return message;
      },
    },
  ],

  state: {
    user: null,
    // Define other state variables here
    // For example, you can store user information or chat history
    chatHistory: [],
  },

  messageParser: MessageParser,
  actionProvider: ActionProvider,
};

export default config;
