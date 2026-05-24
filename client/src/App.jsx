import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUpload from "../src/components/ImageUploads.jsx";
import LocationSearch from "../src/components/LocationSearch";


const STEPS = ["Jméno", "Věk", "Pohlaví", "Lokace", "Bio", "Fotky"];

export default function CreateProfile() {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [form, setForm] = useState({
        name: "", age: "", gender: "Male",
        location: "", bio: "", profileImage: "", mainImage: ""
    });

    const update = (field, value) => setForm({ ...form, [field]: value });
    const next = () => setStep(step + 1);
    const back = () => setStep(step - 1);

    const submit = async () => {
        const res = await fetch("http://localhost:8888/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, age: parseInt(form.age) }),
        });
        const data = await res.json();
        navigate("/created", { state: { user: data } });
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-sm">

                {/* Progress dots */}
                <div className="flex gap-1.5 mb-10">
                    {STEPS.map((_, i) => (
                        <div key={i} className={`h-0.5 flex-1 rounded-full transition-all ${i <= step ? "bg-rose-400" : "bg-gray-200"}`} />
                    ))}
                </div>

                {/* Step content */}
                <div className="mb-10">
                    {step === 0 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-1">Jak se jmenuješ?</h2>
                            <p className="text-gray-400 text-sm mb-6">Toto jméno uvidí ostatní.</p>
                            <input
                                autoFocus
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-rose-300 transition-colors"
                                placeholder="Tvoje jméno"
                                value={form.name}
                                onChange={(e) => update("name", e.target.value)}
                            />
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-1">Kolik ti je let?</h2>
                            <p className="text-gray-400 text-sm mb-6">Musíš být starší 18 let.</p>
                            <input
                                autoFocus
                                type="number"
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-rose-300 transition-colors"
                                placeholder="Věk"
                                value={form.age}
                                onChange={(e) => update("age", e.target.value)}
                            />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-1">Jsi muž nebo žena?</h2>
                            <p className="text-gray-400 text-sm mb-6"> </p>
                            <div className="flex gap-3">
                                {["Male", "Female"].map((g) => (
                                    <button
                                        key={g}
                                        onClick={() => update("gender", g)}
                                        className={`flex-1 py-3 rounded-xl border text-sm font-medium transition-all
                      ${form.gender === g
                                            ? "border-rose-300 text-rose-400 bg-rose-50"
                                            : "border-gray-200 text-gray-400 bg-white"}`}
                                    >
                                        {g === "Male" ? "Muž" : "Žena"}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-1">Odkud jsi?</h2>
                            <p className="text-gray-400 text-sm mb-6">Město nebo PSČ.</p>
                            <LocationSearch
                                value={form.location}
                                onChange={(val) => update("location", val)}
                            />
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-1">Něco o sobě</h2>
                            <p className="text-gray-400 text-sm mb-6">Krátký popis pro ostatní.</p>
                            <textarea
                                autoFocus
                                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:border-rose-300 transition-colors resize-none h-28"
                                placeholder="Miluji cestování..."
                                value={form.bio}
                                onChange={(e) => update("bio", e.target.value)}
                            />
                        </>
                    )}

                    {step === 5 && (
                        <>
                            <h2 className="text-2xl font-semibold mb-1">Přidej fotky</h2>
                            <p className="text-gray-400 text-sm mb-6">Nahrај své fotky.</p>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs text-gray-400 mb-2 block">Profilová fotka</label>
                                    <ImageUpload
                                        aspect={1}
                                        label="Nahrát profilovou fotku"
                                        onUpload={(url) => update("profileImage", url)}
                                    />
                                    {form.profileImage && (
                                        <img src={form.profileImage} className="w-16 h-16 rounded-full object-cover mt-2" />
                                    )}
                                </div>
                                <div>
                                    <label className="text-xs text-gray-400 mb-2 block">Hlavní fotka</label>
                                    <ImageUpload
                                        aspect={4/3}
                                        label="Nahrát hlavní fotku"
                                        onUpload={(url) => update("mainImage", url)}
                                    />
                                    {form.mainImage && (
                                        <img src={form.mainImage} className="w-full h-24 rounded-xl object-cover mt-2" />
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    {step > 0 && (
                        <button
                            onClick={back}
                            className="px-6 py-3 rounded-xl border border-gray-200 text-gray-400 text-sm font-medium hover:border-gray-300 transition-colors"
                        >
                            Zpět
                        </button>
                    )}
                    {step < STEPS.length - 1 ? (
                        <button
                            onClick={next}
                            className="flex-1 py-3 rounded-xl bg-rose-400 text-white text-sm font-medium hover:bg-rose-500 transition-colors"
                        >
                            Pokračovat
                        </button>
                    ) : (
                        <button
                            onClick={submit}
                            className="flex-1 py-3 rounded-xl bg-rose-400 text-white text-sm font-medium hover:bg-rose-500 transition-colors"
                        >
                            Vytvořit profil
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}