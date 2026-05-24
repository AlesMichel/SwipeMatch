import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";

const BASE = "http://localhost:8888";

export default function Matches() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        fetch(`${BASE}/api/matches`)
            .then((r) => r.json())
            .then((d) => setMatches(d.itemList));
    }, []);

    return (
        <div className="min-h-screen bg-white pb-20">
            <div className="max-w-sm mx-auto px-4 py-8">

                <h1 className="text-xl font-semibold mb-6">Matches</h1>

                {matches.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-4xl mb-3">💔</p>
                        <p className="text-gray-400 text-sm">Zatím žádné matches.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {matches.map((match) => (
                            <div key={match.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100">
                                {match.profileImage
                                    ? <img src={match.profileImage} className="w-12 h-12 rounded-full object-cover" />
                                    : <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-medium text-lg">{match.name[0]}</div>
                                }
                                <div>
                                    <p className="text-sm font-medium text-gray-700">{match.name}</p>
                                    <p className="text-xs text-gray-400">
                                        Match {new Date(match.matched).toLocaleDateString("cs-CZ")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
            <BottomNav />
        </div>
    );
}