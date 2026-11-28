import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import App from "./App"
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </StrictMode>
);
