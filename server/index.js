// Importing dependencies
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const summarizeText = require('./summarize.js'); // Assuming you have a summarize function

// Middleware
app.use(cors());
app.use(express.json()); // to parse JSON request bodies

// Summarize route
app.post('/summarize', (req, res) => {
  const text = req.body.text_to_summarize;

  // Call your summarize function here (assuming it's async)
  summarizeText(text)
    .then(summary => {
      res.json({ summary }); // Send summary back as JSON
    })
    .catch(error => {
      console.error('Error:', error);
      res.status(500).send('Error summarizing text');
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
