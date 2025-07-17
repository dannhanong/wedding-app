"use client";

import { useState, useEffect, useRef } from "react";
import { chatWithBot } from "@/services/chat";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";

// Tạo interface cho tin nhắn để TypeScript hiểu cấu trúc
interface ChatMessage {
  text: string;
  sender: "user" | "bot";
  timestamp?: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Tải lịch sử chat từ cookie khi component mount
  useEffect(() => {
    const savedHistory = Cookies.get('chatHistory');

    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setMessages(parsedHistory);
      } catch (error) {
        console.error("Lỗi khi phân tích lịch sử chat:", error);
        // Khởi tạo tin nhắn mặc định nếu không đọc được cookie
        setMessages([{
          text: "Xin chào! Tôi là trợ lý ảo cho đám cưới của Thành và Khuê. Bạn có câu hỏi gì không?",
          sender: "bot",
          timestamp: new Date()
        }]);
      }
    } else {
      // Khởi tạo tin nhắn mặc định nếu không có cookie
      setMessages([{
        text: "Xin chào! Tôi là trợ lý ảo cho đám cưới của Thành và Khuê. Bạn có câu hỏi gì không?",
        sender: "bot",
        timestamp: new Date()
      }]);
    }
  }, []);

  // Lưu lịch sử chat vào cookie mỗi khi messages thay đổi
  useEffect(() => {
    if (messages.length > 0) {
      Cookies.set('chatHistory', JSON.stringify(messages), { expires: 60 });  // Hết hạn sau 60 ngày
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;

    // Thêm tin nhắn người dùng
    const userMessage: ChatMessage = {
      text: inputValue,
      sender: "user",
      timestamp: new Date()
    };
    const newMessages = [...messages, userMessage];

    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      // Hiển thị indicator "đang nhập"
      setMessages([...newMessages, { text: "...", sender: "bot" }]);

      // Lấy phản hồi từ API
      const response = await chatWithBot(inputValue);

      // Xóa indicator và thêm phản hồi thực tế
      const botResponse: ChatMessage = {
        text: response,
        sender: "bot",
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, botResponse];
      setMessages(finalMessages);

      // Lưu lịch sử vào cookie
      Cookies.set('chatHistory', JSON.stringify(finalMessages), { expires: 60 });
    } catch (error) {
      // Xử lý lỗi
      console.error("Lỗi khi nhận phản hồi từ bot:", error);
      const errorMessage: ChatMessage = {
        text: "Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn.",
        sender: "bot",
        timestamp: new Date()
      };

      const finalMessages = [...newMessages, errorMessage];
      setMessages(finalMessages);

      // Lưu lịch sử vào cookie
      Cookies.set('chatHistory', JSON.stringify(finalMessages), { expires: 60 });
    } finally {
      setIsLoading(false);
    }
  };

  const clearHistory = () => {
    Swal.fire({
      title: 'Bạn có chắc chắn muốn xóa lịch sử trò chuyện?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Hủy',
      cancelButtonColor: '#3085d6',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const initialMessage: ChatMessage = {
          text: "Xin chào! Tôi là trợ lý ảo cho đám cưới của Thành và Khuê. Bạn có câu hỏi gì không?",
          sender: "bot",
          timestamp: new Date()
        };

        setMessages([initialMessage]);
        Cookies.set('chatHistory', JSON.stringify([initialMessage]), { expires: 60 });
      }
    });
  };

  // Tự động cuộn xuống dưới khi có tin nhắn mới
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Format thời gian
  const formatTime = (date: Date) => {
    if (!date) return '';

    const d = new Date(date);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
  };

  return (
    <>
      {/* Nút chat */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-14 p-3 rounded-full shadow-lg z-50 transition-all ${isOpen ? "bg-red-400 hover:bg-red-500" : "bg-pink-400 hover:bg-pink-500"
          }`}
      >
        {isOpen ? "×" : "💬"}
      </button>

      {/* Giao diện chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-14 w-80 h-96 bg-white rounded-lg shadow-xl z-50 flex flex-col overflow-hidden border border-pink-200">
          {/* Phần header */}
          <div className="bg-pink-400 text-white p-3 font-medium text-center shadow flex justify-between items-center">
            <div>Chat với trợ lý đám cưới</div>
            <button
              onClick={clearHistory}
              className="text-xs bg-pink-500 hover:bg-pink-600 px-2 py-1 rounded"
              title="Xóa lịch sử chat"
            >
              Xóa lịch sử
            </button>
          </div>

          {/* Phần tin nhắn */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"
                  }`}
              >
                <div className="flex flex-col">
                  <span
                    className={`inline-block p-2 rounded-lg ${msg.sender === "user"
                      ? "bg-pink-100 text-gray-800"
                      : "bg-pink-400 text-white"
                      }`}
                  >
                    {msg.text === "..." ? (
                      <span className="flex items-center space-x-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>.</span>
                      </span>
                    ) : (
                      msg.text
                    )}
                  </span>
                  {msg.timestamp && (
                    <span className={`text-xs text-gray-500 mt-1 ${msg.sender === "user" ? "text-right" : "text-left"
                      }`}>
                      {formatTime(new Date(msg.timestamp))}
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Phần nhập tin nhắn */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Câu hỏi của bạn..."
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 focus:outline-none focus:border-pink-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`text-white px-3 py-2 rounded-r-lg transition-colors ${isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-400 hover:bg-pink-500"
                }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12" cy="12" r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Gửi"
              )}
            </button>
          </form>
        </div>
      )}
    </>
  );
}