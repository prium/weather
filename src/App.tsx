import { Navigate, Route, Routes } from "react-router-dom";
import { locations } from "./data/locations";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Weather from "./components/Weather";

import "./scss/App.scss";

function App() {
  const routePaths = Array.from(locations.keys());
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={routePaths[0]} replace={true} />}
        />
        {routePaths.map((key) => {
          return <Route key={key} path={`/${key}`} element={<Weather />} />;
        })}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
