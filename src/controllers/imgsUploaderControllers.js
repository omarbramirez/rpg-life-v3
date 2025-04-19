exports.uploadImg = async(req, res) => {
    try{
        res.status(200).json(req.file)
    }catch(err){
        console.error('Error:', err);
        res.status(500).json({ 
            message: 'Internal server error. Please try again later.' 
        });
    }
}