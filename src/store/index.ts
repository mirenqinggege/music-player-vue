import {createPinia} from 'pinia'

const store = createPinia()

export {store}

export * from './modules/test'

export * from './modules/banner'

export default store
