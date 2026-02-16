import { Link } from "react-router-dom"

function Navbar() {
  return (
    <nav className="bg-black text-white py-4">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/" className="text-xl font-bold">
          Pokémon Explorer
        </Link>
      </div>
    </nav>
  )
}

export default Navbar
