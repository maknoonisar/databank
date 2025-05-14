// // Path: /frontend/src/pages/AlertsPage.tsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// // TypeScript interface for Alert Item
// interface AlertItem {
//   id: number;
//   title: string;
//   description: string;
//   latitude: number;
//   longitude: number;
// }

// const AlertsPage: React.FC = () => {
//   const [alerts, setAlerts] = useState<AlertItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     async function fetchAlerts() {
//       try {
//         const response = await axios.get('/alerts');
//         const data = response.data.data;
        
//         // Assuming 'data' is an array of alert objects
//         const mappedAlerts = data.map((item: any) => ({
//           id: item.id,
//           title: item.title,
//           description: item.description,
//           latitude: item.latitude,
//           longitude: item.longitude,
//         }));

//         setAlerts(mappedAlerts);
//       } catch (error) {
//         console.error('Error fetching alerts:', error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAlerts();
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-10 text-lg font-semibold">Loading alerts...</div>;
//   }

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//       {alerts.map((alert) => (
//         <div
//           key={alert.id}
//           className="rounded-2xl shadow-lg bg-white p-6 hover:shadow-2xl transition-shadow duration-300"
//         >
//           <h2 className="text-xl font-bold mb-2">{alert.title}</h2>
//           <p className="text-gray-600 mb-4">{alert.description}</p>
//           <div className="text-sm text-gray-500">
//             <p><strong>ID:</strong> {alert.id}</p>
//             <p><strong>Latitude:</strong> {alert.latitude}</p>
//             <p><strong>Longitude:</strong> {alert.longitude}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AlertsPage;



import React, { useEffect, useState } from 'react';
import { AlertCircle, MapPin, Info, AlertTriangle, Shield } from 'lucide-react';

// Define the shape of our alert data
interface AlertItem {
  id: number;
  title: string;
  description: string;
  impact: string;
  action: string;
  type: string;
  lat_long: string[];
}

const NewAlertsPage = () => {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        setLoading(true);
        // Fetch data from your API endpoint
        const response = await fetch('/api/alerts');
        const data = await response.json();
        
        if (data && data.data) {
          setAlerts(data.data);
        } else {
          setError('No alerts data found');
        }
      } catch (err) {
        console.error('Error fetching alerts:', err);
        setError('Failed to load alerts data');
      } finally {
        setLoading(false);
      }
    }
    
    fetchAlerts();
  }, []);

  // Background animation component
  const BackgroundAnimation = () => (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 animate-blob"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              animationDelay: `${i * 2}s`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>
    </div>
  );

  // Alert card component
  const AlertCard = ({ alert, index }: { alert: AlertItem, index: number }) => {
    // Colors for card header gradients
    const gradients = [
      'from-blue-500 to-indigo-600',
      'from-green-500 to-teal-600',
      'from-orange-500 to-red-600',
      'from-purple-500 to-pink-600',
      'from-pink-500 to-rose-600',
      'from-indigo-500 to-blue-600',
    ];
    
    return (
      <div 
        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        style={{ animationDelay: `${index * 150}ms` }}
      >
        {/* Colored header */}
        <div className={`h-3 bg-gradient-to-r ${gradients[index % gradients.length]}`}></div>
        
        {/* Card content */}
        <div className="p-5">
          {/* Title */}
          <div className="flex items-center space-x-2 mb-4">
            <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
            <h3 className="text-lg font-bold text-gray-800 truncate">{alert.title}</h3>
          </div>
          
          {/* Description */}
          <div className="mb-4">
            <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md border-l-4 border-gray-200">
              {alert.description}
            </p>
          </div>
          
          {/* Impact section */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="text-amber-500" size={16} />
              <h4 className="text-sm font-semibold text-gray-700">Potential Impact</h4>
            </div>
            <p className="text-sm text-gray-600 bg-amber-50 p-3 rounded-md border-l-4 border-amber-200">
              {alert.impact}
            </p>
          </div>
          
          {/* Action section */}
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-1">
              <Shield className="text-blue-500" size={16} />
              <h4 className="text-sm font-semibold text-gray-700">Recommended Action</h4>
            </div>
            <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-md border-l-4 border-blue-200">
              {alert.action}
            </p>
          </div>
          
          {/* Footer with metadata */}
          <div className="border-t border-gray-100 mt-3 pt-3 grid grid-cols-2 gap-2 text-xs text-gray-500">
            {/* Alert ID */}
            <div className="flex items-center">
              <Info size={14} className="mr-1" />
              <span className="font-medium">ID:</span>
              <span className="ml-1">{alert.id}</span>
            </div>
            
            {/* Alert Type */}
            <div className="flex items-center justify-end">
              <div className={`w-2 h-2 rounded-full mr-1 ${
                alert.type === "1" ? "bg-red-500" : 
                alert.type === "2" ? "bg-orange-500" : 
                alert.type === "3" ? "bg-yellow-500" : "bg-blue-500"
              }`}></div>
              <span>Type {alert.type}</span>
            </div>
            
            {/* Location */}
            <div className="flex items-center col-span-2">
              <MapPin size={14} className="mr-1" />
              <span className="font-medium">Coordinates:</span>
              <span className="ml-1 truncate">
                {Array.isArray(alert.lat_long) ? 
                  `${alert.lat_long[0]?.substring(0, 8)}, ${alert.lat_long[1]?.substring(0, 8)}` : 
                  'Unknown'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 pt-8 pb-16">
      <BackgroundAnimation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            Weather Alerts Dashboard
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real-time monitoring of weather conditions and alerts across Pakistan
          </p>
        </div>
        
        {/* Content area */}
        {loading ? (
          <div className="flex flex-col items-center justify-center p-12 bg-white bg-opacity-80 rounded-lg shadow-lg">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-lg font-medium text-blue-800">Loading alert data...</p>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-md">
            <div className="flex items-center">
              <AlertCircle className="text-red-500 mr-3" />
              <p className="font-medium text-red-800">{error}</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alerts.length > 0 ? (
              alerts.map((alert, index) => (
                <AlertCard key={alert.id} alert={alert} index={index} />
              ))
            ) : (
              <div className="col-span-full p-10 bg-white bg-opacity-75 rounded-lg shadow-md text-center">
                <AlertCircle className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-lg text-gray-600">No alerts available at this time</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewAlertsPage;
