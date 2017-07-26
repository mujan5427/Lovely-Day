const error_config =
{
  client: {
    1: {
      message: 'You miss some properties'
    },
    2: {
      message: 'Some properties are empty'
    },
    3: {
      message: 'Member Id or Token is invalid'
    }
  },
  database: {
    1: {
      message: 'Didn\'t search for anything'
    }
  }
};

module.exports = error_config;
