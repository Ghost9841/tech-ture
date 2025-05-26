import React from 'react'
import Hero from './components/Hero'

type Props = {}

const App = (props: Props) => {
  return (
    <>
      <main className="relative min-h-screen overflow-x-hidden">
        <Hero />
      </main>
    </>
  )
}

export default App