import * as React from 'react'
const { renderToString } = require("react-dom/server")
import { matchRoutes } from 'react-router-config'
import { StaticRouter } from "react-router"
// import { SheetsRegistry } from 'jss';
// import JssProvider from 'react-jss/lib/JssProvider';
import { Provider as ReduxProvider } from 'react-redux'
import { createServerStore } from '@src/store/server'
import teal from '@material-ui/core/colors/teal'
import lightBlue from '@material-ui/core/colors/lightBlue'
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core/styles'
import App, { routes } from './app'


export default async (req, context = {}) => {
    // Create a sheetsRegistry instance.
    // const sheetsRegistry = new SheetsRegistry();

    // Create a sheetsManager instance.
    // const sheetsManager = new Map();

    // Create a theme instance.
    const theme = createMuiTheme({
        palette: {
            primary: teal,
            secondary: lightBlue
        },
        // typography: {
        //     useNextVariants: true,
        // }
    })
    
    const store = createServerStore()
    const matchedRoute = matchRoutes(routes, req.url)
    console.log('beforeFetch', store.getState())
    return await Promise.all(
        matchedRoute.filter(value => (value.route.component as any).getAsyncData)
            .map(value => (value.route.component as any).getAsyncData(store, req))
    ).then(() => {
        console.log('afterFetch', store.getState())
        // const generateClassName = createGenerateClassName();
        const sheets = new ServerStyleSheets();
        return {
            store: store.getState(),
            html: renderToString(
                sheets.collect(
                    <ReduxProvider store={store}>
                        <ThemeProvider theme={theme}>
                            <StaticRouter location={req.url} context={context}>
                                <App/>
                            </StaticRouter>
                        </ThemeProvider>
                    </ReduxProvider>,
                  ),
                // <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
                    
                // </JssProvider> 
            ),
            css: sheets.toString()
        }
    })
}