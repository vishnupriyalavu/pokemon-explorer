import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import PokemonDetail from "./pages/PokemonDetail"
import Layout from "@/components/layout/Layout"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:name" element={<PokemonDetail />} />
      </Routes>
    </Layout>
  )
}

export default App
