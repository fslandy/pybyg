import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Print from '@/components/Print'
import PrintQrCode from '@/components/PrintQrCode'
import PrintCarForm from '@/components/PrintCarForm'
import ItemDetail from '@/components/ItemDetail'
import Freezer from '@/components/Freezer'
import CheckInfo from '@/components/CheckInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/print',
      name: 'Print',
      component: Print
    },
    {
      path: '/printCode',
      name: 'PrintCode',
      component: PrintQrCode
    },
    {
      path: '/printCarForm',
      name: 'PrintCarForm',
      component: PrintCarForm
    },
    {
      path: '/checkInfo',
      name: 'CheckInfo',
      component: CheckInfo
    },
    {
      path: '/detail',
      name: 'detail',
      component: ItemDetail
    },
    {
      path: '/Freezer',
      name: 'freezer',
      component: Freezer
    }
  ]
})
