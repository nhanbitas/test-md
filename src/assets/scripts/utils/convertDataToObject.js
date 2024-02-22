/**
 * Convert a data attribute string into a key-value object.
 *
 * @param {string} dataAttribute - the data attribute string to be converted
 * @return {Object} the key-value object created from the data attribute
 */ export default function convertDataToObject(dataAttribute) {
  const keyValueArray = dataAttribute?.split(' ');
  const dataObject = {};

  keyValueArray?.forEach((element) => {
    const [key, value] = element.split(':');
    if (key) dataObject[key] = value;
  });
  return dataObject;
}
// example: data-components="key1:value1 key2:value2" -> {key1: value1, key2: value2}
