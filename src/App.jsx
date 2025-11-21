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
      <head>
        <title>ITIS3135 | Gabriel Pagunuran's | Generic Parakeet | Home</title>
        <script
          src="https://lint.page/kit/4d0fe3.js"
          crossorigin="anonymous"
        ></script>
      </head>
      <body>
        <Header />
        <main>
          <h2>Home</h2>
          <p>This is my ITIS3135 Course Home Page.</p>
        </main>
        <Footer />
      </body>
    </>
  );
}

export default App;
