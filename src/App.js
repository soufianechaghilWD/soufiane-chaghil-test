import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/cart";
import Product from "./pages/product";
import Home from "./pages/home";
import { DataProvider } from "./context/dataContext";

class App extends Component {
  render() {
    return (
      <DataProvider>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/cart" element={<Cart />} />
              <Route path="/product" element={<Product />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </DataProvider>
    );
  }
}

export default App;
