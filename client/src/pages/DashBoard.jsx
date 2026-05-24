import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";


const BASE = "http://localhost:8888";

export default function Dashboard() {
    const navigate = useNavigate();
    const [active, setActive] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${BASE}/api/users/active`)
            .then((r) => r.json())
            .then((data) => {
                if (data.id) setActive(data);
                else navigate("/");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-400 text-sm">Načítám...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-xs">

                {/* Profil */}
                <UserCard user={active} />

                {/* Akce */}
                <div className="space-y-3">
                    <button
                        onClick={() => navigate("/browse")}
                        className="w-full py-3.5 rounded-full bg-rose-400 text-white font-medium hover:bg-rose-500 transition-colors"
                    >
                        Swipovat
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full py-3 text-sm text-gray-400 hover:text-gray-500 transition-colors"
                    >
                        Přepnout profil
                    </button>
                </div>

            </div>
        </div>
    );
}