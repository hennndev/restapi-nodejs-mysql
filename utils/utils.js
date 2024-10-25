function stringToObject(str) {
    const obj = {};
    const parts = str.split(/\s{2,}/); // Split by 2 or more spaces
  
    parts.forEach(part => {
      let [key, value] = part.split(': ');
      key = key.replace(" ", "")
      obj[key.trim()] = Number(value); // Convert value to number
    });
  
    return obj;
}

module.exports = {
    stringToObject
}