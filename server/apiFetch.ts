import { Router, Request, Response } from 'express';
import axios from 'axios';
import { storage } from './storage';

const router = Router();

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


// Endpoint to fetch alerts from external API
router.get('/alerts', async (req: Request, res: Response) => {
  try {
    // Use our helper function with the known working approach
    const jsonData = await safeApiFetch('https://alert.ndma.gov.pk/public/api/AlertManagement/getAllAlerts_english');
    
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

// Add these below existing router.get('/alerts', ...) etc.

router.get('/new-api1', async (req: Request, res: Response) => {
    try {
      const jsonData = await safeApiFetch('https://your-new-api1-url.com/api/data');
      res.json({ success: true, data: jsonData });
    } catch (error: any) {
      console.error('Error fetching New API 1:', error.message);
      res.status(502).json({ 
        success: false, 
        message: error.message || 'Failed to fetch New API 1 data',
        fallbackData: [] 
      });
    }
  });
  
  router.get('/new-api2', async (req: Request, res: Response) => {
    try {
      const jsonData = await safeApiFetch('https://your-new-api2-url.com/api/data');
      res.json({ success: true, data: jsonData });
    } catch (error: any) {
      console.error('Error fetching New API 2:', error.message);
      res.status(502).json({ 
        success: false, 
        message: error.message || 'Failed to fetch New API 2 data',
        fallbackData: [] 
      });
    }
  });
  
  router.get('/new-api3', async (req: Request, res: Response) => {
    try {
      const jsonData = await safeApiFetch('https://your-new-api3-url.com/api/data');
      res.json({ success: true, data: jsonData });
    } catch (error: any) {
      console.error('Error fetching New API 3:', error.message);
      res.status(502).json({ 
        success: false, 
        message: error.message || 'Failed to fetch New API 3 data',
        fallbackData: [] 
      });
    }
  });

// Keep the fallback endpoint for compatibility, but use the same approach
router.get('/fetch-and-save', async (req: Request, res: Response) => {
  try {
    // This is now essentially the same as the /alerts endpoint
    const jsonData = await safeApiFetch('https://alert.ndma.gov.pk/public/api/AlertManagement/getAllAlerts_english');
    
    res.json({
      success: true,
      data: jsonData
    });
  } catch (error: any) {
    console.error('Error in fetch-and-save:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to fetch data'
    });
  }
});

export default router;