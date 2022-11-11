import StarRating from './StarRating'

export default function Color({ title, color, rating, onColorRatingUpdated = f => f}) {
    return (
      <section>
        <h1>{title}</h1>
        <div style={{ height: 50, width: 100, backgroundColor: color }} />
        <StarRating selectedStars={rating} onRatingUpdated={(newValue) => onColorRatingUpdated(newValue)}  />
      </section>
    );
  }