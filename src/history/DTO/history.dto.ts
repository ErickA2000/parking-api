export class HistoryCreateDTO {
  idParking: string;
  plate: string;
  dateEntry: Date;
  exitDate: Date;
  amount: number;
}

export class HistoryUpdateDTO {
  idParking?: string;
  plate?: string;
  dateEntry?: Date;
  exitDate?: Date;
  amount?: number;
}
