import { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const BASE = "http://localhost:8888";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
        mediaWidth,
        mediaHeight
    );
}

export default function ImageUpload({ onUpload, aspect = 1, label = "Nahrát fotku" }) {
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const [showModal, setShowModal] = useState(false);
    const imgRef = useRef(null);

    const onSelectFile = (e) => {
        if (e.target.files?.length) {
            const reader = new FileReader();
            reader.onload = () => {
                setImgSrc(reader.result);
                setShowModal(true);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        setCrop(centerAspectCrop(width, height, aspect));
    };

    const getCroppedBlob = () => {
        return new Promise((resolve) => {
            const image = imgRef.current;
            const canvas = document.createElement("canvas");
            const scaleX = image.naturalWidth / image.width;
            const scaleY = image.naturalHeight / image.height;

            canvas.width = completedCrop.width * scaleX;
            canvas.height = completedCrop.height * scaleY;

            const ctx = canvas.getContext("2d");
            ctx.drawImage(
                image,
                completedCrop.x * scaleX,
                completedCrop.y * scaleY,
                completedCrop.width * scaleX,
                completedCrop.height * scaleY,
                0, 0,
                canvas.width,
                canvas.height
            );

            canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
        });
    };

    const handleConfirm = async () => {
        const blob = await getCroppedBlob();
        const formData = new FormData();
        formData.append("image", blob, "crop.jpg");

        const res = await fetch(`${BASE}/api/users/upload`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();

        onUpload(data.url);
        setShowModal(false);
        setImgSrc("");
    };

    return (
        <>
            {/* Upload tlačítko */}
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-rose-300 transition-colors">
                <span className="text-2xl mb-1">📷</span>
                <span className="text-xs text-gray-400">{label}</span>
                <input type="file" accept="image/*" className="hidden" onChange={onSelectFile} />
            </label>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
                    <div className="bg-white rounded-2xl p-5 w-full max-w-sm">
                        <h3 className="text-sm font-semibold mb-4">Ořezat fotku</h3>

                        <ReactCrop
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspect}
                            circularCrop={aspect === 1}
                        >
                            <img
                                ref={imgRef}
                                src={imgSrc}
                                onLoad={onImageLoad}
                                className="max-h-64 w-full object-contain"
                            />
                        </ReactCrop>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-400 text-sm"
                            >
                                Zrušit
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="flex-1 py-2.5 rounded-xl bg-rose-400 text-white text-sm font-medium"
                            >
                                Potvrdit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}