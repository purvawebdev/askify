import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import { FaUser, FaRobot, FaPaperPlane } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
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

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const res = await api.get(`/chat/${id}`);
        setChat(res.data);
      } catch (err) {
        console.error("Failed to load chat", err);
      }
    };
    if (id) fetchChat();
  }, [id]);

  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const messageToSend = newMessage;
    setNewMessage("");
    
    // 1. Optimistically add ONLY the user message
    setChat((prev) => ({
      ...prev,
      messages: [...prev.messages, { role: "user", content: messageToSend }],
    }));
    
    // 2. Turn on the loading bubble
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      
      // Note: In production, change localhost:3000 to your deployed backend URL (e.g., import.meta.env.VITE_API_URL)
      const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: messageToSend, chatId: id }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

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
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));

              if (data.chunk) {
                // When the first word arrives, turn off the "Thinking..." bubble
                // and push an empty assistant message to the array to hold the text
                if (isFirstChunk) {
                  setLoading(false);
                  isFirstChunk = false;
                  setChat((prev) => ({
                    ...prev,
                    messages: [...prev.messages, { role: "assistant", content: "" }],
                  }));
                }

                // Append the chunk directly without timeouts
                fullText += data.chunk;

                // Update the last message in the array
                setChat((prev) => {
                  const updatedMessages = [...prev.messages];
                  updatedMessages[updatedMessages.length - 1].content = fullText;
                  return { ...prev, messages: updatedMessages };
                });
              }

              if (data.done) {
                console.log("Stream completed");
              }
            } catch ( e) {
              console.log("Failed to parse chunk", e);
              // Ignore incomplete JSON chunks (normal in streaming)
            }
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

  if (!chat)
    return <div className="flex h-full items-center justify-center text-gray-500">Loading conversation...</div>;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="p-4 bg-white border-b shadow-sm flex items-center justify-between">
        <h2 className="font-bold text-lg text-gray-800 truncate">
          {chat.title || "New Chat"}
        </h2>
        {/* <span className="text-xs text-gray-400">ID: {id}</span> */}
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {chat.messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user"
                  ? "bg-brand text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {msg.role === "user" ? <FaUser className="text-sm" /> : <FaRobot className="text-sm" />}
            </div>

            {/* Bubble */}
            <div
              className={`max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "bg-brand text-white rounded-tr-none"
                  : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
              }`}
            >
              <div className="message-content markdown-content">
                <ReactMarkdown
                  components={{
                    code({ inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code
                          className={`bg-gray-200 px-2 py-1 rounded text-xs font-mono ${
                            msg.role === "user" ? "bg-white/20" : "bg-gray-200"
                          }`}
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    h1: (props) => (
                      <h1 className="text-2xl font-bold my-3" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-xl font-bold my-2" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="text-lg font-bold my-2" {...props} />
                    ),
                    strong: (props) => (
                      <strong className="font-bold" {...props} />
                    ),
                    em: (props) => (
                      <em className="italic" {...props} />
                    ),
                    ul: (props) => (
                      <ul className="list-disc list-inside my-2 ml-2" {...props} />
                    ),
                    ol: (props) => (
                      <ol className="list-decimal list-inside my-2 ml-2" {...props} />
                    ),
                    li: (props) => (
                      <li className="my-1" {...props} />
                    ),
                    blockquote: (props) => (
                      <blockquote
                        className={`border-l-4 pl-3 my-2 italic ${
                          msg.role === "user" ? "border-white/50" : "border-gray-300"
                        }`}
                        {...props}
                      />
                    ),
                    a: (props) => (
                      <a
                        className={`underline ${
                          msg.role === "user" ? "text-blue-200" : "text-blue-500"
                        }`}
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        ))}

        {/* Loading Bubble */}
        {loading && (
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <FaRobot className="text-gray-600 animate-pulse" />
            </div>
            <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-gray-100 text-gray-400 text-sm">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-brand focus:ring-2 outline-none bg-gray-50"
          />
          <button
            type="submit"
            disabled={loading || !newMessage.trim()}
            className="bg-brand hover:bg-brand-dark text-white px-6 rounded-xl transition disabled:opacity-50 flex items-center justify-center"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;