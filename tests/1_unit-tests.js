const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function() {
  test('Should correctly read a whole number input.', function() {
    assert.equal(convertHandler.getNum("5gal"), 5, "Should correctly read a whole number input.")
  })
  
  test('Should correctly read a decimal number input.', function() {
    assert.equal(convertHandler.getNum("5.3gal"), 5.3, "Should correctly read a decimal number input.")
  })
  
  test('Should correctly read a fractional input.', function() {
    assert.equal(convertHandler.getNum("5/2gal"), 2.5, "Should correctly read a fractional input.")
  })
  
  test('Should correctly read a fractional input with a decimal.', function() {
    assert.equal(convertHandler.getNum("5/2.5gal"), 2, "Should correctly read a fractional input with a decimal.")
  })
  
  test('Should correctly return an error on a double-fraction (i.e. 3/2/3).', function() {
    assert.equal(convertHandler.getNum("5/5/5gal"), 'invalid number', "Should correctly return an error on a double-fraction (i.e. 3/2/3).")
  })
  
  test(' Should correctly default to a numerical input of 1 when no numerical input is provided.', function() {
    assert.equal(convertHandler.getNum("gal"), 1, "Should correctly default to a numerical input of 1 when no numerical input is provided.")
  })
  
  test('Should correctly read each valid input unit.', function() {
    assert.equal(convertHandler.getUnit("5GAL"), "gal", "gal")
    assert.equal(convertHandler.getUnit("5gal"), "gal", "gal")
    
    assert.equal(convertHandler.getUnit("5LBS"), "lbs", "lbs")
    assert.equal(convertHandler.getUnit("5lbs"), "lbs", "lbs")
    
    assert.equal(convertHandler.getUnit("5MI"), "mi", "mi")
    assert.equal(convertHandler.getUnit("5mi"), "mi", "mi")
    
    assert.equal(convertHandler.getUnit("5l"), "L", "L")
    assert.equal(convertHandler.getUnit("5L"), "L", "L")
    
    assert.equal(convertHandler.getUnit("5KM"), "km", "km")
    assert.equal(convertHandler.getUnit("5km"), "km", "km")
    
    assert.equal(convertHandler.getUnit("5KG"), "kg", "kg")
    assert.equal(convertHandler.getUnit("5kg"), "kg", "kg")
  })
  
  test('Should correctly return an error for an invalid input unit.', function() {
    assert.equal(convertHandler.getUnit("5gallons"), "invalid unit", "Should correctly return an error for an invalid input unit.")
  })
  
  test('Should return the correct return unit for each valid input unit.', function() {
    assert.equal(convertHandler.getReturnUnit("gal"), "L", "L")
    assert.equal(convertHandler.getReturnUnit("lbs"), "kg", "kg")
    assert.equal(convertHandler.getReturnUnit("mi"), "km", "km")
    assert.equal(convertHandler.getReturnUnit("L"), "gal", "gal")
    assert.equal(convertHandler.getReturnUnit("km"), "mi", "mi")
    assert.equal(convertHandler.getReturnUnit("kg"), "lbs", "lbs")
  })
  
  test('Should correctly return the spelled-out string unit for each valid input unit.', function() {
    assert.equal(convertHandler.spellOutUnit("gal"), "gallons", "gallons")
    assert.equal(convertHandler.spellOutUnit("lbs"), "pounds", "pounds")
    assert.equal(convertHandler.spellOutUnit("mi"), "miles", "miles")
    assert.equal(convertHandler.spellOutUnit("L"), "liters", "liters")
    assert.equal(convertHandler.spellOutUnit("km"), "kilometers", "kilometers")
    assert.equal(convertHandler.spellOutUnit("kg"), "kilograms", "kilograms")
  })
  
  test('Should correctly convert gal to L.', function() {
    assert.approximately(convertHandler.convert(1, "gal"), 3.78541, .0001, "Should correctly convert gal to L.")
  })
  test('Should correctly convert L to gal.', function() {
    assert.approximately(convertHandler.convert(1, "L"), 0.26417, .0001, "Should correctly convert L to gal.")
  })
  test('Should correctly convert mi to km.', function() {
    assert.approximately(convertHandler.convert(1, "mi"), 1.60934, .0001, "Should correctly convert mi to km.")
  })
  test('Should correctly convert km to mi.', function() {
    assert.approximately(convertHandler.convert(1, "km"), 0.62137, .0001, "Should correctly convert km to mi.")
  })
  test('Should correctly convert lbs to kg.', function() {
    assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, .0001, "Should correctly convert lbs to kg.")
  })
  test('Should correctly convert kg to lbs.', function() {
    assert.approximately(convertHandler.convert(1, "kg"), 2.20462, .0001, "Should correctly convert kg to lbs.")
  })
});