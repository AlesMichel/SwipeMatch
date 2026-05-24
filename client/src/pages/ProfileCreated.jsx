import { useLocation, useNavigate } from "react-router-dom";

export default function ProfileCreated() {
    const { state } = useLocation();
    const navigate = useNavigate();
    const user = state?.user;

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-sm text-center">
                <div className="text-5xl mb-6">🎉</div>
                <h2 className="text-2xl font-semibold mb-2">Profil vytvořen</h2>
                <p className="text-gray-400 text-sm mb-8">
                    Vítej, <span className="text-gray-600 font-medium">{user?.name}</span>!
                </p>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="w-full py-3 rounded-xl bg-rose-400 text-white text-sm font-medium hover:bg-rose-500 transition-colors"
                >
                    Zpět na hlavní stránku
                </button>
            </div>
        </div>
    );
}