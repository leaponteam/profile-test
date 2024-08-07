import express from "express";
import fs from "fs";
import path from "path";
import axios from "axios";

import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../src/App";

const PORT = process.env.PORT || 8001;
const app = express();

// Serve static files from the build directory
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Handle all routes with the React app
app.get("*", async (req, res, next) => {
  try {
    // Fetch data from the API
    const { data } = await axios.get(`https://leaponapi-test.herokuapp.com/api/shuvo/`);

    // Extract meta information from the API response
    const { title, description, image, url } = data;
    console.log(title, description, image, url);

    // Read the HTML template file
    fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, htmlData) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Some error happened");
      }

      // Render the React component to a string
      const renderedApp = ReactDOMServer.renderToString(
        <App title={title} description={description} image={image} url={url} />
      );

      // Inject the rendered React app and initial data into the HTML and send the response
      return res.send(
        htmlData
          .replace(
            '<div id="root"></div>',
            `<div id="root">${renderedApp}</div>`
          )
          .replace(
            '</body>',
            `<script>
              window.__INITIAL_DATA__ = ${JSON.stringify({ title, description, image, url })};
            </script></body>`
          )
      );
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error fetching data from API");
  }
});

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
