import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchPokemonList } from "@/api/pokemonApi"
import PokemonCard from "@/components/pokemon/PokemonCard"
import { useEffect, useRef, useState, useMemo } from "react"

function Home() {
  const loadMoreRef = useRef<HTMLDivElement | null>(null)
  const [search, setSearch] = useState("")

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
    staleTime: 1000 * 60 * 10,
    getNextPageParam: (lastPage, pages) =>
      lastPage.next ? pages.length * 20 : undefined,
  })

  // Infinite scroll
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

  // Flatten all pages
  const allPokemon = useMemo(() => {
    return data?.pages.flatMap((page) => page.results) ?? []
  }, [data])

  // Filtered list
  const filteredPokemon = useMemo(() => {
    return allPokemon.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [allPokemon, search])

  return (
    <div className="p-8 space-y-8">

      {/* Title */}
      <h1 className="text-4xl font-bold text-center">
        Pokémon Explorer
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name} url={""}            // url={pokemon.url}
          />
        ))}
      </div>

      {/* Infinite Loader */}
      <div
        ref={loadMoreRef}
        className="h-20 flex justify-center items-center"
      >
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
