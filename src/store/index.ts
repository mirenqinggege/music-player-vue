import {createPinia} from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

const store = createPinia()

store.use(piniaPersist)

export {store}

export * from './modules/test'

export * from './modules/banner'

export * from './modules/song-list'

export * from './modules/cookie'

export default store
