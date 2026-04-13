import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./contexts/theme-context.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider>
    <Provider store={store}>
      <App />
      <Toaster
        position="top-center"
        closeButton={true}
        toastOptions={{
          classNames: { toast: "!bg-slate-900/75 backdrop-blur-md" },
        }}
      />
    </Provider>
  </ThemeProvider>,
  //* </StrictMode>,
);
