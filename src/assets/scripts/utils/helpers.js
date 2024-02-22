/**
 * Check if the input string contains HTML content.
 *
 * @param {string} str - The input string to be checked for HTML content.
 * @return {boolean} Whether the input string contains HTML content or not.
 */
export const isHTML = (str) => {
  const parser = new DOMParser();
  const htmlDocument = parser.parseFromString(str, 'text/html');
  const isHTML = Array.from(htmlDocument.body.childNodes).some((node) => node.nodeType === 1);

  return isHTML;
};
