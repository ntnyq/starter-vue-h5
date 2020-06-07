import Vue from 'vue'
import * as filters from '@/filters/filters'

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
