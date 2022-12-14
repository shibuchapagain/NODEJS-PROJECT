class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filter() {
    // 1A) FILTERING
    const queryObj = { ...this.queryString };
    const excludedFields = ["page", "sort", "limit", "field"];
    excludedFields.forEach((el) => delete queryObj[el]);
    // console.log(req.query, queryObj);

    // 1B) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // console.log(JSON.parse(queryStr));
    // { duration: { $gte: '5' }, difficulty: 'easy' }
    // { duration: { gte: '5' }, difficulty: 'easy' }
    // gte, gt .. lte, lt
    this.query.find(JSON.parse(queryStr));
    return this;
    // let query = Tour.find(JSON.parse(queryStr));
  }

  sort() {
    // 2) SORTING
    // price can sort in plus/minus ex- ?sort=price && ?sort=-price
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      // console.log(sortBy);
      this.query = this.query.sort(sortBy);
      // sort('price ratingsAverage')
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  limitFields() {
    // 3) FIELD LIMITING
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select("-__v");
    }

    return this;
  }

  paginate() {
    // 4) PAGINATION
    const page = this.queryString.page * 1 || 1; // nice way to defining default value(string to number by multyiply 1)
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    // page=3&limit=10 // 1,10 (page1) && 11,20 (page2) && 21,30 (page3)
    this.query = this.query.skip(skip).limit(limit);

    // do not need that
    //  if (this.queryString.page) {
    //    const numTours = await Tour.countDocuments();
    //    if (skip >= numTours) throw new Error("This page doesnot exists");
    //  }

    return this;
  }
}

module.exports = APIFeatures;
