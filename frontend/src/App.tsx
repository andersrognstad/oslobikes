import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BikestationMap } from "./components/BikestationMap.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full h-screen flex flex-col gap-4">
        <h1>Oslo bysykkel-stasjoner</h1>
        <h3>Klikk på markørene for å se status på ledige låser og sykler</h3>
        <BikestationMap />
      </div>
    </QueryClientProvider>
  )
}

export default App
