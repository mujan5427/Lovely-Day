exports.analysisErrorObject = function (errorObject, res) {
  if (errorObject.type !== 'database') {
    res.status(400);
    res.json(errorObject.message);

  } else {
    res.status(500).end();
  }
};
