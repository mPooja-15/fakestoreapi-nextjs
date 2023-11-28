import NavBar from './core/NavBar'
import Footer from './core/Footer'



export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <div>
        { children }
      </div>
      <Footer />
    </>
  )
}
