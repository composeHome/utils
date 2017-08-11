'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _compact = _interopDefault(require('lodash/fp/compact'));
var _filter = _interopDefault(require('lodash/fp/filter'));
var _mean = _interopDefault(require('lodash/fp/mean'));
var _min = _interopDefault(require('lodash/fp/min'));
var _flatten = _interopDefault(require('lodash/fp/flatten'));
var _differenceBy = _interopDefault(require('lodash/fp/differenceBy'));
var _lowerCase = _interopDefault(require('lodash/fp/lowerCase'));
var _capitalize = _interopDefault(require('lodash/fp/capitalize'));
var _divide = _interopDefault(require('lodash/fp/divide'));
var _set = _interopDefault(require('lodash/fp/set'));
var _sortBy = _interopDefault(require('lodash/fp/sortBy'));
var _groupBy = _interopDefault(require('lodash/fp/groupBy'));
var _max = _interopDefault(require('lodash/fp/max'));
var _sum = _interopDefault(require('lodash/fp/sum'));
var _spread = _interopDefault(require('lodash/fp/spread'));
var _isPlainObject = _interopDefault(require('lodash/fp/isPlainObject'));
var _isArray = _interopDefault(require('lodash/fp/isArray'));
var _omitBy = _interopDefault(require('lodash/fp/omitBy'));
var _omit = _interopDefault(require('lodash/fp/omit'));
var _isInteger = _interopDefault(require('lodash/fp/isInteger'));
var _round = _interopDefault(require('lodash/fp/round'));
var _replace = _interopDefault(require('lodash/fp/replace'));
var _each = _interopDefault(require('lodash/fp/each'));
var _keys = _interopDefault(require('lodash/fp/keys'));
var _values = _interopDefault(require('lodash/fp/values'));
var _every = _interopDefault(require('lodash/fp/every'));
var _map = _interopDefault(require('lodash/fp/map'));
var _isEqual = _interopDefault(require('lodash/fp/isEqual'));
var _compose = _interopDefault(require('lodash/fp/compose'));
var _get = _interopDefault(require('lodash/fp/get'));
var _isNil = _interopDefault(require('lodash/isNil'));
var _isFinite = _interopDefault(require('lodash/isFinite'));
var _size = _interopDefault(require('lodash/size'));
var _minBy = _interopDefault(require('lodash/minBy'));
var _maxBy = _interopDefault(require('lodash/maxBy'));
var isEmail = _interopDefault(require('validator/lib/isEmail'));
var isURL = _interopDefault(require('validator/lib/isURL'));
var _includes = _interopDefault(require('lodash/fp/includes'));
var _negate = _interopDefault(require('lodash/fp/negate'));

var parcelLineItemRules = {
  'cj5vmxoug3eto0193ysu3twpi': { // Percolation Test
    show: _compose(_includes(_includes.placeholder, ['Perc_Test_Required']), _get('sewer'))
  },
  'cj5vn9wp03f340193qocjiy3s': { // Water Connection Fee
    show: _compose(_includes(_includes.placeholder, ['At_Lot_Line', 'At_Street']), _get('water'))
  },
  'cj5vnak7h3f3n019343witgj9': { // Well Permit
    show: _compose(_includes(_includes.placeholder, ['Needs_Well']), _get('water'))
  },
  'cj5vnb5nn3f3z0193d3yqva4p': { // Sewer Connection Fee
    show: _compose(_includes(_includes.placeholder, ['At_Lot_Line', 'At_Street']), _get('sewer'))
  },
  'cj5vnbzslg3l70161iwz0315h': { // Septic System Permit
    show: _compose(_includes(_includes.placeholder, ['Perc_Test_Required', 'Approved_For_1_Bedroom_Septic', 'Approved_For_2_Bedroom_Septic', 'Approved_For_3_Bedroom_Septic', 'Approved_For_4_Bedroom_Septic', 'Approved_For_5_Bedroom_Septic']), _get('sewer'))
  },
  'cj5vnd3e5g3lt0161qgy9my13': { // Electric Connection Fee
    show: _compose(_includes(_includes.placeholder, ['At_Street', 'At_Lot_Line']), _get('electric'))
  },
  'cj5vndiui3f5b01932g6t4gu3': { // Gas Connection Fee
    show: _compose(_includes(_includes.placeholder, ['At_Street', 'At_Lot_Line']), _get('gas'))
  },
  'cj5vne4nqg3mi016141l420fu': { // Communications Connection Fee
    show: _compose(_includes(_includes.placeholder, ['At_Street', 'At_Lot_Line']), _get('communications'))
  },
  'cj5vnkyfz3f9e01932brd0edc': { // Deconstruction / Demolition
    show: _get('hasExistingStructure')
  },
  'cj3aposh41sbp01405ze4etei': { // Excavation / Earthwork
    show: _negate(_get('hasBuildingPad'))
  },
  'cj5vnm125g3qz0161hxw8ys5g': { // Septic Installation
    show: _compose(_includes(_includes.placeholder, ['Perc_Test_Required', 'Approved_For_1_Bedroom_Septic', 'Approved_For_2_Bedroom_Septic', 'Approved_For_3_Bedroom_Septic', 'Approved_For_4_Bedroom_Septic', 'Approved_For_5_Bedroom_Septic']), _get('sewer'))
  },
  'cj5vnmjc03faf0193m9vujpsp': { // Well Installation
    show: _compose(_includes(_includes.placeholder, ['Needs_Well']), _get('water'))
  }
};

var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var getMaxMinString = function getMaxMinString(plans, attr) {
  return _minBy(plans, attr) === _maxBy(plans, attr) ? plans[0][attr] : _minBy(plans, attr)[attr] + ' - ' + _maxBy(plans, attr)[attr];
};

var getRangeString = function getRangeString(max, min, prefix) {
  return max === min ? '' + (prefix ? prefix : '') + max.toLocaleString() : '' + (prefix ? prefix : '') + min.toLocaleString() + ' - ' + (prefix ? prefix : '') + max.toLocaleString();
};

var getMinPrice = function getMinPrice(model, variants) {
  return _get('offers[0].price', _minBy([model].concat(toConsumableArray(variants)), function (model) {
    return _get('offers[0].price', model);
  }));
};
var getMaxPrice = function getMaxPrice(model, variants) {
  return _get('offers[0].price', _maxBy([model].concat(toConsumableArray(variants)), function (model) {
    return _get('offers[0].price', model);
  }));
};

var getOfferMeta = function getOfferMeta(model, variants) {
  return getMinPrice(model, variants) === getMaxPrice(model, variants) ? {
    "@type": "Offer",
    "price": getMinPrice(model, variants)
  } : {
    "@type": "AggregateOffer",
    "lowPrice": getMinPrice(model, variants),
    "highPrice": getMaxPrice(model, variants)
  };
};

var isShallowEqual = _compose(_spread(_isEqual), _map(_omitBy(_isPlainObject)), _map(_omitBy(function (value) {
  return _isArray(value) && _isPlainObject(value[0]);
})), _map(_omit('id')));

var convertMarkupToPlainText = function convertMarkupToPlainText(markup) {
  var tmp = document.createElement('DIV');
  tmp.innerHTML = markup;
  return tmp.textContent || tmp.innerText || '';
};

var calculatePriceFromOffers = function calculatePriceFromOffers(level) {
  return _compose(_sum, _map(_compose(level === 'min' ? _min : level === 'max' ? _max : _mean, _map(_get('price')))), _groupBy(_get('lineItems')), _map(function (offer) {
    return _set('lineItems', _compose(_sortBy(function (id) {
      return id;
    }), _map(_get('id')), _get('lineItems'))(offer), offer);
  }));
};

var getExcludedLineItems = function getExcludedLineItems(model, allLineItems) {
  return _compose(_filter(function (lineItem) {
    return lineItem.category !== 'Extras';
  }), _differenceBy('id', allLineItems), _flatten, _map(_get('lineItems')), _get('offers'))(model);
};

var getProjectServices = function getProjectServices(Model, Parcel, allLineItems) {
  return _compose(_sortBy('position'), _filter(function (service) {
    return parcelLineItemRules[service.id] ? parcelLineItemRules[service.id].show(Parcel) : true;
  }))(getExcludedLineItems(Model, allLineItems));
};

var calculateProjectPrice = function calculateProjectPrice(level) {
  return function (Model, Parcel, allLineItems) {
    return _compose(_sum, _compact)([_compose(calculatePriceFromOffers(level), _get('offers'))(Model), _get('price', Parcel), _compose(_sum, _map(function (lineItem) {
      return level === 'min' ? _get('minPrice', lineItem) : level === 'max' ? _get('maxPrice', lineItem) : _mean([_get('minPrice', lineItem), _get('maxPrice', lineItem)]);
    }))(getProjectServices(Model, Parcel, allLineItems))]);
  };
};

var formatLocaleString = function formatLocaleString(number) {
  return number && number.toLocaleString();
};

var formatDateTimeString = function formatDateTimeString(utcString) {
  return utcString && new Date(utcString).toLocaleString();
};

var convertToAcres = function convertToAcres(value) {
  return value && _divide(value, 43560);
};

var roundTo = function roundTo(precision) {
  return function (value) {
    return typeof value === 'number' && value.toFixed(precision);
  };
};

var formatArea = function formatArea(sqft) {
  return typeof sqft === 'number' && sqft >= 10000 ? { value: _compose(formatLocaleString, roundTo(2), convertToAcres)(sqft), label: 'acres' } : { value: formatLocaleString(sqft), label: 'sqft' };
};

var convertToLetter = function convertToLetter(idx) {
  return String.fromCharCode(97 + idx).toUpperCase();
};

var formatEnum = _compose(_capitalize, _lowerCase);

var formatUrl = function formatUrl(url) {
  return url && url.indexOf('://') === -1 ? 'http://' + url : url;
};
var getHostname = _compose(_get('hostname'), function (url) {
  return url && new URL(url);
}, formatUrl);

var isNotEmpty = function isNotEmpty(a) {
  return !!a && a.trim().length > 0;
};

var markupIsNotEmpty = function markupIsNotEmpty(a) {
  return a.getEditorState().getCurrentContent().hasText();
};

var sort = function sort(list) {
  return [].concat(list).sort();
};

var isLocation = function isLocation(a) {
  return _compose(_isEqual(['description', 'placeId']), sort, _keys)(a) && _compose(_every(Boolean), _values)(a);
};

var hasFields = function hasFields(fields) {
  return _compose(_isEqual(fields), _keys);
};

var eachItemHasFields = function eachItemHasFields(fields) {
  return _compose(_map, hasFields)(fields);
};

var fieldsAreNonNil = _each(function (field) {
  return !_isNil(field);
});

var eachItemHasNonNilFields = _compose(_map, fieldsAreNonNil);

var isNumber = _isFinite;

var hasLength = function hasLength(value) {
  return _size(value) > 0;
};

var convertToNumberString = function convertToNumberString(number) {
  return isNumber(number) ? number.toLocaleString('en-US') : null;
};

var convertToCurrency = function convertToCurrency(number) {
  return isNumber(number) ? '$' + convertToNumberString(number) : null;
};

var getValue = _get(['target', 'value']);

var getFloat = _compose(parseFloat, getValue);

var getNumberFromNumberString = _compose(parseFloat, _replace(',', ''), getValue);

var getCurrency = _compose(parseFloat, _replace('$', ''), _replace(',', ''), getValue);

// Redux form validation
var required = function required(value) {
  return value ? undefined : 'required';
};

var location = function location(value) {
  return !value || value && value.placeId ? undefined : 'must be valid place';
};

var email = function email(value) {
  return value && isEmail(value) ? undefined : 'must be valid email';
};

var length = function length(value) {
  return _size(value) > 0 ? undefined : 'must have at least one';
};

var number = function number(value) {
  return _isFinite(value) ? undefined : 'must be valid number';
};

var integer = function integer(value) {
  return _isInteger(value) ? undefined : 'must be a whole number';
};

var phoneNumber = function phoneNumber(value) {
  return _size(value) === 10 && number(value) ? undefined : 'must be valid phone number';
};

var url = function url(value) {
  return value && isURL(value) ? undefined : 'must be valid url';
};

// Redux form format and parse
var parseNumber = _compose(parseFloat, _replace(/,/g, ''));
var formatNumber = function formatNumber(number) {
  return isNumber(number) ? convertToNumberString(number) : '';
};

var parseCurrency = _compose(parseFloat, _replace(/\$/g, ''), _replace(/,/g, ''));
var formatCurrency = function formatCurrency(number) {
  return isNumber(number) ? '$' + _compose(convertToNumberString, _round)(number) : '';
};

var parsePhoneNumber = _replace(/\D/g, '');
var formatPhoneNumber = function formatPhoneNumber(value) {
  return value ? value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : '';
};

exports.getMaxMinString = getMaxMinString;
exports.getRangeString = getRangeString;
exports.getMinPrice = getMinPrice;
exports.getMaxPrice = getMaxPrice;
exports.getOfferMeta = getOfferMeta;
exports.isShallowEqual = isShallowEqual;
exports.convertMarkupToPlainText = convertMarkupToPlainText;
exports.calculatePriceFromOffers = calculatePriceFromOffers;
exports.getExcludedLineItems = getExcludedLineItems;
exports.getProjectServices = getProjectServices;
exports.calculateProjectPrice = calculateProjectPrice;
exports.formatLocaleString = formatLocaleString;
exports.formatDateTimeString = formatDateTimeString;
exports.formatArea = formatArea;
exports.convertToLetter = convertToLetter;
exports.formatEnum = formatEnum;
exports.formatUrl = formatUrl;
exports.getHostname = getHostname;
exports.isNotEmpty = isNotEmpty;
exports.markupIsNotEmpty = markupIsNotEmpty;
exports.isLocation = isLocation;
exports.eachItemHasFields = eachItemHasFields;
exports.eachItemHasNonNilFields = eachItemHasNonNilFields;
exports.isNumber = isNumber;
exports.hasLength = hasLength;
exports.convertToNumberString = convertToNumberString;
exports.convertToCurrency = convertToCurrency;
exports.getValue = getValue;
exports.getFloat = getFloat;
exports.getNumberFromNumberString = getNumberFromNumberString;
exports.getCurrency = getCurrency;
exports.required = required;
exports.location = location;
exports.email = email;
exports.length = length;
exports.number = number;
exports.integer = integer;
exports.phoneNumber = phoneNumber;
exports.url = url;
exports.parseNumber = parseNumber;
exports.formatNumber = formatNumber;
exports.parseCurrency = parseCurrency;
exports.formatCurrency = formatCurrency;
exports.parsePhoneNumber = parsePhoneNumber;
exports.formatPhoneNumber = formatPhoneNumber;
