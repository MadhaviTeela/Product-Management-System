import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./Pages/ProductList";


const App = () => {
  return (
    <> 

    <div>
      <Routes>
        <Route path = "/" element = { <ProductList /> } />
      </Routes>
    </div>
   
    
     </>
  );
};

export default App;

