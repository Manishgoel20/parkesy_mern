import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Parkade from '../components/Parkade'
import { getApprovedParkades } from '../globalStore/ducks/parkade'
import SkeletonList from '../layouts/SkeletonList'

const AllParkades = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getApprovedParkades())
  }, [])

  const { myParkades } = useSelector((state) => state.parkadeData)

  return (
    <>
      {myParkades ? (
        myParkades.map((data, id) => (
          <Parkade parkade={data} key={id} setActions badge approvedBtn />
        ))
      ) : (
        <SkeletonList />
      )}
    </>
  )
}

export default AllParkades
