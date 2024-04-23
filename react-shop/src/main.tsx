import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/tailwind.css";
import "./assets/css/style.css";

import { RecoilRoot } from "recoil";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <RecoilRoot>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </RecoilRoot>
);

export default App;