import Vue from 'vue'
import axios from 'axios'
axios.defaults.baseURL = 'http://152.136.185.210:8000/api/n3'
axios.defaults.timeout = 30000
axios.defaults.withCredentials=true
axios.defaults.crossDomain=true
Vue.prototype.axios = axios