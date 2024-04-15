class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }


  filter() {
    const queryCopy = { ...this.queryStr };

    // removing some fields for category
    const removeFields = ["keyword", "page", "limit" , "sort"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter for price and rating -->

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPge) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPge * (currentPage - 1);
    this.query = this.query.limit(resultPerPge).skip(skip);
    return this;
  }  
}
module.exports = ApiFeatures;