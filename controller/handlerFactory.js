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