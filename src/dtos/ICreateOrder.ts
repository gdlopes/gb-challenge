export default interface ICreateOrder {
  code: string;
  value: string;
  cashbackValue: string;
  date?: Date;
  resellerDocument: string;
  status: string;
}