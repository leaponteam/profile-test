// app.js
import React from "react";
import "./App.css";
import { Helmet } from "react-helmet";
// import axios from "axios";


function App(props) {

  // axios.defaults.baseURL = "https://leaponapi-test.herokuapp.com/";
    // "start:prod": "concurrently \"npm run ssr\" \"serve -s build\"",
  // json package cmd
  // Use initial data if props are not available
  const initialData = typeof window !== "undefined" ? window.__INITIAL_DATA__ : {};

  const title = props.title || initialData.title || "Default Title";
  const description = props.description || initialData.description || "Default Description";
  const image = props.image || initialData.image || "Default Image URL";
  const url = props.url || initialData.url || "Default URL";

  console.log("app:", title, description, image, url);

  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="profile" />
      </Helmet>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </>
  );
}

export default App;
