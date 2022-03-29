import moment from 'moment'

export let refStartDate = new Date()
export let refEndDate

export const setMinStartDate = () => {
  let startDateTime = moment(new Date())
  startDateTime.minutes(Math.ceil(startDateTime.minutes() / 15) * 15)
  refStartDate = startDateTime._d

  let endDateTime = moment(startDateTime).add(60, 'minutes')
  refEndDate = endDateTime._d

  return {
    startDateTime: startDateTime._d,
    endDateTime: endDateTime._d,
    refStartDate,
    refEndDate,
  }
}

export const setMinEndDate = (refDate) => {
  let endDateTime = moment(refDate).add(moment.duration(60, 'minutes'))._d

  return { endDateTime }
}
