import Star from './Star'

const createArray = length => [...Array(length)];

export default function StarRating({ totalStars = 5, selectedStars = 0 }) {
    return (
      <>
        {createArray(totalStars).map((n, i) => (
          <Star
            key={i}
            selected={selectedStars > i}
          />
        ))}
        <p>
          {selectedStars} of {totalStars} stars
        </p>
      </>
    );
  }