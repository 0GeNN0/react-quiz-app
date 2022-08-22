import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import "./styles/fonts/Inter-Regular.ttf";
import "./styles/fonts/Inter-Medium.ttf";
import "./styles/fonts/Karla-Bold.ttf";

import App from "./App";
import QuizContextProvider from "./QuizContext";

const rootElement = document.querySelector("#root") as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <QuizContextProvider>
    <App />
  </QuizContextProvider>
);
