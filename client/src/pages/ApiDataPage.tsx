









// // src/pages/ApiDataPage.tsx

// import React, { useState, useEffect } from 'react';
// import {
//   AlertCircle,
//   CloudLightning,
//   Droplets,
//   Activity,
//   Wind,
//   Thermometer,
//   Info,
//   Calendar,
//   MapPin,
//   Users,
//   Shield,
// } from 'lucide-react';

// // Define types for our data
// type ApiResponse = {
//   success?: boolean;
//   data?: any;
//   message?: string;
//   fallbackData?: any;
// };

// // Animated background component
// const AnimatedBackground = () => {
//   return (
//     <div className="fixed inset-0 -z-10 overflow-hidden">
//       <div className="absolute -inset-10 opacity-30">
//         {[...Array(5)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 animate-blob"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//               width: `${Math.random() * 400 + 100}px`,
//               height: `${Math.random() * 400 + 100}px`,
//               animationDelay: `${i * 2}s`,
//               filter: 'blur(50px)',
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Card component for displaying items
// const DataCard = ({ item, endpointType }: { item: any; endpointType: string }) => {
//   const [expanded, setExpanded] = useState(false);

//   // Define color schemes and icons based on endpoint type
//   const cardConfig: { [key: string]: any } = {
//     alerts: {
//       bgGradient: 'from-blue-50 to-blue-100',
//       borderColor: 'border-blue-200',
//       iconBg: 'bg-blue-500',
//       icon: <AlertCircle size={20} className="text-white" />,
//     },
//     'new-api1': {
//       bgGradient: 'from-rose-50 to-pink-100',
//       borderColor: 'border-pink-200',
//       iconBg: 'bg-pink-500',
//       icon: <Activity size={20} className="text-white" />,
//     },
//     'new-api2': {
//       bgGradient: 'from-indigo-50 to-indigo-100',
//       borderColor: 'border-indigo-200',
//       iconBg: 'bg-indigo-500',
//       icon: <Thermometer size={20} className="text-white" />,
//     },
//     'new-api3': {
//       bgGradient: 'from-teal-50 to-teal-100',
//       borderColor: 'border-teal-200',
//       iconBg: 'bg-teal-500',
//       icon: <Wind size={20} className="text-white" />,
//     },
//     'new-api4': {
//       bgGradient: 'from-lime-50 to-green-100',
//       borderColor: 'border-green-200',
//       iconBg: 'bg-green-500',
//       icon: <Droplets size={20} className="text-white" />,
//     },
//     'new-api5': {
//       bgGradient: 'from-purple-50 to-fuchsia-100',
//       borderColor: 'border-fuchsia-200',
//       iconBg: 'bg-fuchsia-500',
//       icon: <CloudLightning size={20} className="text-white" />,
//     },
//   };

//   const config = cardConfig[endpointType] || cardConfig['alerts'];

//   // Function to get primary display fields based on endpoint type
//   const getPrimaryFields = () => {
//     switch (endpointType) {
//       case 'alerts':
//         return [
//           { icon: <Info size={16} />, label: 'Type', value: item.type || 'Unknown Type' },
//           { icon: <Calendar size={16} />, label: 'Date', value: item.date || new Date().toLocaleDateString() },
//           { icon: <MapPin size={16} />, label: 'Location', value: item.location || 'Global' },
//         ];
//       case 'new-api1': // Earthquake
//         return [
//           { icon: <Activity size={16} />, label: 'Magnitude', value: item.magnitude || 'N/A' },
//           { icon: <MapPin size={16} />, label: 'Location', value: item.location || 'Unknown' },
//           { icon: <Calendar size={16} />, label: 'Time', value: item.time || 'Recent' },
//         ];
//       case 'new-api2': // Weather
//         return [
//           { icon: <Thermometer size={16} />, label: 'Temperature', value: item.temperature || 'N/A' },
//           { icon: <Wind size={16} />, label: 'Wind', value: item.windSpeed || 'N/A' },
//           { icon: <MapPin size={16} />, label: 'Location', value: item.location || 'N/A' },
//         ];
//       case 'new-api3': // Smog
//         return [
//           { icon: <Wind size={16} />, label: 'AQI', value: item.aqi || 'N/A' },
//           { icon: <MapPin size={16} />, label: 'Location', value: item.location || 'N/A' },
//           { icon: <Shield size={16} />, label: 'Status', value: item.status || 'Unknown' },
//         ];
//       case 'new-api4': // Flood
//         return [
//           { icon: <Droplets size={16} />, label: 'Level', value: item.level || 'N/A' },
//           { icon: <MapPin size={16} />, label: 'River/Area', value: item.area || 'N/A' },
//           { icon: <Users size={16} />, label: 'Affected', value: item.affected || 'Unknown' },
//         ];
//       case 'new-api5': // Cyclone
//         return [
//           { icon: <CloudLightning size={16} />, label: 'Category', value: item.category || 'N/A' },
//           { icon: <Wind size={16} />, label: 'Wind Speed', value: item.windSpeed || 'N/A' },
//           { icon: <MapPin size={16} />, label: 'Path', value: item.path || 'Unknown' },
//         ];
//       default:
//         return [
//           { icon: <Info size={16} />, label: 'Info', value: Object.values(item)[0] || 'N/A' },
//           { icon: <Calendar size={16} />, label: 'Date', value: item.date || new Date().toLocaleDateString() },
//         ];
//     }
//   };

//   const getCardTitle = () => {
//     if (item.title) return item.title;
//     if (item.name) return item.name;
//     if (item.id) return `ID: ${item.id}`;
//     if (endpointType === 'alerts') return 'Alert';
//     if (endpointType === 'new-api1') return 'Earthquake Event';
//     if (endpointType === 'new-api2') return 'Weather Report';
//     if (endpointType === 'new-api3') return 'Smog Warning';
//     if (endpointType === 'new-api4') return 'Flood Update';
//     if (endpointType === 'new-api5') return 'Cyclone Alert';
//     return 'Data Item';
//   };

//   const primaryFields = getPrimaryFields();

//   return (
//     <div className={`bg-gradient-to-br ${config.bgGradient} border ${config.borderColor} rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg`}>
//       <div className="p-4">
//         <div className="flex items-center mb-3">
//           <div className={`${config.iconBg} p-2 rounded-md mr-3`}>{config.icon}</div>
//           <h3 className="font-semibold text-gray-800 truncate">{getCardTitle()}</h3>
//         </div>

//         <div className="grid grid-cols-1 gap-2 mb-3">
//           {primaryFields.map((field, idx) => (
//             <div key={idx} className="flex items-center text-sm">
//               <span className="mr-2 text-gray-500">{field.icon}</span>
//               <span className="font-medium text-gray-700">{field.label}:</span>
//               <span className="ml-2 text-gray-800">{field.value}</span>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={() => setExpanded(!expanded)}
//           className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors focus:outline-none flex items-center"
//         >
//           {expanded ? 'Show Less' : 'Show Details'}
//           <svg className={`ml-1 w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
//           </svg>
//         </button>

//         {expanded && (
//           <div className="mt-3 pt-3 border-t border-gray-200 animate-fadeIn">
//             <div className="text-xs font-mono bg-white bg-opacity-50 p-2 rounded max-h-40 overflow-y-auto">
//               {Object.entries(item).map(([key, value]) => (
//                 <div key={key} className="mb-1">
//                   <span className="font-medium text-gray-700">{key}:</span>{' '}
//                   <span className="text-gray-800">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Cards grid display component
// const CardsDisplay = ({ data, endpoint }: { data: any; endpoint: string }) => {
//   // Improved processData function to handle different shapes of data
//   const processData = () => {
//     if (Array.isArray(data)) {
//       return data; // If it's already an array, just return it
//     } else if (data && typeof data === 'object') {
//       if (endpoint === 'alerts') {
//         const result: any[] = [];
//         const extractItems = (obj: any, prefix = '') => {
//           if (typeof obj !== 'object' || obj === null) return;
//           const isAlertItem = obj.type || obj.date || obj.location || obj.title || obj.name || obj.id;
//           if (isAlertItem) {
//             result.push({ ...obj, id: obj.id || prefix });
//             return;
//           }
//           Object.entries(obj).forEach(([key, value]) => {
//             if (typeof value === 'object' && value !== null) {
//               const isNestedAlert = value.type || value.date || value.location || value.title || value.name;
//               if (isNestedAlert) {
//                 result.push({ ...value, id: value.id || key });
//               } else {
//                 extractItems(value, prefix ? `${prefix}.${key}` : key);
//               }
//             }
//           });
//         };
//         extractItems(data);
//         if (result.length > 0) return result;
//         return Object.entries(data).map(([key, value]) => (typeof value === 'object' && value !== null ? { ...value, id: key } : { id: key, value }));
//       }
//       return [data];
//     }
//     return [];
//   };

//   const processedData = processData();

//   if (!processedData || processedData.length === 0) {
//     return (
//       <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow text-center">
//         <Info size={24} className="mx-auto mb-2 text-gray-400" />
//         <p className="text-gray-600">No data items available to display as cards.</p>
//         {data && typeof data === 'object' && !Array.isArray(data) && (
//           <p className="mt-3 text-sm text-gray-500">Note: Received object data that could not be displayed as cards.</p>
//         )}
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
//       {processedData.slice(0, 12).map((item, index) => (
//         <DataCard key={index} item={item} endpointType={endpoint} />
//       ))}
//       {processedData.length > 12 && (
//         <div className="col-span-full text-center py-4">
//           <p className="text-gray-600">
//             Showing 12 of {processedData.length} items. See raw data for complete list.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// // Raw data display component
// const RawDataDisplay = ({ data }: { data: any }) => {
//   if (!data) return null;
//   return (
//     <div className="mt-6 bg-white bg-opacity-90 rounded-lg p-4 border border-indigo-100 shadow-lg transition-all duration-500 animate-fadeIn">
//       <details>
//         <summary className="text-indigo-700 font-medium cursor-pointer focus:outline-none">View Raw JSON Data</summary>
//         <pre className="whitespace-pre-wrap overflow-auto max-h-96 font-mono text-sm text-gray-800 mt-3">
//           {JSON.stringify(data, null, 2)}
//         </pre>
//       </details>
//     </div>
//   );
// };

// // Button component with icon
// const ApiButton = ({
//   onClick,
//   color,
//   icon,
//   label,
// }: {
//   onClick: () => void;
//   color: string;
//   icon: React.ReactNode;
//   label: string;
// }) => {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-4 py-2 ${color} text-white rounded-md hover:shadow-lg focus:ring-2 focus:outline-none transition-all duration-300 transform hover:scale-105 flex items-center space-x-2`}
//     >
//       {icon}
//       <span>{label}</span>
//     </button>
//   );
// };

// const ApiDataPage = () => {
//   const [data, setData] = useState<any>(null);
//   const [endpoint, setEndpoint] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
//   const [showData, setShowData] = useState<boolean>(false);
//   const [viewMode, setViewMode] = useState<'cards' | 'raw'>('cards');

//   useEffect(() => {
//     // Animate data appearance when data changes.
//     if (data) {
//       setShowData(false);
//       const timer = setTimeout(() => setShowData(true), 100);
//       return () => clearTimeout(timer);
//     }
//   }, [data]);

//   // Function to fetch data from the specified endpoint with error handling.
//   const handleFetchData = async (selectedEndpoint: string) => {
//     setLoading(true);
//     setError(null);
//     setData(null);
//     setEndpoint(selectedEndpoint);

//     try {
//       // Append a timestamp to avoid cache issues.
//       const timestamp = new Date().getTime();
//       const apiUrl = `/api/${selectedEndpoint}?_t=${timestamp}`;
//       console.log('Fetching from:', apiUrl);

//       const response = await fetch(apiUrl, {
//         headers: {
//           Accept: 'application/json',
//           'Cache-Control': 'no-cache',
//         },
//       });

//       // Check if response is OK
//       if (!response.ok) {
//         const text = await response.text();
//         console.error(`HTTP Error ${response.status}:`, text);
//         throw new Error(`Request failed: ${response.status} ${response.statusText}`);
//       }

//       // Inspect content-type header to ensure JSON was returned
//       const contentType = response.headers.get('content-type');
//       if (!contentType || !contentType.includes('application/json')) {
//         const text = await response.text();
//         console.error('Unexpected response (not JSON):', text.slice(0, 300));
//         throw new Error('Response is not JSON');
//       }

//       // Parse the JSON response
//       const responseData: ApiResponse = await response.json();

//       // Handle errors returned from API
//       if (responseData.success === false) {
//         if (responseData.fallbackData) {
//           setData(responseData.fallbackData);
//           setError(`Warning: Using fallback data. ${responseData.message}`);
//           setLoading(false);
//           return;
//         }
//         throw new Error(responseData.message || 'Unknown error from server');
//       }

//       // Set the data from the response
//       if (responseData.data !== undefined) {
//         setData(responseData.data);
//       } else {
//         // If no explicit data field, check for direct content
//         const hasContent =
//           Object.keys(responseData).length > 0 &&
//           !('success' in responseData) &&
//           !('message' in responseData);
//         if (hasContent) {
//           setData(responseData);
//         } else {
//           throw new Error('No data received from server');
//         }
//       }
//     } catch (err: any) {
//       console.error('API Error:', err);
//       setError('Error: ' + (err.message || 'Unknown error occurred'));

//       // Attempt a fallback fetch for the 'alerts' endpoint if available.
//       if (selectedEndpoint === 'alerts') {
//         await handleFallbackFetch();
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fallback fetch function in case the primary API call fails.
//   const handleFallbackFetch = async () => {
//     try {
//       const timestamp = new Date().getTime();
//       const fallbackUrl = `/api/fetch-and-save?_t=${timestamp}`;
//       console.log('Fallback fetch from:', fallbackUrl);
//       const response = await fetch(fallbackUrl, {
//         headers: {
//           Accept: 'application/json',
//           'Cache-Control': 'no-cache',
//         },
//       });
//       const responseData = await response.json();
//       if (responseData.success && responseData.data) {
//         setData(responseData.data);
//         setError('Retrieved data using alternate method');
//       }
//     } catch (fallbackErr) {
//       console.error('Fallback API also failed:', fallbackErr);
//     }
//   };

//   const getEndpointTitle = () => {
//     switch (endpoint) {
//       case 'alerts':
//         return 'Alerts Data';
//       case 'new-api1':
//         return 'Earthquake Data';
//       case 'new-api2':
//         return 'Weather Data';
//       case 'new-api3':
//         return 'Smog Data';
//       case 'new-api4':
//         return 'Flood Data';
//       case 'new-api5':
//         return 'Cyclone Data';
//       default:
//         return 'API Data';
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-8 pb-16">
//       <AnimatedBackground />

//       <div className="max-w-7xl mx-auto p-6 relative z-10">
//         <div className="text-center mb-10 animate-fadeIn">
//           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
//             API Data Explorer
//           </h1>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             A colorful interface to visualize different types of disaster and weather data from our API endpoints.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
//           <ApiButton
//             onClick={() => handleFetchData('alerts')}
//             color="bg-gradient-to-r from-blue-500 to-blue-700"
//             icon={<AlertCircle size={20} />}
//             label="Fetch Alerts Data"
//           />

//           <ApiButton
//             onClick={() => handleFetchData('new-api1')}
//             color="bg-gradient-to-r from-rose-500 to-pink-700"
//             icon={<Activity size={20} />}
//             label="Fetch Earthquake Data"
//           />

//           <ApiButton
//             onClick={() => handleFetchData('new-api2')}
//             color="bg-gradient-to-r from-indigo-500 to-indigo-700"
//             icon={<Thermometer size={20} />}
//             label="Fetch Weather Data"
//           />

//           <ApiButton
//             onClick={() => handleFetchData('new-api3')}
//             color="bg-gradient-to-r from-teal-500 to-teal-700"
//             icon={<Wind size={20} />}
//             label="Fetch Smog Data"
//           />

//           <ApiButton
//             onClick={() => handleFetchData('new-api4')}
//             color="bg-gradient-to-r from-lime-500 to-green-700"
//             icon={<Droplets size={20} />}
//             label="Fetch Flood Data"
//           />

//           <ApiButton
//             onClick={() => handleFetchData('new-api5')}
//             color="bg-gradient-to-r from-purple-500 to-fuchsia-700"
//             icon={<CloudLightning size={20} />}
//             label="Fetch Cyclone Data"
//           />
//         </div>

//         <div className="mt-8 transition-all duration-500">
//           {loading ? (
//             <div className="flex flex-col items-center justify-center p-10 bg-white bg-opacity-70 rounded-lg shadow-lg">
//               <div className="relative w-20 h-20">
//                 <div className="absolute top-0 mt-4 w-16 h-16 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin"></div>
//                 <div className="absolute top-2 mt-4 w-12 h-12 rounded-full border-4 border-t-transparent border-r-pink-500 border-b-transparent border-l-indigo-500 animate-spin"></div>
//               </div>
//               <p className="mt-4 text-lg font-medium text-indigo-800">Loading data...</p>
//             </div>
//           ) : error ? (
//             <div
//               className={`p-6 rounded-lg shadow-lg transition-all duration-300 animate-fadeIn ${
//                 data ? 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800' : 'bg-red-50 border-l-4 border-red-400 text-red-800'
//               }`}
//             >
//               <div className="flex items-center">
//                 <AlertCircle className={`mr-3 ${data ? 'text-yellow-500' : 'text-red-500'}`} />
//                 <p className="font-medium">{error}</p>
//               </div>
//             </div>
//           ) : null}

//           {data && showData && (
//             <div className="animate-slideUp">
//               <div className="flex items-center justify-between mb-2 mt-6">
//                 <div className="flex items-center">
//                   <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
//                     {getEndpointTitle()}
//                   </h2>
//                   <span className="ml-3 text-xs px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full font-medium">
//                     {endpoint}
//                   </span>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => setViewMode('cards')}
//                     className={`px-3 py-1 text-sm rounded transition-colors ${viewMode === 'cards' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
//                   >
//                     Cards View
//                   </button>
//                   <button
//                     onClick={() => setViewMode('raw')}
//                     className={`px-3 py-1 text-sm rounded transition-colors ${viewMode === 'raw' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
//                   >
//                     Raw Data
//                   </button>
//                 </div>
//               </div>

//               {viewMode === 'cards' ? <CardsDisplay data={data} endpoint={endpoint} /> : <RawDataDisplay data={data} />}
//             </div>
//           )}

//           {!loading && !data && !error && (
//             <div className="p-10 bg-white bg-opacity-60 rounded-lg shadow-md text-center text-gray-600 animate-pulse">
//               <p className="text-lg">Select a button above to fetch data</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ApiDataPage;



























// src/pages/ApiDataPage.tsx

import React, { useState, useEffect } from 'react';
import {
  AlertCircle,
  CloudLightning,
  Droplets,
  Activity,
  Wind,
  Thermometer,
  Info,
  Calendar,
  MapPin,
  Users,
  Shield,
} from 'lucide-react';

// Define types for our data
type ApiResponse = {
  success?: boolean;
  data?: any;
  message?: string;
  fallbackData?: any;
};

// Animated background component
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -inset-10 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 animate-blob"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 400 + 100}px`,
              height: `${Math.random() * 400 + 100}px`,
              animationDelay: `${i * 2}s`,
              filter: 'blur(50px)',
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Card component for displaying items
const DataCard = ({ item, endpointType }: { item: any; endpointType: string }) => {
  const [expanded, setExpanded] = useState(false);

  // Define color schemes and icons based on endpoint type
  const cardConfig: { [key: string]: any } = {
    alerts: {
      bgGradient: 'from-blue-50 to-blue-100',
      borderColor: 'border-blue-200',
      iconBg: 'bg-blue-500',
      icon: <AlertCircle size={20} className="text-white" />,
    },
    'new-api1': {
      bgGradient: 'from-rose-50 to-pink-100',
      borderColor: 'border-pink-200',
      iconBg: 'bg-pink-500',
      icon: <Activity size={20} className="text-white" />,
    },
    'new-api2': {
      bgGradient: 'from-indigo-50 to-indigo-100',
      borderColor: 'border-indigo-200',
      iconBg: 'bg-indigo-500',
      icon: <Thermometer size={20} className="text-white" />,
    },
    'new-api3': {
      bgGradient: 'from-teal-50 to-teal-100',
      borderColor: 'border-teal-200',
      iconBg: 'bg-teal-500',
      icon: <Wind size={20} className="text-white" />,
    },
    'new-api4': {
      bgGradient: 'from-lime-50 to-green-100',
      borderColor: 'border-green-200',
      iconBg: 'bg-green-500',
      icon: <Droplets size={20} className="text-white" />,
    },
    'new-api5': {
      bgGradient: 'from-purple-50 to-fuchsia-100',
      borderColor: 'border-fuchsia-200',
      iconBg: 'bg-fuchsia-500',
      icon: <CloudLightning size={20} className="text-white" />,
    },
  };

  const config = cardConfig[endpointType] || cardConfig['alerts'];

  // Function to get primary display fields based on endpoint type
  const getPrimaryFields = () => {
    switch (endpointType) {
      case 'alerts':
        return [
          { icon: <Info size={16} />, label: 'Type', value: item.type || 'Unknown Type' },
          { icon: <Calendar size={16} />, label: 'Date', value: item.date || new Date().toLocaleDateString() },
          { icon: <MapPin size={16} />, label: 'Location', value: item.location || 'Global' },
        ];
      case 'new-api1': // Earthquake
        return [
          { icon: <Activity size={16} />, label: 'Magnitude', value: item.magnitude || 'N/A' },
          { icon: <MapPin size={16} />, label: 'Location', value: item.location || 'Unknown' },
          { icon: <Calendar size={16} />, label: 'Time', value: item.time || 'Recent' },
        ];
      case 'new-api2': // Weather
        return [
          { icon: <Thermometer size={16} />, label: 'Temperature', value: item.temperature || 'N/A' },
          { icon: <Wind size={16} />, label: 'Wind', value: item.windSpeed || 'N/A' },
          { icon: <MapPin size={16} />, label: 'Location', value: item.location || 'N/A' },
        ];
      case 'new-api3': // Smog
        return [
          { icon: <Wind size={16} />, label: 'AQI', value: item.aqi || 'N/A' },
          { icon: <MapPin size={16} />, label: 'Location', value: item.location || 'N/A' },
          { icon: <Shield size={16} />, label: 'Status', value: item.status || 'Unknown' },
        ];
      case 'new-api4': // Flood
        return [
          { icon: <Droplets size={16} />, label: 'Level', value: item.level || 'N/A' },
          { icon: <MapPin size={16} />, label: 'River/Area', value: item.area || 'N/A' },
          { icon: <Users size={16} />, label: 'Affected', value: item.affected || 'Unknown' },
        ];
      case 'new-api5': // Cyclone
        return [
          { icon: <CloudLightning size={16} />, label: 'Category', value: item.category || 'N/A' },
          { icon: <Wind size={16} />, label: 'Wind Speed', value: item.windSpeed || 'N/A' },
          { icon: <MapPin size={16} />, label: 'Path', value: item.path || 'Unknown' },
        ];
      default:
        return [
          { icon: <Info size={16} />, label: 'Info', value: Object.values(item)[0] || 'N/A' },
          { icon: <Calendar size={16} />, label: 'Date', value: item.date || new Date().toLocaleDateString() },
        ];
    }
  };

  const getCardTitle = () => {
    if (item.title) return item.title;
    if (item.name) return item.name;
    if (item.id) return `ID: ${item.id}`;
    if (endpointType === 'alerts') return 'Alert';
    if (endpointType === 'new-api1') return 'Earthquake Event';
    if (endpointType === 'new-api2') return 'Weather Report';
    if (endpointType === 'new-api3') return 'Smog Warning';
    if (endpointType === 'new-api4') return 'Flood Update';
    if (endpointType === 'new-api5') return 'Cyclone Alert';
    return 'Data Item';
  };

  const primaryFields = getPrimaryFields();

  return (
    <div className={`bg-gradient-to-br ${config.bgGradient} border ${config.borderColor} rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg`}>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className={`${config.iconBg} p-2 rounded-md mr-3`}>{config.icon}</div>
          <h3 className="font-semibold text-gray-800 truncate">{getCardTitle()}</h3>
        </div>

        <div className="grid grid-cols-1 gap-2 mb-3">
          {primaryFields.map((field, idx) => (
            <div key={idx} className="flex items-center text-sm">
              <span className="mr-2 text-gray-500">{field.icon}</span>
              <span className="font-medium text-gray-700">{field.label}:</span>
              <span className="ml-2 text-gray-800">{field.value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors focus:outline-none flex items-center"
        >
          {expanded ? 'Show Less' : 'Show Details'}
          <svg className={`ml-1 w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-gray-200 animate-fadeIn">
            <div className="text-xs font-mono bg-white bg-opacity-50 p-2 rounded max-h-40 overflow-y-auto">
              {Object.entries(item).map(([key, value]) => (
                <div key={key} className="mb-1">
                  <span className="font-medium text-gray-700">{key}:</span>{' '}
                  <span className="text-gray-800">{typeof value === 'object' ? JSON.stringify(value) : String(value)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Cards grid display component
const CardsDisplay = ({ data, endpoint }: { data: any; endpoint: string }) => {
  // Improved processData function to handle different shapes of data
  const processData = () => {
    if (Array.isArray(data)) {
      return data; // If it's already an array, just return it
    } else if (data && typeof data === 'object') {
      if (endpoint === 'alerts') {
        const result: any[] = [];
        const extractItems = (obj: any, prefix = '') => {
          if (typeof obj !== 'object' || obj === null) return;
          const isAlertItem = obj.type || obj.date || obj.location || obj.title || obj.name || obj.id;
          if (isAlertItem) {
            result.push({ ...obj, id: obj.id || prefix });
            return;
          }
          Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              const isNestedAlert = value.type || value.date || value.location || value.title || value.name;
              if (isNestedAlert) {
                result.push({ ...value, id: value.id || key });
              } else {
                extractItems(value, prefix ? `${prefix}.${key}` : key);
              }
            }
          });
        };
        extractItems(data);
        if (result.length > 0) return result;
        return Object.entries(data).map(([key, value]) => (typeof value === 'object' && value !== null ? { ...value, id: key } : { id: key, value }));
      }
      return [data];
    }
    return [];
  };

  const processedData = processData();

  if (!processedData || processedData.length === 0) {
    return (
      <div className="bg-white bg-opacity-80 rounded-lg p-6 shadow text-center">
        <Info size={24} className="mx-auto mb-2 text-gray-400" />
        <p className="text-gray-600">No data items available to display as cards.</p>
        {data && typeof data === 'object' && !Array.isArray(data) && (
          <p className="mt-3 text-sm text-gray-500">Note: Received object data that could not be displayed as cards.</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeIn">
      {processedData.slice(0, 12).map((item, index) => (
        <DataCard key={index} item={item} endpointType={endpoint} />
      ))}
      {processedData.length > 12 && (
        <div className="col-span-full text-center py-4">
          <p className="text-gray-600">
            Showing 12 of {processedData.length} items. See raw data for complete list.
          </p>
        </div>
      )}
    </div>
  );
};

// Raw data display component
const RawDataDisplay = ({ data }: { data: any }) => {
  if (!data) return null;
  return (
    <div className="mt-6 bg-white bg-opacity-90 rounded-lg p-4 border border-indigo-100 shadow-lg transition-all duration-500 animate-fadeIn">
      <details>
        <summary className="text-indigo-700 font-medium cursor-pointer focus:outline-none">View Raw JSON Data</summary>
        <pre className="whitespace-pre-wrap overflow-auto max-h-96 font-mono text-sm text-gray-800 mt-3">
          {JSON.stringify(data, null, 2)}
        </pre>
      </details>
    </div>
  );
};

// Button component with icon
const ApiButton = ({
  onClick,
  color,
  icon,
  label,
}: {
  onClick: () => void;
  color: string;
  icon: React.ReactNode;
  label: string;
}) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 ${color} text-white rounded-md hover:shadow-lg focus:ring-2 focus:outline-none transition-all duration-300 transform hover:scale-105 flex items-center space-x-2`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};

// Mock data for development and testing
const mockData = {
  alerts: [
    { id: 'alert1', type: 'Weather', date: '2025-05-14', location: 'New York', severity: 'High', title: 'Storm Warning' },
    { id: 'alert2', type: 'Earthquake', date: '2025-05-13', location: 'California', severity: 'Medium', title: 'Minor Tremor' },
    { id: 'alert3', type: 'Flood', date: '2025-05-12', location: 'Florida', severity: 'High', title: 'Rising Water Levels' },
  ],
  'new-api1': [
    { id: 'eq1', magnitude: '5.2', location: 'Los Angeles', time: '2025-05-14 08:30', depth: '10km', impact: 'Minor damage reported' },
    { id: 'eq2', magnitude: '4.7', location: 'San Francisco', time: '2025-05-13 14:45', depth: '8km', impact: 'No significant damage' },
  ],
  'new-api2': [
    { id: 'w1', temperature: '32°C', windSpeed: '15 km/h', location: 'Miami', forecast: 'Sunny', humidity: '65%' },
    { id: 'w2', temperature: '18°C', windSpeed: '25 km/h', location: 'Chicago', forecast: 'Cloudy', humidity: '70%' },
    { id: 'w3', temperature: '28°C', windSpeed: '10 km/h', location: 'Phoenix', forecast: 'Clear', humidity: '40%' },
  ],
  'new-api3': [
    { id: 'sm1', aqi: '165', location: 'Beijing', status: 'Unhealthy', pollutant: 'PM2.5', recommendation: 'Limit outdoor activity' },
    { id: 'sm2', aqi: '85', location: 'Delhi', status: 'Moderate', pollutant: 'PM10', recommendation: 'Sensitive groups should reduce exposure' },
  ],
  'new-api4': [
    { id: 'fl1', level: '2.3m', area: 'Mississippi River', affected: '3 counties', evacuationStatus: 'Partial', riskLevel: 'High' },
    { id: 'fl2', level: '1.8m', area: 'Colorado River', affected: '1 county', evacuationStatus: 'Alert', riskLevel: 'Medium' },
  ],
  'new-api5': [
    { id: 'cy1', category: '3', windSpeed: '185 km/h', path: 'Gulf Coast', expectedLandfall: '2025-05-18', evacuationStatus: 'Mandatory' },
    { id: 'cy2', category: '2', windSpeed: '150 km/h', path: 'Atlantic Coast', expectedLandfall: '2025-05-20', evacuationStatus: 'Advisory' },
  ],
};

const ApiDataPage = () => {
  const [data, setData] = useState<any>(null);
  const [endpoint, setEndpoint] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showData, setShowData] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'cards' | 'raw'>('cards');
  const [useMockData, setUseMockData] = useState<boolean>(false);

  useEffect(() => {
    // Animate data appearance when data changes.
    if (data) {
      setShowData(false);
      const timer = setTimeout(() => setShowData(true), 100);
      return () => clearTimeout(timer);
    }
  }, [data]);

  // Function to fetch data from the specified endpoint with error handling.
  const handleFetchData = async (selectedEndpoint: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    setEndpoint(selectedEndpoint);

    // Check if we should use mock data (for development/testing)
    if (useMockData) {
      setTimeout(() => {
        setData(mockData[selectedEndpoint as keyof typeof mockData]);
        setLoading(false);
      }, 800); // Simulate network delay
      return;
    }

    try {
      // Append a timestamp to avoid cache issues.
      const timestamp = new Date().getTime();
      const apiUrl = `/api/${selectedEndpoint}?_t=${timestamp}`;
      console.log('Fetching from:', apiUrl);

      const response = await fetch(apiUrl, {
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      });

      // Try to get the response as text first
      const responseText = await response.text();
      
      // Now we determine if this is actually JSON
      let responseData: any;
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Response is not valid JSON:", responseText.slice(0, 300));
        throw new Error(`Response is not valid JSON: ${parseError}`);
      }

      // Handle errors returned from API
      if (responseData.success === false) {
        if (responseData.fallbackData) {
          setData(responseData.fallbackData);
          setError(`Warning: Using fallback data. ${responseData.message}`);
          setLoading(false);
          return;
        }
        throw new Error(responseData.message || 'Unknown error from server');
      }

      // Set the data from the response
      if (responseData.data !== undefined) {
        setData(responseData.data);
      } else {
        // If no explicit data field, check for direct content
        const hasContent =
          Object.keys(responseData).length > 0 &&
          !('success' in responseData) &&
          !('message' in responseData);
        if (hasContent) {
          setData(responseData);
        } else {
          throw new Error('No data received from server');
        }
      }
    } catch (err: any) {
      console.error('API Error:', err);
      setError('Error: ' + (err.message || 'Unknown error occurred'));

      // Use mock data as fallback if API call fails
      if (mockData[selectedEndpoint as keyof typeof mockData]) {
        setTimeout(() => {
          setData(mockData[selectedEndpoint as keyof typeof mockData]);
          setError('API failed. Showing mock data instead.');
        }, 500);
      } else {
        // Attempt a fallback fetch for the 'alerts' endpoint if available.
        await handleFallbackFetch();
      }
    } finally {
      setLoading(false);
    }
  };

  // Fallback fetch function in case the primary API call fails.
  const handleFallbackFetch = async () => {
    try {
      const timestamp = new Date().getTime();
      const fallbackUrl = `/api/fetch-and-save?_t=${timestamp}`;
      console.log('Fallback fetch from:', fallbackUrl);
      
      const response = await fetch(fallbackUrl, {
        headers: {
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
        },
      });
      
      // Get response as text first
      const responseText = await response.text();
      
      // Try to parse as JSON
      try {
        const responseData = JSON.parse(responseText);
        if (responseData.success && responseData.data) {
          setData(responseData.data);
          setError('Retrieved data using alternate method');
        }
      } catch (parseError) {
        console.error('Fallback API returned invalid JSON:', parseError);
        throw new Error('Fallback API returned invalid JSON');
      }
    } catch (fallbackErr) {
      console.error('Fallback API also failed:', fallbackErr);
      // If all else fails, use mock data for alerts
      if (endpoint === 'alerts' && mockData.alerts) {
        setData(mockData.alerts);
        setError('All API attempts failed. Showing mock data as last resort.');
      }
    }
  };

  const getEndpointTitle = () => {
    switch (endpoint) {
      case 'alerts':
        return 'Alerts Data';
      case 'new-api1':
        return 'Earthquake Data';
      case 'new-api2':
        return 'Weather Data';
      case 'new-api3':
        return 'Smog Data';
      case 'new-api4':
        return 'Flood Data';
      case 'new-api5':
        return 'Cyclone Data';
      default:
        return 'API Data';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-8 pb-16">
      <AnimatedBackground />

      <div className="max-w-7xl mx-auto p-6 relative z-10">
        <div className="text-center mb-10 animate-fadeIn">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            API Data Explorer
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A colorful interface to visualize different types of disaster and weather data from our API endpoints.
          </p>
        </div>

        {/* Mock data toggle for development/testing */}
        <div className="mb-4 flex justify-center">
          <label className="flex items-center space-x-2 bg-white px-4 py-2 rounded-md shadow-sm">
            <input
              type="checkbox"
              checked={useMockData}
              onChange={() => setUseMockData(!useMockData)}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">Use mock data (for development/testing)</span>
          </label>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
          <ApiButton
            onClick={() => handleFetchData('alerts')}
            color="bg-gradient-to-r from-blue-500 to-blue-700"
            icon={<AlertCircle size={20} />}
            label="Fetch Alerts Data"
          />

          <ApiButton
            onClick={() => handleFetchData('new-api1')}
            color="bg-gradient-to-r from-rose-500 to-pink-700"
            icon={<Activity size={20} />}
            label="Fetch Earthquake Data"
          />

          <ApiButton
            onClick={() => handleFetchData('new-api2')}
            color="bg-gradient-to-r from-indigo-500 to-indigo-700"
            icon={<Thermometer size={20} />}
            label="Fetch Weather Data"
          />

          <ApiButton
            onClick={() => handleFetchData('new-api3')}
            color="bg-gradient-to-r from-teal-500 to-teal-700"
            icon={<Wind size={20} />}
            label="Fetch Smog Data"
          />

          <ApiButton
            onClick={() => handleFetchData('new-api4')}
            color="bg-gradient-to-r from-lime-500 to-green-700"
            icon={<Droplets size={20} />}
            label="Fetch Flood Data"
          />

          <ApiButton
            onClick={() => handleFetchData('new-api5')}
            color="bg-gradient-to-r from-purple-500 to-fuchsia-700"
            icon={<CloudLightning size={20} />}
            label="Fetch Cyclone Data"
          />
        </div>

        <div className="mt-8 transition-all duration-500">
          {loading ? (
            <div className="flex flex-col items-center justify-center p-10 bg-white bg-opacity-70 rounded-lg shadow-lg">
              <div className="relative w-20 h-20">
                <div className="absolute top-0 mt-4 w-16 h-16 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-purple-500 border-l-transparent animate-spin"></div>
                <div className="absolute top-2 mt-4 w-12 h-12 rounded-full border-4 border-t-transparent border-r-pink-500 border-b-transparent border-l-indigo-500 animate-spin"></div>
              </div>
              <p className="mt-4 text-lg font-medium text-indigo-800">Loading data...</p>
            </div>
          ) : error ? (
            <div
              className={`p-6 rounded-lg shadow-lg transition-all duration-300 animate-fadeIn ${
                data ? 'bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800' : 'bg-red-50 border-l-4 border-red-400 text-red-800'
              }`}
            >
              <div className="flex items-center">
                <AlertCircle className={`mr-3 ${data ? 'text-yellow-500' : 'text-red-500'}`} />
                <p className="font-medium">{error}</p>
              </div>
            </div>
          ) : null}

          {data && showData && (
            <div className="animate-slideUp">
              <div className="flex items-center justify-between mb-2 mt-6">
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
                    {getEndpointTitle()}
                  </h2>
                  <span className="ml-3 text-xs px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full font-medium">
                    {endpoint}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('cards')}
                    className={`px-3 py-1 text-sm rounded transition-colors ${viewMode === 'cards' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
                  >
                    Cards View
                  </button>
                  <button
                    onClick={() => setViewMode('raw')}
                    className={`px-3 py-1 text-sm rounded transition-colors ${viewMode === 'raw' ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'}`}
                  >
                    Raw Data
                  </button>
                </div>
              </div>

              {viewMode === 'cards' ? <CardsDisplay data={data} endpoint={endpoint} /> : <RawDataDisplay data={data} />}
            </div>
          )}

          {!loading && !data && !error && (
            <div className="p-10 bg-white bg-opacity-60 rounded-lg shadow-md text-center text-gray-600 animate-pulse">
              <p className="text-lg">Select a button above to fetch data</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApiDataPage;



