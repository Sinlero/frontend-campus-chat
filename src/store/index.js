import { createStore } from 'vuex'

import chat from "./chat"
import user from "./user"

export default createStore({
  modules: {
    user,
    chat
  }
})
