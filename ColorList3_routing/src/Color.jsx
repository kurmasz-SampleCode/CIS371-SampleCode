import React from 'react'
import StarRating from './StarRating'

export default function Color({ title, color, rating, onEditClicked = f => f, onColorRatingUpdated = f => f }) {
  return (
    <section>
      <h1>{title}</h1>
      <div>
        <div className='colorBox' style={{ backgroundColor: color }} />
        <button onClick={() => onEditClicked(color)}>Edit</button>
      </div>
      <StarRating selectedStars={rating} onRatingUpdated={(newValue) => onColorRatingUpdated(newValue)} />
    </section>
  )
}