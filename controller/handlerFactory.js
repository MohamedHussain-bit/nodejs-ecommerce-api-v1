const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeature');


exports.deleteOne = (Model) => asyncHandler( async (req , res , next) => {
    const {id} = req.params;
    const document = await Model.findByIdAndDelete({_id : id});
    if(!document){
        return next(new ApiError(`Document with this id not found` , 404));
    };
    return res.status(200).json({Message : `Document for this id deleted successfully`});
    });

exports.updateOne = (Model) => asyncHandler( async (req , res , next) => {
    const document = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new : true}
    );
    if(!document){
        return next(new ApiError(`Document for this id ${req.params.id} not found` , 404));
    };
    return res.status(200).json({data : document});
});

exports.createOne = (Model) => asyncHandler( async (req , res) => {
    const document = await Model.create(req.body);
    return res.status(201).json({data : document});
});

exports.getOne = (Model) => asyncHandler( async (req , res , next) => {
    const {id} = req.params;
    const document = await Model.findById(id);
    if(!document){
        return next(new ApiError(`Document for this id ${id} not found` , 404));
    };
    return res.status(200).json({data : document});
});

exports.getList = (Model , modelName = '') => asyncHandler( async (req , res) => {
    let filter = {};
    if(req.filterObj){
        filter = req.filterObj
    };
    const documentCounts = await Model.countDocuments()
    const apiFeatures = new ApiFeatures(Model.find(filter) , req.query)
        .paginate(documentCounts)
        .filter()
        .limitFildes()
        .search(modelName)
        .sort()

    const {paginationResult , mongooseQuery} = apiFeatures;
    const document = await mongooseQuery;
    return res.status(200).json({results : document.length, paginationResult , data : document});
});