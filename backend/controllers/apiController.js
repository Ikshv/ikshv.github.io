// controllers/apiController.js

exports.getStatus = (req, res) => {
    res.json({
      message: 'Hello from API, nice to meet you',
      timestamp: new Date().toISOString()
    });
  };
  
  exports.receiveStream = (req, res) => {
    // Process the incoming stream data as needed
    console.log('Received stream data:', req.body);
    res.status(200).json({ message: 'Stream chunk received' });
  };
  