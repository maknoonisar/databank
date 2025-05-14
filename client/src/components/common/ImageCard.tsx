import React, { useState } from "react";

interface ImageCardProps {
  image: {
    id: number;
    filename: string;
    description: string;
  };
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [showModal, setShowModal] = useState(false);
  const imageUrl = `/api/images/${image.filename}`;

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="cursor-pointer border rounded overflow-hidden shadow-md hover:shadow-2xl transition-transform transform hover:scale-105"
      >
        <img src={imageUrl} alt={image.description} className="w-full h-48 object-cover" />
        <div className="p-4">
          <p className="truncate">{image.description}</p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded w-96 relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <img src={imageUrl} alt={image.description} className="mb-4 w-full h-60 object-cover" />
            <p className="text-gray-700">{image.description}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCard;
