import { AxiosInstance } from "axios";
import { IGameProps, IGames } from "@/interfaces/IGames";
import { api } from "./api";

class GamesService {
  constructor(private readonly apiService: AxiosInstance){}

  async getData(): Promise<IGames[]> {
    const { data } = await this.apiService.get('/games')
    return data
  }

  async findOneGame(id: string | number): Promise<IGameProps> {
    const { data } = await this.apiService.get(`/game?id=${id}`)
    return data
  }
}

const gamesService = new GamesService(api)
export default gamesService