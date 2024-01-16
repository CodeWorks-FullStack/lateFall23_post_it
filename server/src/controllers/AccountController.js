import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { collaboratorsService } from '../services/CollaboratorsService.js'

export class AccountController extends BaseController {
  constructor () {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .get('/collaborators', this.getMyAlbumCollaborations)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getMyAlbumCollaborations(request, response, next) {
    try {
      const userId = request.userInfo.id
      const albumCollaborations = await collaboratorsService.getMyAlbumCollaborations(userId)
      response.send(albumCollaborations)
    } catch (error) {
      next(error)
    }
  }
}
