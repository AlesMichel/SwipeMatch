import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { path: "/browse", icon: "🔥", label: "Discover" },
        { path: "/matches", icon: "💬", label: "Matches" },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex">
            {tabs.map((tab) => (
                <button
                    key={tab.path}
                    onClick={() => navigate(tab.path)}
                    className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors
            ${location.pathname === tab.path ? "text-rose-400" : "text-gray-300"}`}
                >
                    <span className="text-xl">{tab.icon}</span>
                    <span className="text-xs font-medium">{tab.label}</span>
                </button>
            ))}
        </div>
    );
}