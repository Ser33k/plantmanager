import './App.css';
import PlantManagerApp from "./component/PlantManagerApp";
import StoreProvider from "./store/storeProvider";
import React from "react";

function App() {
  return (
      <StoreProvider>
        <div className="container">
            <PlantManagerApp />
        </div>
      </StoreProvider>
  );
}

export default App;
