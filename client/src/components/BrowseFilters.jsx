import { useState } from "react";

export default function BrowseFilters({ onFilter }) {
    const [open, setOpen] = useState(false);
    const [ageMin, setAgeMin] = useState(18);
    const [ageMax, setAgeMax] = useState(99);
    const [gender, setGender] = useState("");
    const [distance, setDistance] = useState(50);
    const [likeBack, setLikeBack] = useState(false);

    const apply = () => {
        onFilter({ ageMin, ageMax, gender, distance, likeBack });
        setOpen(false);
    };

    const reset = () => {
        setAgeMin(18);
        setAgeMax(99);
        setGender("");
        setDistance(50);
        setLikeBack(false);
        onFilter({});
        setOpen(false);
    };

    return (
        <div className="w-full max-w-sm mx-auto mb-4">

            {/* Toggle tlačítko */}
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
                <span>⚙️</span>
                <span>Filtry</span>
                <span className="ml-1">{open ? "▲" : "▼"}</span>
            </button>

            {/* Panel */}
            {open && (
                <div className="mt-3 border border-gray-100 rounded-2xl p-5 space-y-5">

                    {/* Věk */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-xs text-gray-500 font-medium">Věk</span>
                            <span className="text-xs text-gray-400">{ageMin} – {ageMax} let</span>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-400 w-6">od</span>
                                <input
                                    type="range" min={18} max={99}
                                    value={ageMin}
                                    onChange={(e) => setAgeMin(parseInt(e.target.value))}
                                    className="flex-1 accent-rose-400"
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-xs text-gray-400 w-6">do</span>
                                <input
                                    type="range" min={18} max={99}
                                    value={ageMax}
                                    onChange={(e) => setAgeMax(parseInt(e.target.value))}
                                    className="flex-1 accent-rose-400"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vzdálenost */}
                    <div>
                        <div className="flex justify-between mb-2">
                            <span className="text-xs text-gray-500 font-medium">Vzdálenost</span>
                            <span className="text-xs text-gray-400">{distance} km</span>
                        </div>
                        <input
                            type="range" min={5} max={300} step={5}
                            value={distance}
                            onChange={(e) => setDistance(parseInt(e.target.value))}
                            className="w-full accent-rose-400"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <span className="text-xs text-gray-500 font-medium block mb-2">Pohlaví</span>
                        <div className="flex gap-2">
                            {[
                                { value: "", label: "Vše" },
                                { value: "Male", label: "Muž" },
                                { value: "Female", label: "Žena" },
                            ].map((g) => (
                                <button
                                    key={g.value}
                                    onClick={() => setGender(g.value)}
                                    className={`flex-1 py-2 rounded-xl border text-xs font-medium transition-all
                    ${gender === g.value
                                        ? "border-rose-300 text-rose-400 bg-rose-50"
                                        : "border-gray-200 text-gray-400"}`}
                                >
                                    {g.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Like back */}
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 font-medium">Pouze ti, kdo mě liknuli</span>
                        <button
                            onClick={() => setLikeBack(!likeBack)}
                            className={`w-10 h-6 rounded-full transition-colors relative ${likeBack ? "bg-rose-400" : "bg-gray-200"}`}
                        >
                            <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${likeBack ? "left-5" : "left-1"}`} />
                        </button>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-1">
                        <button
                            onClick={reset}
                            className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-400 text-xs font-medium"
                        >
                            Reset
                        </button>
                        <button
                            onClick={apply}
                            className="flex-1 py-2.5 rounded-xl bg-rose-400 text-white text-xs font-medium"
                        >
                            Použít
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}