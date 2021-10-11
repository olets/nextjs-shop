import Head from 'next/head'
import Header from './Header'

export const siteTitle = 'Next.js Store'

export default function Layout({ children, title = siteTitle }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Store in Next.js"/>
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <Header></Header>

      <main className="flex-1 p-10 text-center">
        <h1 className="mb-10 text-2xl">
        {title}
        </h1>
        
        {children}
      </main>

      <footer className="border-t p-8 w-full">
        by @olets
      </footer>
    </div>
  )
}