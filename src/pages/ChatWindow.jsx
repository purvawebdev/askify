import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getChatById, sendMessageStream } from "../api/chatApi";
import {
  MessageBubble,
  ChatInput,
  ChatHeader,
  ThinkingBubble,
} from "../components/chat";
import "../styles/ChatWindow.css";

const ChatWindow = () => {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat on mount or when id changes
  useEffect(() => {
    const fetchChat = async () => {
      try {
        const data = await getChatById(id);
        setChat(data);
      } catch (err) {
        console.error("Failed to load chat", err);
      }
    };
    if (id) fetchChat();
  }, [id]);

  // Auto-scroll when messages update
  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || loading) return;

    const messageToSend = newMessage;
    setNewMessage("");

    // 1. Optimistically add user message
    setChat((prev) => ({
      ...prev,
      messages: [...prev.messages, { role: "user", content: messageToSend }],
    }));

    // 2. Show thinking bubble
    setLoading(true);

    try {
      const response = await sendMessageStream(messageToSend, id);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let isFirstChunk = true;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;

          try {
            const data = JSON.parse(line.slice(6));

            if (data.chunk) {
              if (isFirstChunk) {
                setLoading(false);
                isFirstChunk = false;
                setChat((prev) => ({
                  ...prev,
                  messages: [
                    ...prev.messages,
                    { role: "assistant", content: "" },
                  ],
                }));
              }

              fullText += data.chunk;

              setChat((prev) => {
                const updatedMessages = [...prev.messages];
                updatedMessages[updatedMessages.length - 1] = {
                  ...updatedMessages[updatedMessages.length - 1],
                  content: fullText,
                };
                return { ...prev, messages: updatedMessages };
              });
            }

            if (data.done) {
              console.log("Stream completed");
            }

            if (data.error) {
              throw new Error(data.error);
            }
          } catch {
            // Ignore incomplete JSON chunks (normal in streaming)
          }
        }
      }
    } catch (err) {
      console.error("Failed to send message", err);
      setLoading(false);
      setChat((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { role: "assistant", content: `Error: ${err.message}` },
        ],
      }));
    }
  };

  if (!chat) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Loading conversation...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <ChatHeader title={chat.title} />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {chat.messages.map((msg, index) => (
          <MessageBubble key={index} message={msg} />
        ))}

        {loading && <ThinkingBubble />}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        value={newMessage}
        onChange={setNewMessage}
        onSubmit={handleSend}
        disabled={loading}
      />
    </div>
  );
};

export default ChatWindow;
