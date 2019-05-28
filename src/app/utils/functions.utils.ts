import * as moment from "moment";

export class Functions {
  dateFormat(date: string) {
    return moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
  }

  dateFromString(date: string): Date {
    return moment(date, "YYYY-MM-DD").toDate();
  }

  maskCep(cep: string): string {
    if (cep.length == 8) {
      return (
        cep.substring(0, 2) +
        "." +
        cep.substring(2, 5) +
        "-" +
        cep.substring(5, 8)
      );
    }
    return cep;
  }
}
