// pages/_app

import Head from 'next/head'
import {SessionProvider} from 'next-auth/react'

const App = ({ Component, pageProps, session }) => {
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" />
            </Head>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
            </SessionProvider>
            
        </>
    )
}

export default App