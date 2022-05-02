import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyParkades } from '../globalStore/ducks/parkade'
import SkeletonList from '../layouts/SkeletonList'

import Parkade from '../components/Parkade'

const MyParkades = () => {
  const dispatch = useDispatch()
  const { myParkades } = useSelector((state) => state.parkadeData)

  useEffect(() => {
    dispatch(getMyParkades())
  }, [])

  useEffect(() => {}, [myParkades])

  return (
    <>
      {myParkades ? (
        myParkades.map((data, id) => (
          <Parkade parkade={data} key={id} setActions badge />
        ))
      ) : (
        <SkeletonList />
      )}
    </>
  )
}

export default MyParkades
