export const validateURL = (url: string): boolean => {
  try {
    new URL(url);
    return true;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return false;
  }
};

export const validateInteger = (value: string): boolean => {
  return /^\d+$/.test(value);
};
