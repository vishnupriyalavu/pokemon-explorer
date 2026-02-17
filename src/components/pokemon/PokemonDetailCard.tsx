import type { PokemonDetails } from "@/api/pokemonApi"
import PokemonTypes from "./PokemonTypes"

interface Props {
  pokemon: PokemonDetails
}

function PokemonDetailsCard({ pokemon }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-emerald-400 to-teal-300 flex items-center justify-center p-6">

      <div className="bg-white/70 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-full max-w-2xl text-center space-y-8 animate-fadeIn">

        {/* Name */}
        <h1 className="text-5xl font-extrabold capitalize">
          {pokemon.name}
        </h1>

        {/* Image */}
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="mx-auto w-48 animate-float"
        />

        {/* Types */}
        <PokemonTypes types={pokemon.types} />

        {/* Info Grid */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <p className="text-sm text-gray-500">Height</p>
            <p className="text-xl font-bold">{pokemon.height}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md">
            <p className="text-sm text-gray-500">Weight</p>
            <p className="text-xl font-bold">{pokemon.weight}</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md">
            <p className="text-sm text-gray-500">Base XP</p>
            <p className="text-xl font-bold">
              {pokemon.base_experience}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div>
          <h2 className="text-2xl font-bold mt-6 mb-4">
            Stats
          </h2>

          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">
                    {stat.stat.name.replace("-", " ")}
                  </span>
                  <span>{stat.base_stat}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(stat.base_stat, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abilities */}
        <div>
          <h2 className="text-2xl font-bold mt-6 mb-4">
            Abilities
          </h2>

          <div className="flex flex-wrap justify-center gap-3">
            {pokemon.abilities.map((a) => (
              <span
                key={a.ability.name}
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:scale-110 transition"
              >
                {a.ability.name}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default PokemonDetailsCard
