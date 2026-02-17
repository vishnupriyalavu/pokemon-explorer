import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { fetchPokemonDetails } from "@/api/pokemonApi"
import PokemonDetailsCard from "@/components/pokemon/PokemonDetailCard"


function PokemonDetail() {
  const { name } = useParams<{ name: string }>()

  const { data, isLoading } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetails(name!),
    enabled: !!name,
  })

  if (isLoading) {
    return <p className="text-center py-20">Loading...</p>
  }

  if (!data) {
    return <p className="text-center py-20 text-red-500">Error</p>
  }

  return <PokemonDetailsCard pokemon={data} />
}

export default PokemonDetail
