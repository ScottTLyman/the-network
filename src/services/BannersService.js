import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"


class BannersService {
  async getAll() {
    const res = await api.get('api/ads')
    logger.log('got ads', res.data)
    AppState.banners = res.data
  }

}

export const bannersService = new BannersService()