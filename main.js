import Vue from 'vue'
import App from './App'
import glbShare from '@/mixins/global_share.js'
import phoneNumberMixins from '@/mixins/getPhone.js'
import glbData from '@/config/glbData.js'

/*全局自定义组件*/
import Tabs from '@/components/Tabs.vue'
import End from '@/components/End.vue'
import NewsItem from '@/components/NewsItem.vue'
import NewsItem2 from '@/components/NewsItem2.vue'
import LeaderItem from '@/components/LeaderItem.vue'
import ImgItem from '@/components/ImgItem.vue'
import ImgItem2 from '@/components/ImgItem2.vue'
import NewsDetailTitle from '@/components/NewsDetailTitle.vue'
import VideoItem from '@/components/VideoItem.vue'
import VideoItem2 from '@/components/VideoItem2.vue'
import Enclosure from '@/components/Enclosure.vue'
import MajorSelector from '@/components/MajorSelector.vue'
import MajorSelector2 from '@/components/MajorSelector2.vue'
import TabList from '@/components/TabList.vue'
import BasePage from '@/components/BasePage.vue'
import Title from '@/components/Title.vue'
import Navbar from '@/components/Navbar.vue'
import Navbar1 from '@/components/Navbar1.vue'
import Navbar2 from '@/components/Navbar2.vue'
import Popupcenter from '@/components/Popupcenter.vue'
import Home from '@/components/Home.vue'
import Home1 from '@/components/Home1.vue'









Vue.component('End',End)
Vue.component('Tabs',Tabs)
Vue.component('NewsItem',NewsItem)
Vue.component('NewsItem2',NewsItem2)
Vue.component('LeaderItem',LeaderItem)
Vue.component('ImgItem',ImgItem)
Vue.component('ImgItem2',ImgItem2)
Vue.component('NewsDetailTitle',NewsDetailTitle)
Vue.component('VideoItem',VideoItem)
Vue.component('VideoItem2',VideoItem2)
Vue.component('Enclosure',Enclosure)
Vue.component('MajorSelector',MajorSelector)
Vue.component('MajorSelector2',MajorSelector2)
Vue.component('TabList',TabList)
Vue.component('BasePage',BasePage)
Vue.component('Title',Title)
Vue.component('Navbar',Navbar)
Vue.component('Navbar1',Navbar1)
Vue.component('Navbar2',Navbar2)
Vue.component('Popupcenter',Popupcenter)
Vue.component('Home',Home)
Vue.component('Home1',Home1)




Vue.config.productionTip = false
Vue.prototype.tenantId = '76'
Vue.prototype.$theme = glbData.$theme
Vue.prototype.$theme2 = glbData.$theme2
Vue.prototype.uni = uni



App.mpType = 'app'


Vue.mixin(glbShare)
Vue.mixin(phoneNumberMixins)

const app = new Vue({
    ...App
})
app.$mount()
