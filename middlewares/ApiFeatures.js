class ApiFeatures {
  constructor(query, queryString) {
    this.query = query
    this.queryString = queryString
  }

  filter() {
    const queryObj = { ...this.queryString }
    const exclude = ['page', 'sort', 'limit', 'fields']
    exclude.forEach((el) => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = JSON.parse(
      queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
    )

    this.query = this.query.find(queryStr)
    return this // We must return this to every methods otherwise this will not gonna work!
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else this.query = this.query.sort('-createdAt')
    return this
  }

  limitFields() {
    if (this.queryString.fields) {
      const showField = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(showField)
    } else this.query = this.query.select('-__v')
    return this
  }

  paginate() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 20
    const skip = (page - 1) * limit

    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

export default ApiFeatures
