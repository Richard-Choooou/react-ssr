import * as React from 'react'
import { hydrate } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './app'
// import JssProvider from 'react-jss/lib/JssProvider';
import { Provider as ReduxProvider } from 'react-redux'
import store from '@src/store/client'
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal'
import lightBlue from '@material-ui/core/colors/lightBlue'
import './src/assets/style/common/reset.scss'

const theme = createMuiTheme({
    palette: {
        primary: teal,
        secondary: lightBlue
    },
    // typography: {
    //     useNextVariants: true,
    // }
})

// const generateClassName = createGenerateClassName();

class Main extends React.Component {
    componentDidMount() {
        const jssStyles = document.getElementById('jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }

    render() {
        return <App/>
    }
}

hydrate(<ReduxProvider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Main/>
                </BrowserRouter>
            </ThemeProvider>
        </ReduxProvider>, document.getElementById('root'))

