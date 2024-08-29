
/**
 * Converts Unicode characters to their corresponding characters.
 * 
 * @param {string} text - The text containing Unicode characters.
 * @returns {string} - The text with Unicode characters converted to their corresponding characters.
 * 
 * @example
 * // Example usage:
 * const textWithUnicode = "\\u0048\\u0065\\u006C\\u006C\\u006F";
 * const normalText = unicodeToChar(textWithUnicode);
 * console.log(normalText); // Output: "Hello"
 */

export function unicodeToChar(text) {
    return text.replace(/\\u[\dA-F]{4}/gi, 
           function (match) {
                return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
           });
 }
