import { formatYuan2Fen } from './formatter';

export const isYuan = (amount: string) => {
  const reg = /^\d+(\.\d{0,2})?$/;
  const regResult = reg.test(amount);
  const amountFen = formatYuan2Fen(amount);
  return !!amount && regResult && amountFen !== 0;
};

export function isMobileNumber(mobileNumber: string) {
  const regExp = /^(?:(?:\+|00)86)?1(?:(?:3\d)|(?:4[5-79|])|(?:5[0-35-9|])|(?:6[5-7])|(?:7[0-8])|(?:8\d)|(?:9[189|]))\d{8}$/;
  return regExp.test(mobileNumber);
}
