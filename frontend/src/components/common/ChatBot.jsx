import React, { useEffect, useState, useRef } from "react";
import { FaChevronUp } from "react-icons/fa";
import { AiFillWechat } from "react-icons/ai";
import { MdClear } from "react-icons/md";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import useOutsideClose from "../../hooks/useOutsideClose";
import { marked } from "marked";
import httpClient from "../../httpClient";

const ChatBot = () => {
  const API_KEY = import.meta.env.VITE_API_KEY;

  if (!API_KEY) {
    console.error("API_KEY is missing in environment variables");
    return null;
  }

  const INTRO_WORDS = ["hi", "Hi", "hii", "hello", "hey", "namaste"];

  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, This is TelMedBot!!! Ask me anything!",
      sentTime: "just now",
      sender: "gemini-pro",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      window.scrollY >= 100 ? setIsVisible(true) : setIsVisible(false);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      e.target.value = null;
    }
  };

  useEffect(() => {
    if (selectedFile) {
      const editor = document.querySelector(
        ".cs-message-input__content-editor"
      );
      if (editor) editor.focus();
    }
  }, [selectedFile]);

  const sendFileToBackend = async () => {
    setSelectedFile(null);
    const formData = new FormData();
    formData.append("pdf", selectedFile);
    let userInput = document.querySelector(".cs-message-input").value;
    formData.append("user_input", userInput);

    try {
      const response = await httpClient.post("/analyze_pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const backendMessage =
        response.data.summary || "PDF analyzed successfully.";

      if (backendMessage) {
        const cleanedMarkdown = backendMessage.replace(
          /^```(?:\w+)?\n([\s\S]*?)```$/gm,
          "$1"
        );
        const htmlMessage = marked.parse(cleanedMarkdown);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: htmlMessage,
            sender: "gemini-pro",
            type: "html",
          },
        ]);
      }
    } catch (error) {
      console.error("Error analyzing PDF:", error);
      handleSend("Failed to analyze the PDF. Please try again.");
    }
  };

  const processMessageToGemini = async (chatMessages) => {
    const systemMessage = {
      text: "You are TelMedBot, an AI-powered medical assistant. Your job is to provide medically accurate, context-aware, and professional responses to user queries while aligning with ethical and medical guidelines. Avoid off-topic responses.",
    };

    const formattedMessages = [
      {
        parts: [
          { text: systemMessage.text }, // System message first
          ...chatMessages.map((message) => ({ text: message.message })), // User and bot messages
        ],
      },
    ];

    const apiRequestBody = { contents: formattedMessages };

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      // Log full response body for further debugging
      const responseData = await response.json();
      console.log("Full API Response:", responseData);

      if (
        !response.ok ||
        !responseData ||
        !responseData.candidates ||
        !responseData.candidates[0]?.content?.parts
      ) {
        console.error("API Error:", response.status, response.statusText);
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message:
              "Oopps !!! It's overload for today, Please try again later.",
            sender: "gemini-pro",
          },
        ]);
        setIsTyping(false);
        return;
      }

      const botResponse = responseData.candidates[0].content.parts[0].text;

      if (botResponse) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message: botResponse,
            sender: "gemini-pro",
          },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            message:
              "I'm sorry, I couldn't generate a response. Please try again.",
            sender: "gemini-pro",
          },
        ]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          message:
            "An error occurred while connecting to the server. Please try again later.",
          sender: "gemini-pro",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = async (msg) => {
    if (!msg.trim()) return;
    const sanitizedMessage = msg.replace(/&nbsp;/g, "").trim();

    const newMessage = {
      message: sanitizedMessage,
      direction: "outgoing",
      sender: "user",
    };

    if (INTRO_WORDS.includes(sanitizedMessage.toLowerCase())) {
      setMessages((prevMessages) => [
        ...prevMessages,
        newMessage,
        {
          message: "Hello!! Welcome to TelMedSphere!!!",
          sender: "gemini-pro",
        },
      ]);
      return;
    }

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setIsTyping(true);

    // Check if a file is selected
    if (selectedFile) {
      try {
        await sendFileToBackend();
        setSelectedFile(null);
      } catch (error) {
        console.error("Error sending file:", error);
        setIsTyping(false);
      }
    } else {
      // No file? Send message to Gemini
      try {
        await processMessageToGemini(updatedMessages);
      } catch (error) {
        console.error("Error processing message:", error);
        setIsTyping(false);
      }
    }
    setIsTyping(false);
  };

  const chatbotRef = useRef(null);
  useOutsideClose(chatbotRef, () => {
    if (open) {
      setOpen(false);
    }
  });

  return (
    <>
      {!open && (
        <div
          className={`fixed bottom-[13vh] mb-3 sm:mb-4 md:mb-6 right-[1.7vw] z-30 bg-blue-9 text-white-1 text-[1.4rem] p-2 cursor-pointer rounded-[3px] transform ${
            isVisible
              ? "scale-100 opacity-100 visible"
              : "scale-0 opacity-0 invisible"
          } transition-all duration-300 hover:bg-blue-8 max-lg:bottom-[11vh] max-lg:right-[2vw]`}
          title="Back to top"
          onClick={handleBackTop}
        >
          <FaChevronUp />
        </div>
      )}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-[5vh] mt-3 right-[1.3vw] z-30 bg-blue-9 text-white-1 text-[2rem] p-2 cursor-pointer rounded-[50%] transition-all duration-300 hover:bg-blue-8"
        title="Wanna Chat?"
      >
        {open ? <MdClear /> : <AiFillWechat />}
      </div>
      <div
        ref={chatbotRef}
        className={`fixed right-[1.5vw] bg-white-1 z-40 border-[2px] border-blue-2 rounded-[10px] pt-4 transition-all duration-300 ease-in-out ${
          open
            ? "bottom-[13vh] w-[300px] h-[450px] opacity-100 visible"
            : "bottom-[10vh] w-0 h-0 opacity-0 invisible"
        }`}
      >
        <div className="w-full h-full bg-white overflow-auto rounded-[10px] relative">
          <MainContainer style={{ border: 0, borderRadius: 10 }}>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="TelMedBot is typing" />
                  ) : null
                }
              >
                {messages.map((msg, idx) => (
                  <div key={idx} className={`message ${msg.sender}`}>
                    {msg.type === "html" ? (
                      <div
                        className="box-border text-black/90 bg-[#c6e3fa] mt-[.2em] px-4 py-2.5 rounded-xl whitespace-pre-wrap break-words font-sans text-[0.91em] font-normal"
                        dangerouslySetInnerHTML={{ __html: msg.message }}
                      />
                    ) : (
                      <Message model={msg} />
                    )}
                  </div>
                ))}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
                onSend={handleSend}
                style={{
                  border: selectedFile && "none",
                  zIndex: 20,
                  position: "relative",
                }}
                readOnly={!!selectedFile}
              />
            </ChatContainer>
          </MainContainer>
          <input
            id="fileUpload"
            type="file"
            accept=".pdf"
            className="absolute bottom-0 left-0 h-10 w-11 z-10 opacity-0"
            onChange={handleFileUpload}
          />
          {selectedFile && (
            <div
              id="filePreview"
              className="absolute bottom-12 left-0 h-20 w-full z-50 bg-white-1 border-t rounded-sm flex items-center"
            >
              <div className="w-12 h-12 mx-2 border rounded-md bg-white-1 text-red-5 flex justify-center items-center text-sm font-bold relative">
                <p>PDF</p>
                <button
                  className="absolute -top-[0.4rem] -right-[0.4rem] bg-black-0 bg-opacity-80 rounded-full font-medium text-md text-white-1 py-[2px] px-[5px]"
                  onClick={() => {
                    setSelectedFile(null);
                  }}
                >
                  &times;
                </button>
              </div>
              <p className="max-w-[60%] truncate whitespace-nowrap overflow-hidden text-ellipsis">
                {selectedFile.name}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatBot;
