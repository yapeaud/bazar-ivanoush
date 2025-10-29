import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

const App = () => {
  return (
    <>
      <article className='bg-gray-50 miin-h-screen'>
        <Navbar />
        <hr />
      </article>
      <article className='flex w-full'>
        <Sidebar />
      </article>
    </>
  )
}

export default App
