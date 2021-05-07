import { useState } from 'react';

interface ReviewProp {
  review: string;
}
export default function ReviewText({ review }: ReviewProp) {
  const [clip, setClip] = useState(true);
  const { length } = review;
  const isLongerthan = length - 15 > 250;
  return (
    <>
      <p>{clip ? review.trim().slice(0, 250) : review}</p>

      {isLongerthan ? (
        clip ? (
          <button
            onClick={() => setClip(false)}
            className="text-primary m__details-reviews-morebtn"
          >
            <small>Show more</small>
          </button>
        ) : null
      ) : null}
    </>
  );
}
