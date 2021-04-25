// Pull data from the inputdata.txt local file & splits each line into a separate entry in an array (31 characters per row)
const fs = require('fs');
const data = fs.readFileSync('inputdata.txt', 'utf8');;

// IIFE that returns the passport data as single entries
const passports = (function(){
  // Replaces empty lines with the word "TEST"
  const replaceEmptyLines = data.replace(/\n\n/ig, 'TEST');
  // Replaces line breaks with an empty space
  const removeLines = replaceEmptyLines.replace(/\n/ig, ' ');
  // Splits the data by the word "TEST"
  const passports = removeLines.split('TEST');
  return passports;
})();

// IIFE that breaks each passport into smaller parts and checks if they contain the required entry values
const checkPassports = (function(){
  // Variable that will update the count total with each valid passport
  let validPassportCount = 0;

  // Loop through all the passports
  for(let i = 0; i < passports.length; i++){
    const currentPassport = passports[i];
    // Splits each passport into separate entries by empty spaces
    const entries = currentPassport.split(' ');
    // splits each entry by the colon and only takes the first part of that value to get only the keys from the key:value pairs
    const keys = entries.map(input => input.split(':')[0]);

    // Checks the keys for each passport to ensure that they contain all required entries and increases the validPassportCount count if they do
    if (keys.includes('byr') && keys.includes('iyr') && keys.includes('eyr') && keys.includes('hgt') && keys.includes('hcl') && keys.includes('ecl') && keys.includes('pid')){
      validPassportCount++;
    }
  }
  // Expected output: 260
  console.log(validPassportCount);
})();