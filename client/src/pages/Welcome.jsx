import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BASE = "http://localhost:8888";

export default function Welcome() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [showSelect, setShowSelect] = useState(false);

    useEffect(() => {
        fetch(`${BASE}/api/users`)
            .then((r) => r.json())
            .then((d) => setUsers(d.itemList));
    }, []);

    const login = async (user) => {
        await fetch(`${BASE}/api/users/active`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: user.id }),
        });
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-xs text-center">

                {/* Logo */}
                <div className="text-5xl mb-3">🔥</div>
                <h1 className="text-2xl font-semibold mb-1">SwipeMatch</h1>
                <p className="text-gray-400 text-sm mb-12">Najdi svůj match.</p>

                {/* Create profile button */}
                <button
                    onClick={() => navigate("/create")}
                    className="w-full py-3.5 rounded-full bg-rose-400 text-white font-medium hover:bg-rose-500 transition-colors mb-4"
                >
                    Vytvořit profil
                </button>

                {/* Login */}
                {!showSelect ? (
                    <button
                        onClick={() => setShowSelect(true)}
                        className="text-sm text-gray-400 hover:text-gray-500 transition-colors"
                    >
                        Už mám profil
                    </button>
                ) : (
                    <div className="mt-2 border border-gray-100 rounded-2xl overflow-hidden">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                onClick={() => login(user)}
                                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0 transition-colors"
                            >
                                {user.profileImage
                                    ? <img src={user.profileImage} className="w-8 h-8 rounded-full object-cover" />
                                    : <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium">{user.name[0]}</div>
                                }
                                <div className="text-left">
                                    <p className="text-sm font-medium text-gray-700">{user.name}</p>
                                    <p className="text-xs text-gray-400">{user.age} let · {user.gender}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}