import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='eng'>
        <Head>
            <meta charSet="UTF-8" />
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossOrigin="anonymous" />
            <link rel="stylesheet" href='https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css' />
            <link href="https://cdn.quilljs.com/1.3.6/quill.snow.css" rel="stylesheet" />
            <link rel='stylesheet' href='/static/css/styles.css' />
        </Head>
        <body>
            <Main />
            <NextScript />
            <script src="//cdn.quilljs.com/1.3.6/quill.js"></script>
            <script id="dsq-count-scr" src="//pearlbox.disqus.com/count.js" async></script>
        </body>
    </Html>
  )
}