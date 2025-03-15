exports.getStatus = (req, res) => {
    res.json({message: 'webcam is operational'});
};

exports.receiveStream = (req,res) => {
    console.log('received stream data chunk:', req.body);
    req.status(200).json({ message: 'Stream chunk received' });
};