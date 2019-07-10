const path = require('path')

function normalizeAssets(assets) {
    if (Object.prototype.toString.call(assets) === "[object Object]") {
        return Object.values(assets)
    }

    return Array.isArray(assets) ? assets : [assets];
}

module.exports = function(app) {
    // require('source-map-support').install();
    const webpack = require('webpack')
    const requireFromString = require('require-from-string');
    const webpackMiddleWare = require('webpack-dev-middleware')
    const webpackDevConfig = require('../../build/webpack.dev.js')
    const compiler = webpack(webpackDevConfig)

    // app.use(express.static(path.resolve(__dirname, './static')));
    app.use(webpackMiddleWare(compiler, { serverSideRender: true, publicPath: webpackDevConfig[0].output.publicPath }));
    app.use(require("webpack-hot-middleware")(compiler));

    app.get('/', (req, res) => {
        res.redirect('/app/main/index')
    })

    app.get(/\/app\/.+/, async (req, res, next) => {
        const clientCompilerResult = res.locals.webpackStats.toJson().children[0]
        const serverCompilerResult = res.locals.webpackStats.toJson().children[1]
        const clientAssetsByChunkName = clientCompilerResult.assetsByChunkName
        const serverAssetsByChunkName = serverCompilerResult.assetsByChunkName
        const fs = res.locals.fs
        const clientOutputPath = clientCompilerResult.outputPath
        const serverOutputPath = serverCompilerResult.outputPath
        const renderResult = await requireFromString(
                fs.readFileSync(
                    path.resolve(serverOutputPath, serverAssetsByChunkName.server), 'utf8'
                ),
                serverAssetsByChunkName.server
            ).default(req)
        
        res.send(`
            <html>
                <head>
                    <title>My App</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
                    <link rel="stylesheet" href="//at.alicdn.com/t/font_953281_mnofys87u4a.css">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                    <style>${normalizeAssets(clientAssetsByChunkName.client)
                            .filter((path) => path.endsWith('.css'))
                            .map((path) => fs.readFileSync(clientOutputPath + '/' + path))
                            .join('\n')}</style>
                    <style id="jss-server-side">${renderResult.css}</style>
                    <script>
                        window.INIT_REDUX_STORE = ${JSON.stringify(renderResult.store)}
                    </script>
                </head>
                <body>
                <div id="root">${renderResult.html}</div>
                ${normalizeAssets(clientAssetsByChunkName.commons)
                    .filter((path) => path.endsWith('.js'))
                    .map((path) => `<script src="/${path}"></script>`)
                    .join('\n')}
                ${normalizeAssets(clientAssetsByChunkName.client)
                    .filter((path) => path.endsWith('.js'))
                    .map((path) => `<script src="/${path}"></script>`)
                    .join('\n')}
                </body>
            </html>
        `);
    });

    app.use((req, res) => {
        res.status(404).send('Not found');
    })
}