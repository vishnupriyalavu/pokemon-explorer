import axios from "axios"

export interface PokemonListItem {
  name: string
  url: string
}

export interface PokemonListResponse {
  results: PokemonListItem[]
  next: string | null
}

export interface PokemonDetails {
  id: number
  name: string
  height: number
  weight: number
  base_experience: number

  abilities: {
    ability: {
      name: string
    }
  }[]

  sprites: {
    front_default: string
  }

  types: {
    type: {
      name: string
    }
  }[]

  stats: {
    base_stat: number
    stat: {
      name: string
    }
  }[]
}

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2/",
})

export const fetchPokemonList = async (
  offset: number
): Promise<PokemonListResponse> => {
  const { data } = await api.get(
    `pokemon?limit=20&offset=${offset}`
  )
  return data
}

export const fetchPokemonDetails = async (
  name: string
): Promise<PokemonDetails> => {
  const { data } = await api.get(`pokemon/${name}`)
  return data
}
