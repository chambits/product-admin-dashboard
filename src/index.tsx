import { ConfigProvider } from "antd";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import { store } from "./app/store";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </Provider>
);
