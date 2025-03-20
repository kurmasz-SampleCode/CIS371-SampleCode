import React from 'react'
import { useLocation, Link } from 'react-router-dom'


export function Home() {
  return (
    <div>
      <h1>Colors &#x42F; Us</h1>

      Let us help you with all your color listing needs. 
    </div>
  )
}

export function About() {
  return (
    <div>
      <h1>About ColorList</h1>
            ColorList is a React app used to demonstrate the basics of React.  It is based on an example in
      <em>Learning React, 2nd Edition</em> by Alex Banks and Eve Porcello.
    </div>
  )
}

export function Events() {
  return (
    <div>
      <h1>Events</h1>
      <ul>
        <li>Party</li>
        <li>Book signing</li>
        <li>Zoo opens</li>
      </ul>
    </div>
  )
}

export function Products() {
  return (
    <div>
      <h1>[Products]</h1>
    </div>
  )
}

export function Contact() {
  return (
    <div>
      <h1>Colors &apos;&#x42F;&apos; Us</h1>
    </div>
  )
}

export function NotFound() {
  let location = useLocation()
  return (
    <div>
      <h1>Path {location.pathname} is not valid </h1>
    </div>
  )
}

export function NavBar() {
  return (
    <nav id='navBar'>
            Contents: 
      <Link to="about">About</Link>
      <Link to="events">Events</Link>
      <Link to="products">Products</Link>
      <Link to="contact">Contact Us</Link>
    </nav>
  )
}