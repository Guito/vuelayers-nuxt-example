import Vue from 'vue'
import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css' // needs css-loader
import {loadingBBox} from 'vuelayers/lib/ol-ext'

Vue.use(VueLayers)
Vue.use(loadingBBox)

Vue.prototype.$loadingBBox = () => {
    return loadingBBox
}
