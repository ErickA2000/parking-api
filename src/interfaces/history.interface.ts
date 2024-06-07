export interface HistoryTop10Vehicles {
  plate: string;
  count: number;
  dateEntry: Date;
  exitDate: Date;
  amount: number;
}

export interface Earnings {
  today: number;
  week: number;
  month: number;
  year: number;
}
