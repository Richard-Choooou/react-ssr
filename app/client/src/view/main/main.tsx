import * as React from 'react';
import { Link } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
// import { Route } from 'react-router-dom'
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config'
// import Index from './index/index'

import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

interface componentProps {
    classes: {
        root: string
    }
}

interface componentStates {
    value: number
}
class Main extends React.Component<componentProps & RouteComponentProps & RouteConfigComponentProps, componentStates> {
    constructor(props) {
        super(props)
        this.state = {
            value: 0
        }
    }

    handleChange(event, value) {
        console.log(value)
        this.setState({ value })
    }

    goTo(path) {
        this.props.history.replace(path)
    }

    render() {
        const { classes } = this.props
        
        return (
                <div>
                    {/* <Route path={this.props.match.url + '/index'} component={Index}/> */}
                    {/* {routes.map((route, index) => <Route key={index} path={this.props.match.url + route.path} component={route.component} />)} */}
                    {renderRoutes(this.props.route.routes)}
                    <BottomNavigation
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                        showLabels
                        className={classes.root}
                    >
                        <BottomNavigationAction onClick={() => this.goTo('/app/main/index')} label="推荐" icon={<RestoreIcon />} />
                        <BottomNavigationAction onClick={() => this.goTo('/app/main/classifications')} label="分类" icon={<FavoriteIcon />} />
                        <BottomNavigationAction onClick={() => this.goTo('/app/main/cart')} label="购物车" icon={<LocationOnIcon />} />
                        <BottomNavigationAction label="我的" icon={<LocationOnIcon />} />
                    </BottomNavigation>
                </div>
        )
    } 
}

export default withStyles({
    root: {
        position: 'fixed',
        bottom: '0',
        left: 0,
        right: 0,
        display: 'flex',
        height: '56px',
        background: '#fff',
        zIndex: 1000,
        boxShadow: '0px -1px 6px 0px rgba(0,0,0,.1)'
    }
}, {
    classNamePrefix: ''
})(Main)
