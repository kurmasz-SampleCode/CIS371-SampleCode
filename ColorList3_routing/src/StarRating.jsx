import React from "react"
import Star from "./Star"

const createArray = length => [...Array(length)]

export default function StarRating({ totalStars = 5, selectedStars = 0, onRatingUpdated = f => f }) {
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={selectedStars > i}
          onStarClicked={() => onRatingUpdated(i + 1) }
        />
      ))}
      <p>
        {selectedStars} of {totalStars} stars
      </p>
    </>
  )
}