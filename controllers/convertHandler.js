function ConvertHandler() {

  const validUnits = ["gal", "lbs", "mi", "L", "kg", "km"]

  this.getNum = function(input) {

    let inputC = `${input}`
    inputC = inputC.replace(/[a-zA-Z]/g, '')
    if (inputC.length === 0) { return 1 }
    let result = inputC.match(/^(\d)?(\.{0,1}\d+)?(\/(\d)+(\.{0,1}\d+)?)?$/);

    if (!result) { return "invalid number" }

    return eval(result[0]);
  };

  this.getUnit = function(input) {
    let result = input.match(/[a-zA-Z]+$/)[0].toLowerCase();
    if (result === 'l') { return 'L' }

    if (validUnits.some((v) => v == result)) {
      return result;
    }
    return "invalid unit"
  };

  this.getReturnUnit = function(initUnit) {

    let initUnitC = `${initUnit}`.toLowerCase()

    switch (initUnitC) {
      case 'gal': return 'L';
      case 'lbs': return 'kg';
      case 'mi': return 'km';
      case 'l': return 'gal';
      case 'kg': return 'lbs';
      case 'km': return 'mi';
    }
  };

  this.spellOutUnit = function(unit) {
    let unitC = `${unit}`.toLowerCase()

    switch (unitC) {
      case 'gal': return 'gallons';
      case 'lbs': return 'pounds';
      case 'mi': return 'miles';
      case 'l': return 'liters';
      case 'kg': return 'kilograms';
      case 'km': return 'kilometers';
    }
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    let initUnitC = `${initUnit}`.toLowerCase()
    switch (initUnitC) {
      case 'gal': return (initNum * galToL).toFixed(5) * 1;
      case 'lbs': return (initNum * lbsToKg).toFixed(5) * 1;
      case 'mi': return (initNum * miToKm).toFixed(5) * 1;
      case 'l': return (initNum / galToL).toFixed(5) * 1;
      case 'kg': return (initNum / lbsToKg).toFixed(5) * 1;
      case 'km': return (initNum / miToKm).toFixed(5) * 1;
    }
  };

  this.getError = function(initNum, initUnit) {
    if (initNum === "invalid number" && initUnit == "invalid unit") { throw 'invalid number and unit' }
    if (initNum === "invalid number") { throw 'invalid number' }
    if (initUnit === "invalid unit") { throw 'invalid unit' }
    
  }

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {

    const spellInitUnit = this.spellOutUnit(initUnit)
    const spellreturnUnit = this.spellOutUnit(returnUnit)
    
    
    let result = `${initNum} ${spellInitUnit} converts to ${returnNum} ${spellreturnUnit}`;

    return result;
  };

  this.handleInput = function(input) {
    const initNum = this.getNum(input)
    const initUnit = this.getUnit(input)

    this.getError(initNum, initUnit)

    const returnNum = this.convert(initNum, initUnit)
    const returnUnit = this.getReturnUnit(initUnit)
    const string = this.getString(initNum, initUnit, returnNum, returnUnit)

    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string
    }
  }

}

module.exports = ConvertHandler;
