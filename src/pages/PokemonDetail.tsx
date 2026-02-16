import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonDetails } from "../api/pokemonApi";
import { Badge } from "../components/ui/badge";

function PokemonDetail() {
  const { name } = useParams<{ name: string }>();

  const { data } = useQuery({
    queryKey: ["pokemon", name],
    queryFn: () => fetchPokemonDetails(name!),
  });

  return (
    <div className="p-10 space-y-6">
      <h1 className="text-4xl font-bold capitalize">
        {data?.name}
      </h1>

      <img src={data?.sprites.front_default} />

      <div className="flex gap-2">
        {data?.types.map((t) => (
          <Badge key={t.type.name}>
            {t.type.name}
          </Badge>
        ))}
      </div>

      <p>Height: {data?.height}</p>
      <p>Weight: {data?.weight}</p>

      <h2 className="text-xl font-bold">
        Abilities
      </h2>

      {data?.abilities.map((a) => (
        <p key={a.ability.name}>
          {a.ability.name}
        </p>
      ))}
    </div>
  );
}

export default PokemonDetail;
