// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import Layout from "./Layout";
import Header from "./Header";
import Footer from "./Footer";

function App() {
  return (
    <>
      {/*these empty elements are called fragments, which are used to put multiple elements into a single parent element*/}
        <h2>Home</h2>
        <p>This is my ITIS3135 Course Home Page.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi
          omnis distinctio iusto! Dolore, animi? Cupiditate minus reiciendis
          cumque nulla. Tempora ab ex sed possimus voluptate et est. Reiciendis,
          repudiandae sed.
        </p>
    </>
  );
}

export default App;
