export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).send({ message: 'Only POST requests allowed' });
    }
  
    const callbackData = req.body;
  
    // Process callback data here
    console.log('Payment callback data:', callbackData);
  
    res.status(200).send({ status: 'success' });
  }
  