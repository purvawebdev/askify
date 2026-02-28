import {
  FaRobot,
  FaFileUpload,
  FaComments,
  FaBolt,
  FaBars,
} from "react-icons/fa";
import { useOutletContext } from "react-router-dom";

const features = [
  {
    icon: <FaComments className="text-brand text-xl" />,
    title: "Chat with AI",
    desc: "Ask anything and get intelligent answers instantly.",
  },
  {
    icon: <FaFileUpload className="text-brand text-xl" />,
    title: "Upload PDFs",
    desc: "Upload documents and ask questions about them.",
  },
  {
    icon: <FaBolt className="text-brand text-xl" />,
    title: "Fast Responses",
    desc: "Powered by Gemini for lightning-fast streaming.",
  },
];

const Welcome = () => {
  const { sidebarOpen, setSidebarOpen } = useOutletContext();

  return (
    <div className="flex items-center justify-center h-full flex-col px-6 relative">
      {/* Toggle sidebar button */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="absolute top-4 left-4 p-2 rounded-lg hover:bg-gray-100 transition text-gray-500 hover:text-gray-700"
          title="Open sidebar"
        >
          <FaBars size={16} />
        </button>
      )}

      {/* Logo & Title */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-brand/10 rounded-2xl flex items-center justify-center">
          <FaRobot className="text-brand text-2xl" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          AskifyAI
        </h1>
      </div>

      <p className="text-gray-500 mb-10 text-center max-w-md">
        Your intelligent assistant. Start a new chat or pick up where you left
        off.
      </p>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-brand/20 transition-all duration-200"
          >
            <div className="mb-3">{f.icon}</div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">
              {f.title}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
