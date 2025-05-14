// import { useState, useEffect } from 'react';

// export default function ImageGallery() {
//   const [images, setImages] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [error, setError] = useState(null);
//   const [page, setPage] = useState('gallery'); // 'gallery', 'upload', or 'preview'
//   const [description, setDescription] = useState('');
//   const [previewImage, setPreviewImage] = useState(null);

//   // Function to handle file selection
//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   // Function to handle file upload
//   const handleUpload = () => {
//     if (!selectedFile) {
//       setError("Please select a file first");
//       return;
//     }

//     setIsUploading(true);
//     setError(null);

//     // Create a URL for the image
//     const imageUrl = URL.createObjectURL(selectedFile);
    
//     // Simulate upload process
//     setTimeout(() => {
//       setImages([...images, {
//         id: Date.now(),
//         url: imageUrl,
//         name: selectedFile.name,
//         description: description || 'No description provided'
//       }]);
//       setSelectedFile(null);
//       setDescription('');
//       setIsUploading(false);
      
//       // Clear the file input
//       const fileInput = document.getElementById('file-input');
//       if (fileInput) fileInput.value = "";
      
//       // Navigate back to gallery after upload
//       setPage('gallery');
//     }, 1000);
//   };

//   // Function to refresh gallery (in a real app, this would fetch from server)
//   const handleRefresh = () => {
//     // Simulate refresh delay
//     setIsUploading(true);
//     setTimeout(() => {
//       setIsUploading(false);
//     }, 500);
//   };

//   // Function to delete an image
//   const handleDelete = (id) => {
//     setImages(images.filter(image => image.id !== id));
//     // If currently previewing this image, return to gallery
//     if (previewImage && previewImage.id === id) {
//       setPage('gallery');
//       setPreviewImage(null);
//     }
//   };

//   // Function to preview an image
//   const handlePreview = (image) => {
//     setPreviewImage(image);
//     setPage('preview');
//   };

//   // Navigation function
//   const navigateTo = (targetPage) => {
//     if (targetPage === 'gallery') {
//       setPreviewImage(null);
//     }
//     setPage(targetPage);
//   };

//   // Header Component
//   const Header = () => (
//     <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 pb-4 border-b">
//       <h1 className="text-2xl font-bold">Image Gallery</h1>
//       <nav className="flex gap-2">
//         <button 
//           onClick={() => navigateTo('gallery')}
//           className={`px-4 py-2 rounded-md transition-colors ${
//             page === 'gallery' 
//               ? 'bg-blue-600 text-white' 
//               : 'bg-gray-100 hover:bg-gray-200'
//           }`}
//         >
//           View Gallery
//         </button>
//         <button 
//           onClick={() => navigateTo('upload')}
//           className={`px-4 py-2 rounded-md transition-colors ${
//             page === 'upload' 
//               ? 'bg-blue-600 text-white' 
//               : 'bg-gray-100 hover:bg-gray-200'
//           }`}
//         >
//           Upload Images
//         </button>
//       </nav>
//     </header>
//   );

//   // Gallery Page Component
//   const GalleryPage = () => (
//     <div className="p-6 border border-gray-200 rounded-lg">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Image Library</h2>
//         <button 
//           onClick={handleRefresh}
//           className="flex items-center gap-2 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
//           disabled={isUploading}
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//             <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
//           </svg>
//           Refresh
//         </button>
//       </div>
      
//       {images.length === 0 ? (
//         <div className="text-center py-12 text-gray-500">
//           No images available. Use the "Upload Images" button to add new images.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {images.map((image) => (
//             <div key={image.id} className="relative group border border-gray-200 rounded-lg overflow-hidden">
//               <div className="cursor-pointer" onClick={() => handlePreview(image)}>
//                 <img 
//                   src={image.url} 
//                   alt={image.name}
//                   className="w-full h-48 object-cover"
//                 />
//               </div>
//               <div className="absolute top-2 right-2 flex gap-2">
//                 <button
//                   onClick={() => handleDelete(image.id)}
//                   className="p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//                   </svg>
//                 </button>
//                 <button
//                   onClick={() => handlePreview(image)}
//                   className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                     <circle cx="11" cy="11" r="8" />
//                     <line x1="21" y1="21" x2="16.65" y2="16.65" />
//                     <line x1="11" y1="8" x2="11" y2="14" />
//                     <line x1="8" y1="11" x2="14" y2="11" />
//                   </svg>
//                 </button>
//               </div>
//               <div className="p-3 bg-white">
//                 <p className="font-medium truncate" title={image.name}>{image.name}</p>
//                 <p className="text-sm text-gray-600 truncate" title={image.description}>{image.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );

//   // Upload Page Component
//   const UploadPage = () => (
//     <div className="p-6 border border-gray-200 rounded-lg">
//       <h2 className="text-lg font-semibold mb-4">Upload New Image</h2>
//       <div className="flex flex-col gap-4">
//         <div className="p-8 border-2 border-dashed border-gray-300 rounded-lg text-center">
//           <input
//             id="file-input"
//             type="file"
//             onChange={handleFileChange}
//             accept="image/*"
//             className="hidden"
//             disabled={isUploading}
//           />
//           <label 
//             htmlFor="file-input" 
//             className="cursor-pointer flex flex-col items-center justify-center gap-2"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
//               <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
//               <polyline points="17 8 12 3 7 8"></polyline>
//               <line x1="12" y1="3" x2="12" y2="15"></line>
//             </svg>
//             <div className="text-gray-600">
//               {selectedFile ? selectedFile.name : 'Click to select an image or drag and drop here'}
//             </div>
//           </label>
//         </div>
        
//         {selectedFile && (
//           <div className="mt-2">
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Image Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder="Enter a description for this image..."
//               className="w-full p-2 border border-gray-300 rounded-md min-h-24"
//               disabled={isUploading}
//             />
//           </div>
//         )}
        
//         {error && <p className="text-red-500 text-center">{error}</p>}
        
//         <div className="flex justify-center gap-4 mt-2">
//           <button
//             onClick={() => {
//               setSelectedFile(null);
//               setDescription('');
//               const fileInput = document.getElementById('file-input');
//               if (fileInput) fileInput.value = "";
//             }}
//             className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors disabled:bg-gray-400"
//             disabled={isUploading || !selectedFile}
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleUpload}
//             className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400"
//             disabled={isUploading || !selectedFile}
//           >
//             {isUploading ? 'Uploading...' : 'Upload Image'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Preview Page Component
//   const PreviewPage = () => {
//     if (!previewImage) return null;
    
//     return (
//       <div className="p-6 border border-gray-200 rounded-lg">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-semibold">{previewImage.name}</h2>
//           <div className="flex gap-2">
//             <button
//               onClick={() => handleDelete(previewImage.id)}
//               className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
//               </svg>
//               Delete
//             </button>
//             <button
//               onClick={() => navigateTo('gallery')}
//               className="flex items-center gap-1 px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//                 <line x1="19" y1="12" x2="5" y2="12"></line>
//                 <polyline points="12 19 5 12 12 5"></polyline>
//               </svg>
//               Back to Gallery
//             </button>
//           </div>
//         </div>
        
//         <div className="flex flex-col gap-4">
//           <div className="bg-gray-100 p-2 rounded-lg flex justify-center">
//             <img 
//               src={previewImage.url} 
//               alt={previewImage.name}
//               className="max-w-full max-h-96 object-contain"
//             />
//           </div>
          
//           <div className="bg-white p-4 border border-gray-200 rounded-lg">
//             <h3 className="text-md font-medium mb-2">Description</h3>
//             <p className="text-gray-700">{previewImage.description}</p>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-6">
//       <Header />
//       {page === 'gallery' && <GalleryPage />}
//       {page === 'upload' && <UploadPage />}
//       {page === 'preview' && <PreviewPage />}
//     </div>
//   );
// }




import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function ImageGallery() {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState('gallery'); // 'gallery', 'upload', or 'preview'
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  // Function to handle file selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Function to handle file upload
  const handleUpload = () => {
    if (!selectedFile) {
      setError("Please select a file first");
      return;
    }

    setIsUploading(true);
    setError(null);

    // Create a URL for the image
    const imageUrl = URL.createObjectURL(selectedFile);
    
    // Simulate upload process
    setTimeout(() => {
      setImages([...images, {
        id: Date.now(),
        url: imageUrl,
        name: selectedFile.name,
        description: description || 'No description provided'
      }]);
      setSelectedFile(null);
      setDescription('');
      setIsUploading(false);
      
      // Clear the file input
      const fileInput = document.getElementById('file-input');
      if (fileInput) fileInput.value = "";
      
      // Navigate back to gallery after upload
      setPage('gallery');
    }, 1000);
  };

  // Function to refresh gallery (in a real app, this would fetch from server)
  const handleRefresh = () => {
    // Simulate refresh delay
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
    }, 500);
  };

  // Function to delete an image
  const handleDelete = (id) => {
    setImages(images.filter(image => image.id !== id));
    // If currently previewing this image, return to gallery
    if (previewImage && previewImage.id === id) {
      setPage('gallery');
      setPreviewImage(null);
    }
  };

  // Function to preview an image
  const handlePreview = (image) => {
    setPreviewImage(image);
    setPage('preview');
  };

  // Navigation function
  const navigateTo = (targetPage) => {
    if (targetPage === 'gallery') {
      setPreviewImage(null);
    }
    setPage(targetPage);
  };

  // Header Component
  const Header = () => (
    <header className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white p-6 rounded-xl shadow-lg mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight flex items-center">
          <span className="mr-2"></span>Gallery <span className="ml-2"></span>
        </h1>
        <nav className="flex gap-3">
          <button 
            onClick={() => navigateTo('gallery')}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-md ${
              page === 'gallery' 
                ? 'bg-white text-purple-600 ring-4 ring-purple-300' 
                : 'bg-purple-700 hover:bg-purple-800 text-white'
            }`}
          >
            View Gallery
          </button>
          <button 
            onClick={() => navigateTo('upload')}
            className={`px-5 py-2 rounded-full font-medium transition-all duration-300 shadow-md ${
              page === 'upload' 
                ? 'bg-white text-pink-600 ring-4 ring-pink-300' 
                : 'bg-pink-600 hover:bg-pink-700 text-white'
            }`}
          >
            Upload Images
          </button>
        </nav>
      </div>
    </header>
  );

  // Gallery Page Component
  const GalleryPage = () => (
    <div className="bg-gradient-to-b from-indigo-50 to-purple-100 p-8 rounded-xl shadow-lg border-2 border-purple-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-purple-800 flex items-center">
          <span className="text-2xl mr-2">📁</span> Image Collection
        </h2>
        <button 
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md text-sm font-medium"
          disabled={isUploading}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3" />
          </svg>
          Refresh
        </button>
      </div>
      
      {images.length === 0 ? (
        <div className="text-center py-16 text-indigo-400 bg-white bg-opacity-60 rounded-lg border-2 border-dashed border-indigo-200">
          <div className="text-6xl mb-4">🖼️</div>
          <p className="text-xl font-medium">No images available yet!</p>
          <p className="text-indigo-500 mt-2">Use the "Upload Images" button to add colorful memories.</p>
          <button 
            onClick={() => navigateTo('upload')}
            className="mt-6 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md font-medium"
          >
            Start Uploading
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div 
              key={image.id} 
              className="relative group bg-white rounded-xl overflow-hidden shadow-lg border-2 border-purple-200 hover:border-pink-400 transition-all duration-300 hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="cursor-pointer" onClick={() => handlePreview(image)}>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
                </div>
              </div>
              
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(image.id);
                  }}
                  className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePreview(image);
                  }}
                  className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </button>
              </div>
              
              <div className="p-4">
                <p className="font-bold text-gray-800 truncate" title={image.name}>{image.name}</p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2" title={image.description}>{image.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );

  // Upload Page Component
  const UploadPage = () => (
    <div className="bg-gradient-to-b from-pink-50 to-purple-100 p-8 rounded-xl shadow-lg border-2 border-pink-200">
      <h2 className="text-xl font-bold text-pink-700 flex items-center mb-6">
        <span className="text-2xl mr-2">📤</span> Upload New Image
      </h2>
      
      <div className="flex flex-col gap-6">
        <div className="group p-10 border-3 border-dashed border-pink-300 rounded-xl text-center bg-white bg-opacity-60 transition-all duration-300 hover:border-purple-400 hover:bg-opacity-80">
          <input
            id="file-input"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
            disabled={isUploading}
          />
          <label 
            htmlFor="file-input" 
            className="cursor-pointer flex flex-col items-center justify-center gap-4"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white p-5 group-hover:scale-110 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>
            <div>
              <p className="text-lg font-medium text-purple-700">
                {selectedFile ? selectedFile.name : 'Drop your image here'}
              </p>
              <p className="text-pink-500 mt-1">
                {selectedFile ? 'File selected!' : 'or click to browse files'}
              </p>
            </div>
          </label>
        </div>
        
        {selectedFile && (
          <div className="mt-2 bg-white p-6 rounded-xl shadow-md border-2 border-purple-200">
            <label className="block text-lg font-medium text-purple-700 mb-3">
              Image Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter a beautiful description for this image..."
              className="w-full p-4 border-2 border-pink-200 rounded-lg min-h-32 focus:border-purple-400 focus:ring focus:ring-purple-200 focus:ring-opacity-50 transition-all duration-300"
              disabled={isUploading}
            />
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <p className="font-medium">{error}</p>
          </div>
        )}
        
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={() => {
              setSelectedFile(null);
              setDescription('');
              const fileInput = document.getElementById('file-input');
              if (fileInput) fileInput.value = "";
            }}
            className="px-8 py-3 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-all duration-300 shadow-md disabled:bg-gray-300 font-medium"
            disabled={isUploading || !selectedFile}
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            className={`px-8 py-3 rounded-full text-white font-medium shadow-md transition-all duration-300 disabled:bg-gray-300
              ${isUploading 
                ? 'bg-purple-400' 
                : 'bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600'
              }`}
            disabled={isUploading || !selectedFile}
          >
            {isUploading ? 'Uploading...' : 'Upload Image'}
          </button>
        </div>
      </div>
    </div>
  );

  // Preview Page Component
  const PreviewPage = () => {
    if (!previewImage) return null;
    
    return (
      <motion.div 
        className="bg-gradient-to-b from-blue-50 to-indigo-100 p-8 rounded-xl shadow-lg border-2 border-blue-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-blue-800 flex items-center">
            <span className="text-2xl mr-2">🔍</span> {previewImage.name}
          </h2>
          <div className="flex gap-3">
            <button
              onClick={() => handleDelete(previewImage.id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all duration-300 shadow-md text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              Delete
            </button>
            <button
              onClick={() => navigateTo('gallery')}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all duration-300 shadow-md text-sm font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
              Back to Gallery
            </button>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="bg-white p-4 rounded-xl flex justify-center border-2 border-indigo-200 shadow-md">
            <img 
              src={previewImage.url} 
              alt={previewImage.name}
              className="max-w-full max-h-96 object-contain rounded-lg"
            />
          </div>
          
          <div className="bg-white p-6 border-2 border-blue-200 rounded-xl shadow-md">
            <h3 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
              <span className="text-xl mr-2">📝</span> Description
            </h3>
            <p className="text-gray-700 bg-blue-50 p-4 rounded-lg">{previewImage.description}</p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-8xl mx-auto p-6">
      <Header />
      {page === 'gallery' && <GalleryPage />}
      {page === 'upload' && <UploadPage />}
      {page === 'preview' && <PreviewPage />}
    </div>
  );
}