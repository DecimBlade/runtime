import React, { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import SendMessage from "./SendMessage";
import { database } from "../firebase.js";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = collection(database, "messages");
    const q = query(messagesRef, orderBy("timestamp") );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-col w-2/5">
        <div className="flex flex-col overflow-y-auto flex-col-reverse h-64 rounded-sm px-10 pt-5 dark:text-white ">
          {messages.map((message, index) => (
            <div key={index}>
              <p>{message.username}: {message.text}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-full">
          <SendMessage />
        </div>
    </div>
  );
};

export default Chat;


