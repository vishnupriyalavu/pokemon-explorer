import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchPokemonList } from "@/api/pokemonApi"
import PokemonCard from "@/components/pokemon/PokemonCard"
import { useEffect, useRef } from "react"

function Home() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["pokemon"],
    queryFn: ({ pageParam = 0 }) =>
      fetchPokemonList(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.next ? pages.length * 20 : undefined,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage()
        }
      },
      { threshold: 1 }
    )

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current)
    }

    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage])

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mb-10">
        Pokémon Explorer
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {data?.pages.map((page) =>
          page.results.map((pokemon) => (
<PokemonCard
  key={pokemon.name}
  name={pokemon.name}
  url={pokemon.url}
/>
          ))
        )}
      </div>

      <div ref={loadMoreRef} className="h-20 flex justify-center items-center">
        {isFetchingNextPage && (
          <p className="animate-pulse">
            Loading more Pokémon...
          </p>
        )}
      </div>
    </div>
  )
}

export default Home
