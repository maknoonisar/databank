// // apiData.ts
// import express from 'express';
// import axios from 'axios';

// const router = express.Router();
// const EXTERNAL_API_URL = 'https://alert.ndma.gov.pk/public/api/AlertManagement/getAllAlerts_english';

// router.get('/api/fetch-and-save', async (req, res) => {
//   try {
//     const response = await axios.get(EXTERNAL_API_URL);
//     res.json({
//       success: true,
//       data: response.data,
//     });
//   } catch (error) {
//     console.error('Fetch error:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch data.' });
//   }
// });

// export default router; // Ensure the router is exported as default



// apiData.ts
import express, { Request, Response } from 'express';
import axios from 'axios';

const router = express.Router();
const EXTERNAL_API_URL = 'https://alert.ndma.gov.pk/public/api/AlertManagement/getAllAlerts_english';

// Helper function to safely fetch and parse JSON from an external API
async function safeApiFetch(url: string) {
  try {
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      timeout: 15000,
      responseType: 'text'
    });
    
    const data = response.data;
    if (typeof data === 'string' && (data.trim().startsWith('<!DOCTYPE') || data.trim().startsWith('<html'))) {
      throw new Error('API returned HTML instead of JSON');
    }
    
    if (typeof data === 'string') {
      try {
        return JSON.parse(data);
      } catch (parseError) {
        if (parseError instanceof Error) {
          throw new Error(`Failed to parse response as JSON: ${parseError.message}`);
        } else {
          throw new Error('Failed to parse response as JSON: Unknown error');
        }
      }
    }
    
    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(`API responded with status ${error.response.status}: ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error('No response received from API (timeout or network issue)');
    }
    throw error;
  }
}

// Route for alerts - corrected to match frontend's expected path
router.get('/alerts', async (req: Request, res: Response) => {
  try {
    const jsonData = await safeApiFetch(EXTERNAL_API_URL);
    res.json({
      success: true,
      data: jsonData
    });
  } catch (error: any) {
    console.error('Error fetching alerts:', error.message);
    res.status(502).json({ 
      success: false, 
      message: error.message || 'Failed to fetch alerts data',
      fallbackData: [] // Empty array as fallback data
    });
  }
});

// Legacy endpoint for backward compatibility
router.get('/fetch-and-save', async (req: Request, res: Response) => {
  try {
    const jsonData = await safeApiFetch(EXTERNAL_API_URL);
    res.json({
      success: true,
      data: jsonData
    });
  } catch (error: any) {
    console.error('Error in fetch-and-save:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to fetch data',
      fallbackData: [] // Empty array as fallback data
    });
  }
});

// Mock endpoints for development and testing
router.get('/new-api1', async (req: Request, res: Response) => {
  try {
    // For now, return mock data
    res.json({
      success: true,
      data: [
        { id: 'eq1', magnitude: '5.2', location: 'Los Angeles', time: '2025-05-14 08:30', depth: '10km', impact: 'Minor damage reported' },
        { id: 'eq2', magnitude: '4.7', location: 'San Francisco', time: '2025-05-13 14:45', depth: '8km', impact: 'No significant damage' }
      ]
    });
  } catch (error: any) {
    console.error('Error in new-api1:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to fetch earthquake data',
      fallbackData: [] 
    });
  }
});

router.get('/new-api2', async (req: Request, res: Response) => {
  try {
    // For now, return mock data
    res.json({
      success: true,
      data: [
        { id: 'w1', temperature: '32°C', windSpeed: '15 km/h', location: 'Miami', forecast: 'Sunny', humidity: '65%' },
        { id: 'w2', temperature: '18°C', windSpeed: '25 km/h', location: 'Chicago', forecast: 'Cloudy', humidity: '70%' },
        { id: 'w3', temperature: '28°C', windSpeed: '10 km/h', location: 'Phoenix', forecast: 'Clear', humidity: '40%' }
      ]
    });
  } catch (error: any) {
    console.error('Error in new-api2:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to fetch weather data',
      fallbackData: [] 
    });
  }
});

router.get('/new-api3', async (req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      { id: 'sm1', aqi: '165', location: 'Beijing', status: 'Unhealthy', pollutant: 'PM2.5', recommendation: 'Limit outdoor activity' },
      { id: 'sm2', aqi: '85', location: 'Delhi', status: 'Moderate', pollutant: 'PM10', recommendation: 'Sensitive groups should reduce exposure' }
    ]
  });
});

router.get('/new-api4', async (req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      { id: 'fl1', level: '2.3m', area: 'Mississippi River', affected: '3 counties', evacuationStatus: 'Partial', riskLevel: 'High' },
      { id: 'fl2', level: '1.8m', area: 'Colorado River', affected: '1 county', evacuationStatus: 'Alert', riskLevel: 'Medium' }
    ]
  });
});

router.get('/new-api5', async (req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      { id: 'cy1', category: '3', windSpeed: '185 km/h', path: 'Gulf Coast', expectedLandfall: '2025-05-18', evacuationStatus: 'Mandatory' },
      { id: 'cy2', category: '2', windSpeed: '150 km/h', path: 'Atlantic Coast', expectedLandfall: '2025-05-20', evacuationStatus: 'Advisory' }
    ]
  });
});

export default router;