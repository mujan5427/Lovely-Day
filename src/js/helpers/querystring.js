export function getSpecifiedPropertyOfQuerystring(querystringData, type) {
  return querystringData.hasOwnProperty(type) ? querystringData[type] : undefined;
};

export function isLegal(querystringData, type) {
  var validateResult;

  if(!isEmpty(querystringData) && Array.isArray(querystringData)) {
    switch(type) {
      case 'region':
        validateResult = querystringData.map(item => checkRegion(item));
        break;

      case 'category':
        validateResult = querystringData.map(item => checkCategory(item));
        break;

      default:
        break;
    }

    if(validateResult.indexOf(false) === -1) {
      return true;
    } else {
      return false;
    }

  } else if (!isEmpty(querystringData)) {
    switch(type) {
      case 'region':
        validateResult = checkRegion(querystringData.toString());
        break;

      case 'category':
        validateResult = checkCategory(querystringData.toString());
        break;

      default:
        break;
    }

    if(validateResult !== true) {
      return false;
    } else {
      return true;
    }

  } else {
    return undefined;
  }

};

function checkRegion(item) {
  const REGION_LIST = ['1', '2', '3', '4', '5', '6', '7', '8'];

  if(REGION_LIST.indexOf(item) === -1) {
    return false;
  }

  return true;
}

function checkCategory(item) {
  const CATEGORY_LIST = ['outdoor', 'summercamp', 'handmade', 'baking' ,'playwithchild', 'group', 'lover'];

  if(CATEGORY_LIST.indexOf(item) === -1) {
    return false;
  }

  return true;
}
