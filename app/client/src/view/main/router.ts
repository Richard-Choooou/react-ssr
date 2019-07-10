import Main from './main'
import Index from './index/index'
import Classifications from './classifications/classifications'
import Cart from './cart/cart'

export default {
    path: '/app/main',
    component: Main,
    routes: [{
        path: '/app/main/index',
        component: Index
    }, {
        path: '/app/main/classifications',
        component: Classifications
    }, {
        path: '/app/main/cart',
        component: Cart
    }]
}