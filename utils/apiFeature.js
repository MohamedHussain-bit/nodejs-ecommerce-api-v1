class ApiFeatures {
    constructor(mongooseQuery , queryStrig){
        this.mongooseQuery = mongooseQuery;
        this.queryStrig = queryStrig;
    }
    filter(){
        const queryStringObj = {...this.queryStrig};
        const excludesFields = ['page' , 'limit' , 'sort'];
        excludesFields.forEach((fild) => delete queryStringObj[fild]);
        let queryString = JSON.stringify(queryStringObj);
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g , (match) => {
        `$${match}`
        });
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryString));
        return this;
    };

    sort(){
        if(this.queryStrig.sort){
            const sortBy = this.queryStrig.sort.split(',').join(' ')
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        }else {
            this.mongooseQuery = this.mongooseQuery.sort('-createdAt')
        };
        return this;
    };

    limitFildes(){
        if(this.queryStrig.filds){
            const filds = this.queryStrig.filds.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(filds);
        }else{
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        };
        return this;
    };

    search(){
        if(this.queryStrig.keyWord){
            const query = {};
            query.$or = [
                {title : {$regex : this.queryStrig.keyWord , $options : 'i'}},
                {description : {$regex : this.queryStrig.keyWord , $options : 'i'}}
            ]
            this.mongooseQuery = this.mongooseQuery.find(query);
        };
        return this;
    };

    paginate(){
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 5;
        const skip = (page - 1) * limit;

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        return this;
    };
};

module.exports = ApiFeatures;