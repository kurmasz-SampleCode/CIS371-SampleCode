import React from "react"
import { useParams } from "react-router-dom"
import Color from "./Color"

export default function ColorDetails({ colors }) {

  let params = useParams()
  console.log(params)
  let id = params.id

  let color = colors.find((item) => item.id === id)

  const body = color ?  <Color {...color} /> : <span>Color {id} not found.</span>
  return (
    <div>
      <h1>Color Details</h1>
      {body}
    </div>

  )
}