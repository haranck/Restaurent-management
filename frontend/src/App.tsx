import { Toaster } from 'react-hot-toast'
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#1f2937",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "8px",
            fontSize: "14px",
          },
          success: {
            style: {
              border: "1px solid #22c55e",
            },
          },
          error: {
            style: {
              border: "1px solid #ef4444",
            },
          },
        }}
      />
      <Routes>
        <Route path="/*" element={<UserRoutes />} />

      </Routes>
    </>
  )
}

export default App