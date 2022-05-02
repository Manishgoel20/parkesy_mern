import { useState } from 'react'

export const RatingStars = (rating) => {
  const [fullStar, setFullStar] = useState(0)
  const [halfStar, setHalfStar] = useState(0)
  const [emptyStar, setEmptyStar] = useState(0)

  while (rating >= 1) {
    rating--
    setFullStar((star) => star + 1)
  }

  if (rating >= 7) {
    setFullStar((star) => star + 1)
  } else if (rating >= 3 && rating < 7) {
    setHalfStar((star) => star + 1)
  }

  let val = 5 - fullStar - halfStar
  setEmptyStar(val)

  return { fullStar, halfStar, emptyStar }
}
