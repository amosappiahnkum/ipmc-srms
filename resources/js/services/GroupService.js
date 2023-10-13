import api from '../utils/api'

class GroupService {
    all = () => {
      try {
        return api().get('/groups')
      } catch (e) {
        console.log(e)
      }
    }
}

export default new GroupService()
