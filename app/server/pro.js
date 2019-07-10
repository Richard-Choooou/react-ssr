const path = require('path')
const serverEntryBuild = require('./dist/server.entry.js').default
const ejs = require('ejs')
const express = require('express')

module.exports = function(app) {
    app.use(express.static(path.resolve(__dirname, './static')));
    app.get('/', (req, res) => {
        res.redirect('/app/main/index')
    })
    app.use(async (req, res, next) => {
        const reactRenderResult = await serverEntryBuild(req)
        ejs.renderFile(path.resolve(process.cwd(), './app/server/dist/index.ejs'), {
            jss: reactRenderResult.css,
            store: JSON.stringify(reactRenderResult.store),
            html: reactRenderResult.html
        }, {
            delimiter: '?',
            strict: false
        }, function(err, str){
            if (err) {
                console.log(err)
                res.status(500)
                res.send('渲染错误')
                return
            }
            res.end(str, 'utf-8')
        })
    });
}