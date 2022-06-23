// program to convert first letter of a string to uppercase
export function capitalize(str) {
  // converting first letter to uppercase
  const capitalized = str.charAt(0).toUpperCase() + str.slice(1);

  return capitalized;
}
