export interface IGames {
  id: number
  title: string
  thumbnail: string
  short_description: string
  game_url: string
  genre: string
  platform: string
  publisher: string
  developer: string
  release_date: string
  freetogame_profile_url: string
}

export interface IGameProps {
  id: number
  title: string
  description: string
  game_url: string
  platform: string
  genre: string
  minimum_system_requirements: PropsSystem
  thumbnail: string
  screenshots: PropsScrenshots[]
}

interface PropsSystem {
  graphics: string
  memory: string
  os: string
  processor: string
  storage: string
}

interface PropsScrenshots {
  id: number
  image: string
}
