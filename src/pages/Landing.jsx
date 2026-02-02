import React from 'react';
import { Link } from 'react-router-dom';
import { FaRobot, FaBolt, FaShieldAlt } from 'react-icons/fa'; // Icons

const Landing = () => {
  return (
    <div className="min-h-screen bg-brand-light font-sans text-gray-900">
      
      {/* --- Navbar --- */}
      <nav className="flex justify-between items-center p-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-brand tracking-tighter flex items-center gap-2">
          <FaRobot className="text-3xl" /> Askify<span className="text-gray-400">AI</span>
        </div>
        <div className="space-x-4">
          <Link to="/login" className="px-5 py-2 text-brand font-medium hover:text-brand-dark transition">Login</Link>
          <Link to="/register" className="px-5 py-2 bg-brand text-white font-semibold rounded-full hover:bg-brand-dark transition shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Get Started
          </Link>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header className="flex flex-col items-center justify-center text-center mt-20 px-4">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-white border border-brand/20 text-brand text-sm font-semibold shadow-sm">
          🚀 New: RAG Document Uploads are live!
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight">
          Chat with your <span className="text-brand">Data</span> <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-brand to-teal-400">
            Intelligently.
          </span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl">
          Don't just search. <strong>Ask.</strong> Upload your PDFs and get instant, context-aware answers powered by Gemini AI and Vector Search.
        </p>

        <div className="mt-10 flex gap-4">
          <Link to="/register" className="px-8 py-4 bg-brand text-white text-lg font-bold rounded-xl shadow-xl hover:bg-brand-dark transition hover:scale-105">
            Start Chatting Free
          </Link>
          <a href="#features" className="px-8 py-4 bg-white text-gray-700 text-lg font-bold rounded-xl shadow-md border border-gray-100 hover:bg-gray-50 transition">
            How it works
          </a>
        </div>

        {/* --- Hero Image / Mockup --- */}
        <div className="mt-20 relative w-full max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-brand blur-[100px] opacity-20 rounded-full"></div>
          <img 
            src="https://placehold.co/1200x800/207568/ffffff?text=Chat+Interface+Preview" 
            alt="App Preview" 
            className="relative rounded-2xl shadow-2xl border-4 border-white/50 backdrop-blur-sm"
          />
        </div>
      </header>

      {/* --- Features Grid --- */}
      <section id="features" className="py-24 bg-white mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why choose Askify?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="p-8 rounded-2xl bg-brand-light/30 border border-brand/10 hover:border-brand/30 transition hover:shadow-lg">
              <div className="w-12 h-12 bg-brand rounded-lg flex items-center justify-center text-white mb-6">
                <FaBolt className="text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
              <p className="text-gray-600">Powered by Vector Search, we find the exact paragraph you need in milliseconds, not minutes.</p>
            </div>
            {/* Card 2 */}
            <div className="p-8 rounded-2xl bg-brand-light/30 border border-brand/10 hover:border-brand/30 transition hover:shadow-lg">
              <div className="w-12 h-12 bg-brand rounded-lg flex items-center justify-center text-white mb-6">
                <FaRobot className="text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gemini AI Brain</h3>
              <p className="text-gray-600">Uses Google's Gemini Pro to understand context, summarize complex topics, and write code.</p>
            </div>
            {/* Card 3 */}
            <div className="p-8 rounded-2xl bg-brand-light/30 border border-brand/10 hover:border-brand/30 transition hover:shadow-lg">
              <div className="w-12 h-12 bg-brand rounded-lg flex items-center justify-center text-white mb-6">
                <FaShieldAlt className="text-xl" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
              <p className="text-gray-600">Your data is encrypted. Your chats are private. We use JWT authentication for bank-grade security.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 text-center text-gray-500 text-sm">
        © 2026 AskifyAI. Built with MERN Stack.
      </footer>
    </div>
  );
};

export default Landing;