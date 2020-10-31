import { AdData, AdDataByKey } from '../interfaces';

// eslint-disable-next-line no-restricted-globals
export const isValidDate = (date: string) => !isNaN(Date.parse(date));

export const formatDate = (date: string) => new Date(date).toDateString();

export const getDates = (startDate: Date, stopDate: Date) => {
  const dateArray: string[] = [];
  const currentDate = startDate;
  while (currentDate <= stopDate) {
    dateArray.push(currentDate.toDateString());
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return dateArray;
};
// TODO: try to get this to work instead of using keyof AdData
// <T extends object, U extends keyof T>
// TODO restructure how data is returned from api so you don't have to do this here
export const buildAdDataByKey = (keyArr: string[], clickData: AdData[], keyName: keyof AdData) => {
  const buildObj: AdDataByKey = {};

  keyArr.forEach((key: string) => {
    buildObj[key] = clickData.filter(
      (adData: AdData) => (Object.prototype.hasOwnProperty.call(adData, keyName)
        ? adData[keyName] === key
        : false),
    );
  });

  return buildObj;
};
