import * as React from 'react'
import { Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import Login from './src/view/login'
import Main from './src/view/main/router'
import GoodsDetail from './src/view/goods_detail/goods_detail'
import NotFoundPage from './src/view/404/404'

export const routes = [
    Main, 
{
    path: '/app/login',
    component: Login,
    exact: true
}, {
    path: '/app/goodsDetail/:id',
    component: GoodsDetail,
    exact: true
}, {
    component: NotFoundPage
}]

interface componentProps {
}

interface componentStates {
}

class App extends React.Component<componentProps, componentStates> {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Switch>
                {renderRoutes(routes)}

            </Switch>
        )
    } 
}

export default App