import moment from 'moment'
// import { useDispatch } from 'react-redux'
import { setEndDateTime, setStartDateTime } from '../globalStore/ducks/search'

export let refStartDate = new Date()
export let refEndDate

export const setMinStartDate = () => {
  let startDateTime = moment(new Date())
  startDateTime.minutes(Math.ceil(startDateTime.minutes() / 15) * 15)
  setStartDateTime(startDateTime._d)
  refStartDate = startDateTime._d

  let endDateTime = moment(startDateTime).add(60, 'minutes')
  setEndDateTime(endDateTime._d)
  refEndDate = endDateTime._d
}

export const setMinEndDate = (refDate) => {
  // refEndDate = moment(startDate).add(moment.duration(60, 'minutes'))._d
  setEndDateTime(moment(refDate).add(moment.duration(60, 'minutes'))._d)
}
