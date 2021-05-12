import { useState } from 'react';

interface ReviewProp {
  review: string;
}
export default function ReviewText({ review }: ReviewProp) {
  const [clip, setClip] = useState(true);
  const { length } = review;
  const isLongerthan = length - 15 > 150;
  return (
    <>
      <p>{clip ? review.trim().slice(0, 150) : review}</p>

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
