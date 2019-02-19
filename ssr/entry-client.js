import createApp from './app';

const { app, router, store }  = createApp();

if( window.__INITIAL_STATE__ ) {
    store.replaceState( window.__INITIAL_STATE__ )
}

//提前解析
router.onReady( _ => {
    
    router.beforeResolve( ( to, from , next ) => {
        const matched = router.getMatchedComponents( to )
        const prevMathched = router.getMatchedComponents( from )


        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false

        const activated = matched.filter( (c, i) => {
            return diffed || ( diffed = ( prevMathched[i] !== c ) )
        } )

        if( !activated.length ) {
            return next();
        }

        Promise.all( activated.map( c => {
            if( c.asyncData ) {
                return c.asyncData( { store, route: to } )
            }
        } ) ).then( _ => {
             // 停止加载指示器(loading indicator)

            next()
        } ).catch( next )

    } )
    app.$mount('#app', true);
} )

