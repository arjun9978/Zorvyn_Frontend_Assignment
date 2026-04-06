import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { NuqsAdapter } from "nuqs/adapters/react";
// @ts-ignore

import "./index.css";
import "./i18n/config";
import App from "./App.tsx";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { RoleProvider } from "./context/role-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RoleProvider>
          <NuqsAdapter>
            <App />
          </NuqsAdapter>
          <Toaster
            position="top-center"
            expand={true}
            duration={1000}
            richColors
            closeButton
          />
        </RoleProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);