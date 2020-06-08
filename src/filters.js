import Vue from 'vue'
import moment from 'moment'

//时间格式化过滤器
Vue.filter('dateFormat',function(time,format='YYYY-MM-DD HH:mm:ss'){
    return moment(time).format(format)
})