import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { memo } from "react"
import {fetchPokemonDetails} from "@/api/pokemonApi"
import { useQuery}  from "@tanstack/react-query"

interface Props {
  name: string
  url: string
}

function PokemonCard({ name, url }: Props) {
  const navigate = useNavigate()

 // const id = url.split("/").filter(Boolean).pop()

  const { data } = useQuery({
  queryKey: ["pokemon", name],
  queryFn: () => fetchPokemonDetails(name!)
})

if (!data) return null

const imageUrl = data.sprites.front_default


 

  return (
    <Card
      onClick={() => navigate(`/pokemon/${name}`)}
      className="h-[220px] cursor-pointer hover:scale-105 hover:shadow-xl transition duration-300"
    >
      <CardContent className="p-6 text-center space-y-4">

        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          decoding="async"
          width="96"
          height="96"
          className="mx-auto w-24"
        />

        <h2 className="text-lg font-bold capitalize">
          {name}
        </h2>

      </CardContent>
    </Card>
  )
}

export default memo(PokemonCard)
