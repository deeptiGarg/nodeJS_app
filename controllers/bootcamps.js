// Methods for logic (get from DB, create a JSON type response)

const Bootcamp = require('../models/Bootcamp');

// @desc        Get all bootcamps
// @route       GET /api/v1/bootcamps
// @access      public (no token needed, i.e. no authentication)
exports.getBootCamps = async (req, res, next) => {
  try {
    const all_bootcamps = await Bootcamp.find();
    res.status(200).json({
      success: true,
      msg: 'Show all bootcamps',
      data: all_bootcamps // req.hello can be accessed here
    });
  } catch (err) {
    //res.status(400).json({ success: false, msg: 'Error occurred' });
    next(err); // Pass it to the next controller method
  }
};

// @desc        Get a bootcamp
// @route       GET /api/v1/bootcamps/:id
// @access      public (no token needed, i.e. no authentication)
exports.getBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findById(req.params.id);
    console.log(bootcamp);
    if (!bootcamp) {
      return res.status(404).json({ success: false, msg: 'Error occurred' });
    }
    res.status(200).json({
      success: true,
      msg: `Show bootcamp ${req.params.id}`,
      data: bootcamp
    });
  } catch (err) {
    //res.status(400).json({ success: false, msg: 'Error occurred' });
    next(err); // Pass it to the next controller method
  }
};

// @desc        Create new bootcamp
// @route       POST /api/v1/bootcamps/:id
// @access      private (token needed, i.e. authentication needed; need to be logged in )
exports.createBootCamp = async (req, res, next) => {
  //console.log(req.body);
  try {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({
      success: true,
      msg: `Created bootcamp with id: ${bootcamp._id}`
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: 'Error occurred' });
  }
};

// @desc        Update a bootcamp
// @route       PUT /api/v1/bootcamps/:id
// @access      private (token needed, i.e. authentication needed; need to be logged in )
exports.updateBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    console.log(bootcamp);

    if (!bootcamp) {
      return res.status(404).json({ success: false, msg: 'Error occurred' });
    }
    res.status(200).json({
      success: true,
      msg: `Updated bootcamp ${req.params.id}`,
      data: bootcamp
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: 'Error occurred' });
  }
};

// @desc        Delete a bootcamp
// @route       DELETE /api/v1/bootcamps/:id
// @access      private (token needed, i.e. authentication needed; need to be logged in )
exports.deleteBootCamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);

    if (!bootcamp) {
      return res.status(404).json({ success: false, msg: 'Error occurred' });
    }
    res.status(200).json({
      success: true,
      msg: `Deleted bootcamp ${req.params.id}`,
      data: null
    });
  } catch (err) {
    res.status(400).json({ success: false, msg: 'Error occurred' });
  }
};
