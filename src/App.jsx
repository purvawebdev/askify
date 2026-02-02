import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';

// Import the new stuff
import ChatLayout from './components/chatLayout';
import Welcome from './pages/Welcome';
import ChatWindow from './pages/ChatWindow';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* --- Protected Chat Routes --- */}
        {/* 1. Parent Route: Renders the Layout (Sidebar) */}
        <Route path="/chat" element={<ChatLayout />}>
          
          {/* 2. Index Route: Shows when URL is exactly "/chat" */}
          <Route index element={<Welcome />} />
          
          {/* 3. Child Route: Shows when URL is "/chat/123" */}
          <Route path=":id" element={<ChatWindow />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;