import React from "react";
import { TypewriterEffectSmooth } from "../ui/aceternity/typewriter-effect";
import UserQuestion from "./UserQuestion";
import styles from "./chat.module.css";
import AiResponse from "./AiResponse";

// when isAiLoading = true, we will show the loading spinner on the last response

export default function ChatBox({
  userQueries,
  chatHistories,
  isChatting,
  projectName,
  isAiLoading,
}) {
  const words = [
    {
      text: "How",
    },
    {
      text: "can",
    },
    {
      text: "I",
    },
    {
      text: "help",
    },
    {
      text: "you",
    },
    {
      text: "with",
    },
    {
      text: `${projectName}?`,
    },
  ];

  if (!isChatting) {
    return (
      <div
        className="
      h-full flex flex-col justify-center text-left"
      >
        <h1 className="text-5xl font-bold">Hi Ian,</h1>
        <TypewriterEffectSmooth words={words} />
      </div>
    );
  }

  return (
    <div className={styles.chatBoxContainer}>
      <div className={styles.chats}>
        {chatHistories?.slice(1).map(({ query, response }, index) => (
          <div key={index}>
            <UserQuestion query={query} />
            <AiResponse
              isAiLoading={isAiLoading && index === chatHistories.length - 2}
              isLastResponse={index === chatHistories.length - 2}
              response={response}
            />
          </div>
        ))}
      </div>
    </div>
  );
}