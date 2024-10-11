const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Aylien API credentials
const AYL_URL = 'https://api.aylien.com/api/v1/sentiment';
const AYL_APP_ID = 'YOUR_AYLIEN_APP_ID';  // Replace with your Aylien App ID
const AYL_APP_KEY = 'YOUR_AYLIEN_APP_KEY';  // Replace with your Aylien App Key

// Route for sentiment analysis
app.post('/analyze', async (req, res) => {
    const text = req.body.text;

    try {
        const response = await axios.post(AYL_URL, {
            text: text,
        }, {
            headers: {
                'X-Aylien-TextAPI-Application-ID': 'e027af02',
                'X-Aylien-TextAPI-Application-Key': '1b3c4faa3e18716af0b56b8a1ed37f87',
                'Content-Type': 'application/json'
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error analyzing sentiment');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
