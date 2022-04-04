import pluginPkg from '../../package.json'
import Initializer from './components/Initializer'
import PreviewLink from './components/PreviewLink'
import pluginId from './pluginId'

const { name } = pluginPkg.strapi

export default {
  register(app) {
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name
    })
  },
  bootstrap(app) {
    app.injectContentManagerComponent('editView', 'right-links', {
      name: 'preview',
      Component: PreviewLink
    })
  }
}
