const express = require('express');
const axios = require('axios');
const app = express();
const port = 8008;

app.get('/numbers', async (req, res) => {
  const { url: urls } = req.query;

  if (!urls) {
    return res.status(400).json({ error: 'No URLs provided in the query parameters.' });
  }

  try {
    const parsedUrls = Array.isArray(urls) ? urls : [urls];
    console.log(parsedUrls);

    const fetchData = async (url) => {
      try {
        console.log(url);
        const response = await axios.get(url);
        return response.data;
      } catch (error) {
        console.error(`Error fetching data from ${url}: ${error.message}`);
        return null;
      }
    };

    const result = await Promise.all(parsedUrls.map(fetchData));

    res.json({ data: result });
  } catch (error) {
    console.error(`Error processing request: ${error.message}`);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

app.listen(port, () => {
  console.log(`number-management-service is running at http://localhost:${port}`);
});