import { Badge } from "@/components/ui/badge"

interface PokemonType {
  type: {
    name: string
  }
}

interface Props {
  types: PokemonType[]
}

function PokemonTypes({ types }: Props) {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {types.map((t) => (
        <Badge
          key={t.type.name}
          className="capitalize transition hover:scale-110"
        >
          {t.type.name}
        </Badge>
      ))}
    </div>
  )
}

export default PokemonTypes
