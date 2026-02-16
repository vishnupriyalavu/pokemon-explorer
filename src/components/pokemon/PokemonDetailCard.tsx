import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchPokemonDetails } from "@/api/pokemonApi"
import PokemonTypes from "@/components/pokemon/PokemonTypes"

function PokemonDetail() {
  const { name } = useParams<{ name: string }>()

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetails(name!),
    enabled: !!name,
  })

  if (isLoading) {
    return <p className="text-center text-lg">Loading...</p>
  }

  if (!data) {
    return <p className="text-center text-red-500">Error</p>
  }

  return (
    <div className="flex justify-center py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl space-y-8">

        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold capitalize">
            {data.name}
          </h1>

          <img
            src={data.sprites.front_default}
            alt={data.name}
            className="mx-auto w-40 hover:scale-110 transition duration-300"
          />

          <PokemonTypes types={data.types} />

          <p className="text-gray-500">Pokédex ID: #{data.id}</p>
        </div>

        {/* Physical Info */}
        <div className="grid grid-cols-3 text-center gap-4">
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Height</p>
            <p className="text-lg font-bold">{data.height}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Weight</p>
            <p className="text-lg font-bold">{data.weight}</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-sm text-gray-500">Base XP</p>
            <p className="text-lg font-bold">{data.base_experience}</p>
          </div>
        </div>

        {/* Stats Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Stats</h2>

          <div className="space-y-3">
            {data.stats.map((stat) => (
              <div key={stat.stat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">
                    {stat.stat.name.replace("-", " ")}
                  </span>
                  <span>{stat.base_stat}</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-500 h-3 rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min(stat.base_stat, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Abilities Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Abilities</h2>

          <div className="grid grid-cols-2 gap-4">
            {data.abilities.map((a) => (
              <div
                key={a.ability.name}
                className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl hover:scale-105 transition"
              >
                <p className="capitalize font-semibold text-center">
                  {a.ability.name}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default PokemonDetail
