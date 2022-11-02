import StarRating from './StarRating'

export default function Color({ title, color, rating }) {
    return (
      <section>
        <h1>{title}</h1>
        <div style={{ height: 50, width: 100, backgroundColor: color }} />
        <StarRating selectedStars={rating} />
      </section>
    );
  }