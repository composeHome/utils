import { maxBy, minBy, size, isFinite, isNil } from 'lodash'
import { get, compose, isEqual, map, every, values, keys, each, replace, round, isInteger, omit, omitBy, isArray, isPlainObject, spread, sum, max, groupBy, sortBy, set, divide, capitalize, lowerCase, differenceBy, flatten, min, mean, filter, compact } from 'lodash/fp'
import isEmail from 'validator/lib/isEmail'
import isURL from 'validator/lib/isURL'
import parcelLineItemRules from './parcelLineItemRules'

export const getMaxMinString = (plans, attr) => minBy(plans, attr) === maxBy(plans, attr)
  ? plans[0][attr]
  : `${minBy(plans, attr)[attr]} - ${maxBy(plans, attr)[attr]}`

export const getRangeString = (max, min, prefix) => max === min
  ? `${prefix ? prefix : ''}${max.toLocaleString()}`
  : `${prefix ? prefix : ''}${min.toLocaleString()} - ${prefix ? prefix : ''}${max.toLocaleString()}`

export const getMinPrice = (model, variants) => get('offers[0].price', minBy([model, ...variants], model => get('offers[0].price', model)))
export const getMaxPrice = (model, variants) => get('offers[0].price', maxBy([model, ...variants], model => get('offers[0].price', model)))

export const getOfferMeta = (model, variants) => getMinPrice(model, variants) === getMaxPrice(model, variants) ? ({
  "@type": "Offer",
  "price": getMinPrice(model, variants)
}) : ({
  "@type": "AggregateOffer",
  "lowPrice": getMinPrice(model, variants),
  "highPrice": getMaxPrice(model, variants)
})

export const isShallowEqual = compose(
  spread(isEqual),
  map(omitBy(isPlainObject)),
  map(omitBy(value => isArray(value) && isPlainObject(value[0]))),
  map(omit('id'))
)

export const convertMarkupToPlainText = (markup) => {
  var tmp = document.createElement('DIV')
  tmp.innerHTML = markup
  return tmp.textContent || tmp.innerText || ''
}

export const calculatePriceFromOffers = level => compose(
  sum,
  map(compose(
    (level === 'min' ? min : level === 'max' ? max : mean),
    map(get('price'))
  )),
  groupBy(get('lineItems')),
  map(offer => set('lineItems', compose(
    sortBy(id => id),
    map(get('id')),
    get('lineItems')
  )(offer), offer))
)

export const getExcludedLineItems = (model, allLineItems) => compose(
  filter(lineItem => lineItem.category !== 'Extras'),
  differenceBy('id', allLineItems),
  flatten,
  map(get('lineItems')),
  get('offers')
)(model)

export const getProjectServices = (Model, Parcel, allLineItems) => compose(
  sortBy('position'),
  filter(service => parcelLineItemRules[service.id]
    ? parcelLineItemRules[service.id].show(Parcel)
    : true
  )
)(getExcludedLineItems(Model, allLineItems))

export const calculateProjectPrice = level => (Model, Parcel, allLineItems) => compose(
  sum,
  compact
)([
  compose(calculatePriceFromOffers(level), get('offers'))(Model),
  get('price', Parcel),
  compose(
    sum, 
    map(lineItem => level === 'min'
      ? get('minPrice', lineItem) 
      : level === 'max'
        ? get('maxPrice', lineItem)
        : mean([get('minPrice', lineItem), get('maxPrice', lineItem)])
    )
  )(getProjectServices(Model, Parcel, allLineItems))
])

export const formatLocaleString = number => number && number.toLocaleString()

export const formatDateTimeString = utcString => utcString && new Date(utcString).toLocaleString()

const convertToAcres = value => value && divide(value, 43560)

const roundTo = precision => value => typeof value === 'number' && value.toFixed(precision)

export const formatArea = sqft => typeof sqft === 'number' && sqft >= 10000 ? ({ value: compose(formatLocaleString, roundTo(2), convertToAcres)(sqft), label: 'acres'}) : ({ value: formatLocaleString(sqft), label: 'sqft' })

export const convertToLetter = idx => String.fromCharCode(97 + idx).toUpperCase()

export const formatEnum = compose(capitalize, lowerCase)

export const formatUrl = url => url && (url.indexOf('://') === -1) ? `http://${url}` : url
export const getHostname = compose(get('hostname'), url => url && new URL(url), formatUrl)


export const isNotEmpty = a => !!a && a.trim().length > 0

export const markupIsNotEmpty = a => a.getEditorState().getCurrentContent().hasText()


const sort = list => [].concat(list).sort()

export const isLocation = a => compose(isEqual(['description', 'placeId']), sort, keys)(a) && compose(every(Boolean), values)(a)

const hasFields = fields => compose(isEqual(fields), keys)

export const eachItemHasFields = fields => compose(map, hasFields)(fields)

const fieldsAreNonNil = each(field => !isNil(field))

export const eachItemHasNonNilFields = compose(map, fieldsAreNonNil)

export const isNumber = isFinite

export const hasLength = value => size(value) > 0

export const convertToNumberString = number => isNumber(number) ? number.toLocaleString('en-US') : null

export const convertToCurrency = number => isNumber(number) ? `$${convertToNumberString(number)}` : null


export const getValue = get(['target', 'value'])

export const getFloat = compose(parseFloat, getValue)

export const getNumberFromNumberString = compose(parseFloat, replace(',', ''), getValue)

export const getCurrency = compose(parseFloat, replace('$', ''), replace(',', ''), getValue)

// Redux form validation
export const required = value => (value ? undefined : 'required')

export const location = value => !value || (value && value.placeId) ? undefined : 'must be valid place'

export const email = value => value && isEmail(value) ? undefined : 'must be valid email'

export const length = value => size(value) > 0 ? undefined : 'must have at least one'

export const number = value => isFinite(value) ? undefined : 'must be valid number'

export const integer = value => isInteger(value) ? undefined : 'must be a whole number'

export const phoneNumber = value => size(value) === 10 && number(value) ? undefined : 'must be valid phone number'

export const url = value => value && isURL(value) ? undefined : 'must be valid url'


// Redux form format and parse
export const parseNumber = compose(parseFloat, replace(/,/g, ''))
export const formatNumber = number => isNumber(number) ? convertToNumberString(number) : ''

export const parseCurrency = compose(parseFloat, replace(/\$/g, ''), replace(/,/g, ''))
export const formatCurrency = number => isNumber(number) ? `$${compose(convertToNumberString, round)(number)}` : ''

export const parsePhoneNumber = replace(/\D/g, '')
export const formatPhoneNumber = value => value ? value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : ''
