/***
 * Transform format of `price` to decimal currency format with commas.
 *
 * @param  {Number} price
 *
 * @return {String}
 */
export function getDecimalCurrencyFormat(price) {
  var result;

  result = price.toLocaleString('en-US');

  if(result.search('.') !== -1) {
    result = result.split('.');
    result = result[0];
  }

  return result;
};
