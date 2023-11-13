import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import "dotenv/config";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = 3000;
const app = express();
const apiKey = process.env.apiKey;
const configHeader = {
  headers: { Authorization: `Bearer ${apiKey}` },
};

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const listCoins = await axios.get(
      "https://api.coingecko.com/api/v3/coins/list"
    );
    res.render("index.ejs", {
      data: listCoins.data[1].id,
    });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
