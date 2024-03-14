const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');

// Delete
exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No SubCategory for this id ${id}`, 404));
    }
    res.status(201).send();
  });

// Update
exports.updateOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(new ApiError(`No brand for this id ${req.params.id}`, 404));
    }

    res.status(201).json({ data: document });
  });

// Create
exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({ data: newDoc });
  });

// get

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await Model.findById(id);

    if (!document) {
      return next(new ApiError(`No brand for this id ${id}`, 404));
    }

    res.status(201).json({ results: document.length, data: document });
  });

// Get All

exports.getAll = (Model, modelname = '') =>
  asyncHandler(async (req, res) => {
    let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }

    const documentsCounts = await Model.countDocuments();
    const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
      .paginate(documentsCounts)
      .filter()
      .search(modelname)
      .limitFields()
      .sort();

    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
  });
