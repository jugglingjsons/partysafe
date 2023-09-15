// components/LibraryWithChatbot.js
import React from "react";
import Searchbar from "@/components/ui/Searchbar";
import Chatbot from "@/components/bot/Chatbot";
import Library from "./Library";
import Image from "next/image";

const LibraryWithChatbot = () => {
  return (
    <div>
      <h1>Drug Library</h1>
      <Searchbar placeholder="Search a drug..." />
      <Library />
      <Chatbot
        botName="DrugMaster"
        chatIcon={
          <image
            src="/icons8-rick-sanchez-color/icons8-rick-sanchez-480.svg.ico"
            alt="Pill Icon"
          />
        }
      />
    </div>
  );
};

export default LibraryWithChatbot;
