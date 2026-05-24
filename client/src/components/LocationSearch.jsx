import { useState } from "react";

export default function LocationSearch({ value, onChange }) {
    const [results, setResults] = useState([]);
    const [query, setQuery] = useState(value?.label || "");
    const [timer, setTimer] = useState(null);

    const handleInput = (e) => {
        const q = e.target.value;
        setQuery(q);
        clearTimeout(timer);
        if (q.length < 2) return setResults([]);
        setTimer(setTimeout(async () => {
            const res = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=5`,
                { headers: { "Accept-Language": "cs" } }
            );
            const data = await res.json();
            setResults(data);
        }, 400));
    };

    const select = (item) => {
        const label = item.display_name.split(",").slice(0, 2).join(",").trim();
        setQuery(label);
        setResults([]);
        onChange({ label, lat: parseFloat(item.lat), lon: parseFloat(item.lon) });
    };

    return (
        <div className="relative">
            <input
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-rose-300 transition-colors"
                placeholder="Praha, Brno..."
                value={query}
                onChange={handleInput}
            />
            {results.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-xl shadow-lg mt-1 z-10 overflow-hidden">
                    {results.map((item) => (
                        <div
                            key={item.place_id}
                            onClick={() => select(item)}
                            className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-0"
                        >
                            {item.display_name.split(",").slice(0, 3).join(",")}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}