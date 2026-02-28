import React from "react";
import { FaUser, FaRobot } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageBubble = ({ message }) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          isUser ? "bg-brand text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        {isUser ? (
          <FaUser className="text-sm" />
        ) : (
          <FaRobot className="text-sm" />
        )}
      </div>

      {/* Bubble */}
      <div
        className={`max-w-[70%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
          isUser
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
                    className={`px-2 py-1 rounded text-xs font-mono ${
                      isUser ? "bg-white/20" : "bg-gray-200"
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
              strong: (props) => <strong className="font-bold" {...props} />,
              em: (props) => <em className="italic" {...props} />,
              ul: (props) => (
                <ul className="list-disc list-inside my-2 ml-2" {...props} />
              ),
              ol: (props) => (
                <ol className="list-decimal list-inside my-2 ml-2" {...props} />
              ),
              li: (props) => <li className="my-1" {...props} />,
              blockquote: (props) => (
                <blockquote
                  className={`border-l-4 pl-3 my-2 italic ${
                    isUser ? "border-white/50" : "border-gray-300"
                  }`}
                  {...props}
                />
              ),
              a: (props) => (
                <a
                  className={`underline ${
                    isUser ? "text-blue-200" : "text-blue-500"
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                />
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;
