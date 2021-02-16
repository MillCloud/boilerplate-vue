import { isNumber } from 'lodash-es';

export const formatYuan2Fen = (amountYuan: string | number) => {
  if (isNumber(amountYuan)) {
    return Number.parseInt((amountYuan * 100).toFixed(0), 10);
  }
  return Number.parseInt((Number.parseFloat(amountYuan) * 100).toFixed(0), 10);
};

export const formatFen2Yuan = (amountFen: string | number) => {
  if (isNumber(amountFen)) {
    return Number.parseFloat((amountFen / 100).toFixed(2));
  }
  return Number.parseFloat((Number.parseFloat(amountFen) / 100).toFixed(2));
};
