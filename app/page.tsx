import React from 'react'
import Header from './components/ui/Header'
import Hero from './components/home/Hero'

type Props = {}

const page = (props: Props) => {
  return (
    <>
    <Header />
      <Hero />
    </>
  )
}

export default page