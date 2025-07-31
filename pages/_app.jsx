import { Nav } from '@/components/Nav';
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return <>
    <header>
      <Nav />
    </header>
    <main>
      <Component {...pageProps} />
    </main>
    <footer>
      (c) 2025
    </footer>
  </>
}