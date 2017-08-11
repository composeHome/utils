import { compose, get, negate, includes, default as _fp } from 'lodash/fp'

export default {
  'cj5vmxoug3eto0193ysu3twpi': { // Percolation Test
    show: compose(
      includes(_fp, [
        'Perc_Test_Required'
      ]),
      get('sewer')
    )
  },
  'cj5vn9wp03f340193qocjiy3s': { // Water Connection Fee
    show: compose(
      includes(_fp, [
        'At_Lot_Line',
        'At_Street'
      ]),
      get('water')
    )
  },
  'cj5vnak7h3f3n019343witgj9': { // Well Permit
    show: compose(
      includes(_fp, [
        'Needs_Well'
      ]),
      get('water')
    )
  },
  'cj5vnb5nn3f3z0193d3yqva4p': { // Sewer Connection Fee
    show: compose(
      includes(_fp, [
        'At_Lot_Line',
        'At_Street'
      ]),
      get('sewer')
    )
  },
  'cj5vnbzslg3l70161iwz0315h': { // Septic System Permit
    show: compose(
      includes(_fp, [
        'Perc_Test_Required',
        'Approved_For_1_Bedroom_Septic',
        'Approved_For_2_Bedroom_Septic',
        'Approved_For_3_Bedroom_Septic',
        'Approved_For_4_Bedroom_Septic',
        'Approved_For_5_Bedroom_Septic'
      ]),
      get('sewer')
    )
  },
  'cj5vnd3e5g3lt0161qgy9my13': { // Electric Connection Fee
    show: compose(
      includes(_fp, [
        'At_Street',
        'At_Lot_Line'
      ]),
      get('electric')
    )
  },
  'cj5vndiui3f5b01932g6t4gu3': { // Gas Connection Fee
    show: compose(
      includes(_fp, [
        'At_Street',
        'At_Lot_Line'
      ]),
      get('gas')
    )
  },
  'cj5vne4nqg3mi016141l420fu': { // Communications Connection Fee
    show: compose(
      includes(_fp, [
        'At_Street',
        'At_Lot_Line'
      ]),
      get('communications')
    )
  },
  'cj5vnkyfz3f9e01932brd0edc': { // Deconstruction / Demolition
    show: get('hasExistingStructure')
  },
  'cj3aposh41sbp01405ze4etei': { // Excavation / Earthwork
    show: negate(get('hasBuildingPad'))
  },
  'cj5vnm125g3qz0161hxw8ys5g': { // Septic Installation
    show: compose(
      includes(_fp, [
        'Perc_Test_Required',
        'Approved_For_1_Bedroom_Septic',
        'Approved_For_2_Bedroom_Septic',
        'Approved_For_3_Bedroom_Septic',
        'Approved_For_4_Bedroom_Septic',
        'Approved_For_5_Bedroom_Septic'
      ]),
      get('sewer')
    )
  },
  'cj5vnmjc03faf0193m9vujpsp': { // Well Installation
    show: compose(
      includes(_fp, [
        'Needs_Well'
      ]),
      get('water')
    )
  },
}
