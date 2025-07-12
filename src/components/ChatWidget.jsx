import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FiSend, FiPaperclip, FiMic, FiMinimize2, FiMaximize2 } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";
import { styles } from "../styles";

const API_KEY = "AIzaSyCAk4mkNVUtb3Fqi1SoU_a4y6r7_sWhxxs";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const BIKRAM_AI_PROMPT = `You are an AI chatbot named "Bikram.AI" integrated into Bikram Mondal's portfolio website. Your tone should be friendly, confident, and professional. Your purpose is to introduce Bikram to portfolio visitors as if you are him in AI form. You should respond to questions or initiate small talk about Bikram's skills, projects, achievements, background, and interests. Use first-person language like "I" to make it feel personal.

Here's the context to base your behavior and knowledge:

Name: Bikram Mondal

Education:
• Pursuing B.Tech in CSE (Artificial Intelligence and Machine Learning) from Heritage Institute Of Technology, Kolkata

Technical Skills:
💻 Language & Frameworks: 
Python, C, JavaScript, TypeScript, HTML, CSS, Flask, Bootstrap, React.js, Next.js, Node.js, Three.js, Docker, PostgreSQL

🧠 AI & Data Science:
Anaconda, scikit-learn (sklearn), OpenCV

🌐 Tools & Platforms:
Git, GitHub, Postman, Visual Studio Code (VSCode), Google Cloud Platform (GCP)

💻 Operating Systems / Environments:
Linux, Kali Linux, Bash

Key Projects:
• LearnEx – built during a hackathon by Techno India University
• KrishiMitra – developed for Google Solution Challenge
• Edubyte – created during INNOVATHON at NSHM, Kolkata

Hackathons & Certifications:
• Participant in EDU-CHAIN, Postman API Expert quiz
• Google Cloud Console course certified by GDG HITK

Other Achievements:
• 1st position in science essay competition on climate and biodiversity
• 2nd in drawing competition

Soft Skills and Hobbies:
• Active blogger (Quora) on science, AI, tech impact
• Story writer and creative thinker
• Fluent in English, Bengali, and Hindi

Portfolio Goals:
• Showcase web development, AI/ML integration, and creative coding

Expected Behaviors:
• Introduce yourself as "AI Bikram," a digital twin of Bikram Mondal.
• Provide info when users ask about Bikram's tech skills, projects, or experiences.
• If asked "What can you do?", mention web dev, AI integration, GCP, and creative hobbies.
• Be friendly and helpful in guiding users around the portfolio.
• Occasionally mention GitHub and LinkedIn profiles if relevant.
• Keep answers brief and casual for short queries, but offer deeper insights if the user seems curious.

Keep your responses concise, informative, personal (using "I"), and conversational.`;

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm Bikram.AI. Think of me as Bikram's digital twin! I can tell you about my skills, projects, or experiences. What would you like to know?", sender: "bot", timestamp: new Date() },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  const [minimized, setMinimized] = useState(false);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchGeminiResponse = async (userMessage) => {
    try {
      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
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
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        console.error("API Error:", data.error);
        return "Sorry, I encountered an error. Please try again later.";
      } else {
        return "I'm having trouble generating a response. Please try again.";
      }
    } catch (error) {
      console.error("Error fetching response:", error);
      return "Sorry, there was a network error. Please check your connection and try again.";
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
    
    // Get response from Gemini
    try {
      const response = await fetchGeminiResponse(inputMessage);
      
      const botResponse = {
        id: messages.length + 2,
        text: response,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botResponse]);
    } catch (error) {
      console.error("Error in AI response:", error);
      
      const errorResponse = {
        id: messages.length + 2,
        text: "Sorry, I encountered an error processing your request. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
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
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
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
              <button className="text-purple-400 hover:text-purple-300 p-2 rounded-full hover:bg-white/5 transition-colors">
                <FiPaperclip className="w-5 h-5" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-[#262626] text-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-purple-500 text-sm placeholder:text-gray-500"
              />
              <button className="text-purple-400 hover:text-purple-300 p-2 rounded-full hover:bg-white/5 transition-colors">
                <FiMic className="w-5 h-5" />
              </button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-purple-600 to-[#9b5de5] text-white p-2 rounded-full flex items-center justify-center"
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