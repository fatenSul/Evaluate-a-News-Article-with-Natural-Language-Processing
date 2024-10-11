document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const text = document.querySelector('textarea').value;

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });

            const data = await response.json();
            console.log(data);
            document.querySelector('.result').innerText = `Sentiment: ${data.polarity}`;
        } catch (error) {
            console.error('Error:', error);
        }
    });
});

document.getElementById('analyzeButton').addEventListener('click', analyzeSentiment);

async function analyzeSentiment() {
    const textInput = document.getElementById('textInput').value;

    if (!textInput) {
        alert('Please enter some text to analyze.');
        return;
    }

    try {
        const response = await fetch('https://api.aylien.com/api/v1/sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-AYLIEN-TextAPI-Application-ID': 'YOUR_APP_ID',
                'X-AYLIEN-TextAPI-Application-Key': 'YOUR_APP_KEY'
            },
            body: JSON.stringify({ text: textInput })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error processing your request. Please try again later.');
    }
}

function displayResults(data) {
    // Assuming you have elements to display sentiment score and other results
    document.getElementById('sentimentResult').innerText = `Sentiment: ${data.polarity}`;
    // Add more display logic for other insights
}

