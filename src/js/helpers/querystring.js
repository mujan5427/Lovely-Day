export function getSpecifiedPropertyOfQuerystring(querystringData, type) {
  var querystringArrayContainer = [];

  if(querystringData.hasOwnProperty(type)) {
    if(Array.isArray(querystringData[type])) {
      querystringArrayContainer = querystringData[type];

      // extracting array of fixed length
      switch(type) {
        case 'region':
          querystringArrayContainer = querystringArrayContainer.map((item, index) => {
            if(index < 8) {
              return item;
            }
          });
          break;

        case 'category':
          querystringArrayContainer = querystringArrayContainer.map((item, index) => {
            if(index < 7) {
              return item;
            }
          });
          break;

        default:
          return undefined;
      }

      return isLegal(querystringArrayContainer, type);

    } else {
      querystringArrayContainer = querystringArrayContainer.concat(querystringData[type]);

      return isLegal(querystringArrayContainer, type);
    }

  } else {
    return undefined;
  }
};

export function isLegal(querystringData, type) {
  var validateResult;

  if(!isEmpty(querystringData) && Array.isArray(querystringData)) {
    switch(type) {
      case 'region':
        validateResult = querystringData.filter(checkRegion);
        break;

      case 'category':
        validateResult = querystringData.filter(checkCategory);
        break;

      default:
        break;
    }

    return !isEmpty(validateResult) ? validateResult : undefined;

  } else {
    return undefined;
  }

};

function checkRegion(item) {
  const REGION_LIST = ['1', '2', '3', '4', '5', '6', '7', '8'];

  if(REGION_LIST.indexOf(item) !== -1) {
    return true;
  }

  return false;
}

function checkCategory(item) {
  const CATEGORY_LIST = ['1', '2', '3', '4' ,'5', '6', '7'];

  if(CATEGORY_LIST.indexOf(item) !== -1) {
    return true;
  }

  return false;
}
