//node 
const server = require( 'express' )()
const { createBundleRenderer } = require( 'vue-server-renderer' );
const path = require('path')



const renderer = createBundleRenderer( path.resolve( __dirname, '../dist/vue-ssr-server-bundle.json' ), {
    runInNewContext: false, //推荐
    template,  
    clientManifest
} )

server.get( '*', ( req, res ) => {
    const context = { url: req.url }
    renderer.renderToString( context, ( err, html ) => {
        res.end( html )
    } )
} )