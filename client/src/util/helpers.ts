/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line no-restricted-globals
export const isValidDate = (date: string) => !isNaN(Date.parse(date));
