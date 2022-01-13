const express = require("express");
const request = require("request-promise");

require("dotenv").config({ path: "./.env.local" });

const app = express();
const PORT = process.env.PORT || 5500;

const apiKEY = process.env.SCRAPER_API_KEY;
const apiURL = process.env.SCRAPER_API_URL;

const baseUrl = `${apiURL}?api_key=${apiKEY}&autoparse=true`;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Welcome to Amazon Scraper API.`);
});

// Get Product  Details
app.get("/products/:productId", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/dp/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
// Get Product  Reviews
app.get("/products/:productId/reviews", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/product-reviews/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
// Get Product  Offers
app.get("/products/:productId/offers", async (req, res) => {
  const { productId } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/gp/offer-listing/${productId}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});
// Get Search Results
app.get("/search/:searchQuery", async (req, res) => {
  const { searchQuery } = req.params;

  try {
    const response = await request(
      `${baseUrl}&url=https://www.amazon.com/s?k=${searchQuery}`
    );

    res.json(JSON.parse(response));
  } catch (error) {
    res.json(error);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
