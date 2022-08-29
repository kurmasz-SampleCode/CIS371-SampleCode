import React from 'react'
import { BrowserRouter, Route, Link, useRouteMatch } from 'react-router-dom'
import './App.css'

let countingArray = (num) => [...Array(num).keys()]

function Hello () {
  return <div>Hello!</div>
}

function Goodbye () {
  return <div>Goodbye!</div>
}

function George () {
  return <div>Hello, George</div>
}

function AllAuthors () {
  let authorList = countingArray(20).map((num) => {
    return (
      <li key={num}><Link to={`author/${num}`}>Author {num}</Link></li>
    )
  })

  return (
    <div>
      Listing all Authors
      <ul>
        {authorList}
      </ul>
    </div>
  )
}


function Author () {
  let match = useRouteMatch()

  console.log(match)
  return (
    <div>
      Showing author number {match.params.id}
    </div>
  )
}


function App () {
  return (
    <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hello">Hello</Link></li>
          <li><Link to="/hello/george">George</Link></li>
          <li><Link to="/goodbye">Goodbye</Link></li>
          <li><Link to="/author">Authors</Link></li>
        </ul>
        <Route exact path="/">Home!</Route>
        <Route path="/hello" component={Hello} />
        <Route path="/hello/george" component={George} />
        <Route path="/goodbye" component={Goodbye} />
        <Route exact path="/author/" component={AllAuthors} />
        <Route path="/author/:id" component={Author} />
      </div>
    </BrowserRouter>
  )
}

export default App
