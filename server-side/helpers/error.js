exports.analysisErrorObject = function (errorObject, res) {
  if (errorObject.type !== 'database') {
    res.status(400);
    res.json({status: 'error', message: errorObject.message});

  } else {
    res.status(500).end();
  }
};
