export const pathValidator = (src, folder) => {
  const urlRegex = /^https?:\/\/[^\s]+$/;
  let validatedPath = null;
  urlRegex.test(src)
    ? (validatedPath = src)
    : (validatedPath = `assets/${folder}/${src}`);
  return validatedPath;
};
