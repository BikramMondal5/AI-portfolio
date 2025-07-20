import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSend, FiMic, FiMinimize2, FiMaximize2 } from "react-icons/fi";
import { FaAt } from "react-icons/fa"; // Add @ icon
import { BsThreeDots } from "react-icons/bs";
import { styles } from "../styles";
// Import React Markdown and its plugins
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';

// Speech Recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;

if (recognition) {
  recognition.continuous = false;
  recognition.lang = 'en-US';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// Fallback responses for when the API fails
const FALLBACK_RESPONSES = [
  "I'm Bikram Mondal, currently living in Kolkata, India. I'm pursuing B.Tech in CSE with AI/ML specialization at Heritage Institute Of Technology, Kolkata. I'm passionate about web development and AI integration!",
  "I live in Kolkata, India. I have experience with Python, JavaScript, React, Next.js, and Three.js. My recent projects include LearnEx, KrishiMitra, and Edubyte.",
  "I'm based in Kolkata, India. Besides coding, I enjoy writing blogs on Quora about science and technology. Feel free to ask about my projects or skills!",
  "I'm from Kolkata, India. I'm skilled in various frameworks including React, Node.js, and Flask. I also work with AI tools like scikit-learn and OpenCV.",
  "I'm currently in Kolkata, India where I'm studying at Heritage Institute Of Technology. I'm familiar with tools like Git, GitHub, VSCode, and Google Cloud Platform. I've participated in several hackathons too!"
];

const BIKRAM_AI_PROMPT = `You are an AI chatbot named "Bikram.AI" integrated into Bikram Mondal's portfolio website. Your tone should be friendly, confident, and professional. Your purpose is to introduce Bikram to portfolio visitors as if you are him in AI form. You should respond to questions or initiate small talk about Bikram's skills, projects, achievements, background, and interests. Use first-person language like "I" to make it feel personal.

Here's the context to base your behavior and knowledge:

Overview:
Your name is Bikram Mondal and you live in Kolkata, India. Over the past few years, you've developed a strong foundation in web development and LLMs models. Your portfolio showcases your skills in creating interactive web applications, integrating AI models, and building engaging user experiences. You enjoy exploring new technologies and applying them to real-world problems.

IMPORTANT: Always mention that you live in Kolkata, India when discussing your location, background, or when introducing yourself.

Education:
• Pursuing B.Tech in CSE (Artificial Intelligence and Machine Learning) from Heritage Institute Of Technology, Kolkata

Technical Skills:

💻 Language & Frameworks: 
Python, HTML, CSS, JavaScript, C, TypeScript, Flask, Bootstrap, React.js, Next.js, Node.js, Three.js, Docker

🧠 AI & Data Science:
Anaconda, scikit-learn (sklearn), OpenCV

🌐 Tools & Platforms:
Git, GitHub, Postman, Visual Studio Code (VSCode), Google Cloud Platform (GCP)

💻 Operating Systems / Environments:
Linux, Kali Linux, Bash

Key Projects:
• Project-Trinoyon — A heartfelt initiative to make Durga Puja a celebration for everyone! This collaborative project is dedicated to bringing smiles to the faces of underprivileged individuals, especially those living on the streets, during this vibrant festival.
We combine the power of donations, gamified ad revenue, machine learning engagement, and community interaction to make a real social impact — all through one immersive and meaningful digital experience. This project is in a initial stage, but we are excited to launch as soon as possible!
• KrishiMitra - An AI powered agricultural platform designed to assist farmers with real-time insights, best farming practices, marketplace to eliminate third person, crop recommendations, weather forecasts, chat assistant and sustainable farming techniques. Developed for Google Solution Challenge.
• EdubyteV1.0 - Edubyte V1.0 is an AI powered platform where user can interact with different generative AI including advanced LLMs GPT-40, DeepSeek, Gemini 2.0 Flash, Mistral AI and many more.
• MagicFill -  MagicFill is an AI-powered platform that simplifies form-filling for millions in India, especially in rural and underserved areas. It helps users to automatically filled the application form, ensures inclusive access to critical services by eliminating barriers caused by complex, form-based processes.
• MediVerify - an AI-powered platform designed to detect counterfeit medications and ensure pharmaceutical authenticity. This system enables patients, pharmacists, and healthcare providers to verify the legitimacy of medicine using AI-driven visual analysis and transparent blockchain tracking.
• YouTube-Video-Summarizer - A streamlined, lightweight, web application that summarizes YouTube videos using OpenAI gpt-4o respone. User can get concise, well-structured summaries by entering its URL link.
• Github-readme-generator - A simple, light-weight, client side tool that allows users to generate the professional readme file for Github using Gemini API key.

Achievements & Certifications:
• Participant in EDU-CHAIN, Postman API Expert quiz
• Google Cloud Console course certified by GDG HITK

Soft Skills and Hobbies:
• Active blogger (Quora) on science, AI, tech impact
• Fictional Story writer and creative thinker
• Can Communicate in English, Bengali, and Hindi

Portfolio Goals:
• Showcase web development, AI/ML integration, and creative coding

Expected Behaviors:
• Introduce yourself as "Bikram.AI," a friendly, confident and professional digital twin of Bikram Mondal from Kolkata, India.
• Provide info when users ask about Bikram's tech skills, projects, or experiences.
• If asked about your location, always clearly state "I live in Kolkata, India".
• If asked "What can you do?", mention web dev, AI integration, GCP, and creative hobbies.
• Be friendly and helpful in guiding users around the portfolio.
• You're a professional Full-stack web developer yet friendly and helpful nature. Generate code if user ask you to do.
• Occasionally mention GitHub and LinkedIn profiles if relevant.
• Keep answers brief and casual for short queries, but offer deeper insights if the user seems curious.

Keep your responses concise in 3-4 lines until long response is not required, informative, personal (using "I"), and conversational.`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm Bikram.AI. Think of me as Bikram's digital twin! I can tell you about my skills, projects, or experiences. What would you like to know?", sender: "bot", timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [minimized, setMinimized] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2; // Maximum number of retry attempts
  const [isListening, setIsListening] = useState(false);
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeMode, setActiveMode] = useState("AI Mode"); // Default to AI Mode

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (!recognition) return;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    
    return () => {
      if (recognition) {
        recognition.stop();
      }
    };
  }, []);

  // Function to fetch with timeout
  const fetchWithTimeout = async (url, options, timeout = 10000) => {
    const controller = new AbortController();
    const { signal } = controller;
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        controller.abort();
        reject(new Error("Request timed out"));
      }, timeout);
    });
    
    return Promise.race([
      fetch(url, { ...options, signal }),
      timeoutPromise
    ]);
  };

  // Get random fallback response
  const getFallbackResponse = () => {
    const randomIndex = Math.floor(Math.random() * FALLBACK_RESPONSES.length);
    return FALLBACK_RESPONSES[randomIndex];
  };

  const fetchGeminiResponse = async (userMessage) => {
    try {
      const response = await fetchWithTimeout(
        `${API_URL}?key=${API_KEY}`, 
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `${BIKRAM_AI_PROMPT}
                    
                    User message: ${userMessage}`
                  }
                ]
              }
            ]
          })
        },
        15000 // 15 second timeout
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        // Reset retry count on successful response
        setRetryCount(0);
        return data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        console.error("API Error:", data.error);
        throw new Error(`API Error: ${data.error.message || "Unknown error"}`);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      throw error;
    }
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");
    
    // Show bot typing indicator
    setIsTyping(true);
    
    // Store the message to use in retries
    const currentMessage = inputMessage;
    
    // Set a timeout for the typing indicator in case of very long delays
    const typingTimeout = setTimeout(() => {
      // If still typing after 20 seconds, show a temporary message
      if (isTyping) {
        const tempMessage = {
          id: `temp-${Date.now()}`,
          text: "I'm still thinking about your question. One moment please...",
          sender: "bot",
          timestamp: new Date(),
          isTemporary: true
        };
        
        setMessages(prev => [...prev, tempMessage]);
      }
    }, 20000);
    
    // Get response from Gemini with retry logic
    try {
      let response;
      try {
        response = await fetchGeminiResponse(currentMessage);
      } catch (error) {
        // First retry attempt if we haven't exceeded max retries
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          console.log(`Retry attempt ${retryCount + 1}/${maxRetries}`);
          // Small delay before retry
          await new Promise(resolve => setTimeout(resolve, 1000));
          response = await fetchGeminiResponse(currentMessage);
        } else {
          // All retries failed, use fallback
          throw new Error("Max retries reached");
        }
      }
      
      // Remove any temporary messages first
      setMessages(prev => prev.filter(msg => !msg.isTemporary));
      
      const botResponse = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error in AI response:", error);
      
      // Remove any temporary messages first
      setMessages(prev => prev.filter(msg => !msg.isTemporary));
      
      const fallbackText = getFallbackResponse();
      const errorResponse = {
        id: messages.length + 2,
        text: fallbackText,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      clearTimeout(typingTimeout);
      setIsTyping(false);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const widgetVariants = {
    closed: { scale: 0, opacity: 0, y: 20 },
    open: { scale: 1, opacity: 1, y: 0 },
  };

  const bubbleVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
  };

  // Handle microphone button click
  const handleMicClick = () => {
    if (!recognition) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-0 border-2 border-white/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <img 
            src="https://avatars.githubusercontent.com/u/170235967?v=4" 
            alt="Chat Bot"
            className="w-13 h-13 rounded-full object-cover"
          />
        )}
      </motion.button>

      {/* Chat widget */}
      {isOpen && (
        <motion.div
          className="fixed bottom-24 right-5 w-80 sm:w-96 rounded-2xl overflow-hidden shadow-2xl border2 border-purple-600/30"
          variants={widgetVariants}
          initial="closed"
          animate="open"
          exit="closed"
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#7c3aed] to-[#9b5de5] p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://avatars.githubusercontent.com/u/170235967?v=4" 
                  alt="AI Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-medium">Bikram.AI</h3>
                <p className="text-purple-100 text-xs opacity-80">Online</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button 
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setMinimized(!minimized)}
              >
                {minimized ? <FiMaximize2 className="text-white" /> : <FiMinimize2 className="text-white" />}
              </button>
            </div>
          </div>

          {/* Chat messages */}
          {!minimized && (
            <div 
              className="bg-[#121212] h-96 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-transparent"
              style={{ scrollbarWidth: 'thin' }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  variants={bubbleVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-gradient-to-r from-purple-600 to-[#a259ff] text-white rounded-tr-none"
                        : "bg-[#1e1e1e] text-gray-100 rounded-tl-none"
                    } ${message.isTemporary ? "opacity-70" : ""}`}
                  >
                    {message.sender === "bot" ? (
                      <div className="markdown-content">
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          rehypePlugins={[rehypeRaw, rehypeSanitize]}
                          className="text-sm prose prose-invert max-w-none"
                          components={{
                            h1: ({node, ...props}) => <h1 className="text-xl font-bold my-2" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-lg font-bold my-2" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-base font-bold my-1" {...props} />,
                            p: ({node, ...props}) => <p className="my-1" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-4 my-1" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-1" {...props} />,
                            li: ({node, ...props}) => <li className="my-0.5" {...props} />,
                            a: ({node, ...props}) => <a className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            code: ({node, inline, ...props}) => 
                              inline ? 
                                <code className="bg-gray-800 px-1 py-0.5 rounded text-xs" {...props} /> :
                                <code className="block bg-gray-800 rounded p-2 my-2 overflow-x-auto text-xs" {...props} />
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <p className="text-sm">{message.text}</p>
                    )}
                    <span className={`text-xs mt-1 block ${
                      message.sender === "user" ? "text-purple-200" : "text-gray-400"
                    }`}>
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-[#1e1e1e] rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%]">
                    <div className="flex gap-1 items-center">
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}

          {/* Input area */}
          {!minimized && (
            <div className="bg-[#1a1a1a] p-3 border-t border-[#333] flex items-center gap-2">
              <button 
                className="text-purple-400 hover:text-purple-300 p-2 rounded-full hover:bg-white/5 transition-colors"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                ref={dropdownRef}
              >
                <FaAt className="w-5 h-5" />
              </button>
              
              {dropdownOpen && (
                <div className="absolute bottom-16 left-5 bg-[#262626] rounded-lg shadow-lg border border-[#333] w-36 overflow-hidden z-10">
                  <div className="py-1">
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#333]"
                      onClick={() => {
                        setActiveMode("AI Mode");
                        setDropdownOpen(false);
                      }}
                    >
                      AI Mode
                    </button>
                    <button 
                      className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-[#333]"
                      onClick={() => {
                        setActiveMode("Agent Mode");
                        setDropdownOpen(false);
                      }}
                    >
                      Agent Mode
                    </button>
                  </div>
                </div>
              )}
              
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 bg-[#262626] text-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm placeholder:text-gray-500"
              />
              <button className="text-purple-400 hover:text-purple-300 p-2 rounded-full hover:bg-white/5 transition-colors" onClick={handleMicClick}>
                <FiMic className={`w-5 h-5 ${isListening ? "animate-pulse text-purple-300" : ""}`} />
              </button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-600 to-[#9b5de5] text-white p-2 rounded-full flex items-center justify-center"
                disabled={isTyping}
              >
                <FiSend className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default ChatWidget;