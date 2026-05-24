import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TinderCard from "react-tinder-card";
import BottomNav from "../components/BottomNav";
import BrowseFilters from "../components/BrowseFilters";

const BASE = "http://localhost:8888";

export default function Browse() {
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [activeUser, setActiveUser] = useState(null);
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [matchInfo, setMatchInfo] = useState(null);
    const [filters, setFilters] = useState({});

    useEffect(() => {
        init();
    }, []);

    const init = async () => {
        const res = await fetch(`${BASE}/api/users/active`);
        const data = await res.json();
        if (!res.ok) {
            setMessage(data.message);
            setLoading(false);
            return;
        }
        setActiveUser(data);
        loadProfile({}, data);
    };

    const loadProfile = async (activeFilters = filters, active = activeUser) => {
        setLoading(true);
        setMatchInfo(null);
        const params = new URLSearchParams(
            Object.fromEntries(Object.entries(activeFilters).filter(([_, v]) => v !== "" && v !== null && v !== undefined))
        ).toString();
        const res = await fetch(`${BASE}/api/browse${params ? `?${params}` : ""}`);
        const data = await res.json();
        if (!res.ok || data.message) {
            setMessage(data.message);
            setProfile(null);
        } else {
            setProfile(data);
            setMessage(null);
        }
        setLoading(false);
    };

    const handleFilter = (newFilters) => {
        setFilters(newFilters);
        loadProfile(newFilters);
    };

    const swipe = async (action) => {
        if (!profile || !activeUser) return;
        const res = await fetch(`${BASE}/api/match`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                fromProfile: activeUser.id,
                toProfile: profile.id,
                action,
            }),
        });
        const data = await res.json();
        if (data.info === "Match has been found") {
            setMatchInfo(`🎉 Match s ${profile.name}!`);
            setTimeout(() => loadProfile(), 2000);
        } else {
            loadProfile();
        }
    };

    const onSwipe = (direction) => {
        if (direction === "right") swipe(true);
        if (direction === "left") swipe(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <p className="text-gray-400 text-sm">Načítám...</p>
            </div>
        );
    }

    if (message) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 pb-24">
                <p className="text-gray-500 text-center mb-6">{message}</p>
                <div className="flex flex-col gap-3 w-full max-w-xs">
                    <button
                        onClick={() => {
                            setFilters({});
                            loadProfile({});
                        }}
                        className="w-full py-3 rounded-xl bg-rose-400 text-white text-sm font-medium hover:bg-rose-500 transition-colors"
                    >
                        Reset filtrů
                    </button>
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="w-full py-3 rounded-xl border border-gray-200 text-gray-400 text-sm hover:border-gray-300 transition-colors"
                    >
                        Zpět
                    </button>
                </div>
                <BottomNav />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-8 px-4 pb-24">

            {/* Header */}
            <div className="w-full max-w-sm flex items-center justify-between mb-4">
                <button onClick={() => navigate("/dashboard")} className="text-gray-400 text-sm">← Zpět</button>
                <p className="text-xs text-gray-400">{activeUser?.name}</p>
                <div className="w-10" />
            </div>

            {/* Filtry */}
            <BrowseFilters onFilter={handleFilter} />

            {/* Match notifikace */}
            {matchInfo && (
                <div className="w-full max-w-sm bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 mb-4 text-center">
                    <p className="text-rose-400 font-medium text-sm">{matchInfo}</p>
                </div>
            )}

            {/* Karta */}
            {profile && (
                <div className="w-full max-w-sm">
                    <TinderCard
                        key={profile.id}
                        onSwipe={onSwipe}
                        preventSwipe={["up", "down"]}
                    >
                        <div className="relative w-full rounded-2xl overflow-hidden border border-gray-100 shadow-sm" style={{ height: "480px" }}>
                            {profile.mainImage || profile.profileImage
                                ? <img src={profile.mainImage || profile.profileImage} className="w-full h-full object-cover" />
                                : <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <span className="text-6xl text-gray-300">👤</span>
                                </div>
                            }
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                                <h2 className="text-white text-xl font-semibold">{profile.name}, {profile.age}</h2>
                                {profile.location?.label && <p className="text-white/70 text-sm">{profile.location.label}</p>}
                                {profile.bio && <p className="text-white/60 text-xs mt-1">{profile.bio}</p>}
                            </div>
                        </div>
                    </TinderCard>

                    {/* Tlačítka */}
                    <div className="flex justify-center gap-6 mt-6">
                        <button
                            onClick={() => swipe(false)}
                            className="w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center text-xl hover:border-gray-300 transition-colors"
                        >
                            ✕
                        </button>
                        <button
                            onClick={() => swipe(true)}
                            className="w-14 h-14 rounded-full border border-rose-200 flex items-center justify-center text-xl hover:border-rose-300 transition-colors"
                        >
                            ♥
                        </button>
                    </div>
                </div>
            )}

            <BottomNav />
        </div>
    );
}