import { IEmployee } from "./interfase";

export interface ICalculo {

    totalWorkedHours: number;
    totalOvertimeHours: number;    
    totalOrdinaryHours: number;
    totalRecaudeHours: number;    
    overtimeBreakdown: {
        HED: number;    
        HEN: number;    
        HEDD: number;    
        HEDN: number;    
        RC: number; 
        RD: number;
        RND: number;
    };
    basySalary: number;
    totalSalary: number;
}

const OVERTIME_RATES = {
  HED: 1.25,
  HEN: 1.75,
  HEDD: 2.0,
  HEDN: 2.5,
  RC: 0.35,
  RD: 0.75,
  RND: 1.1,
};

export const calculateWorkHours = (employee: IEmployee): ICalculo => {
  const salary = employee.attributes.salary;
  const hourlyRate = salary / 240;
  let totalWorkedHours = 0;
  let totalOvertimeHours = 0;
  let totalOrdinaryHours = 0;
  let totalRecaudeHours = 0;
  let overtimeBreakdown = {
    HED: 0,
    HEN: 0,
    HEDD: 0,
    HEDN: 0,
    RC: 0,
    RD: 0,
    RND: 0,
  };
  let totalSalary = salary;

  employee.relationships.accessControls.forEach((accessControl) => {
    const checkIn = new Date(accessControl.attributes.check_in);
    const checkOut = new Date(accessControl.attributes.check_out);
    const workedHours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
    const dayOfWeek = checkIn.getDay();
    const hourIn = checkIn.getHours();
    const hourOut = checkOut.getHours();

    totalWorkedHours += workedHours;

    let ordinaryHours = Math.min(8, workedHours);
    totalOrdinaryHours += ordinaryHours;
    let overtimeHours = Math.max(0, workedHours - 8);

    if (dayOfWeek === 0) {
      if (hourIn >= 6 && hourOut < 21) {
        overtimeBreakdown.HEDD += overtimeHours;
        totalSalary += overtimeHours * hourlyRate * OVERTIME_RATES.HEDD;
      } else {
        overtimeBreakdown.HEDN += overtimeHours;
        totalSalary += overtimeHours * hourlyRate * OVERTIME_RATES.HEDN;
      }
    } else if (hourIn < 6 || hourOut >= 21) {
      overtimeBreakdown.HEN += overtimeHours;
      totalSalary += overtimeHours * hourlyRate * OVERTIME_RATES.HEN;
    } else if (overtimeHours > 0) {
      overtimeBreakdown.HED += overtimeHours;
      totalSalary += overtimeHours * hourlyRate * OVERTIME_RATES.HED;
    }

    // Recargo nocturno
    if (hourIn >= 21 || hourOut < 6) {
      const nocturnalHours = calculateNocturnalHours(checkIn, checkOut);
      overtimeBreakdown.RC += nocturnalHours;
      totalSalary += nocturnalHours * hourlyRate * OVERTIME_RATES.RC;
    }

    // Recargo dominical
    if (dayOfWeek === 0) {
      overtimeBreakdown.RD += workedHours;
      totalSalary += workedHours * hourlyRate * OVERTIME_RATES.RD;
    }

    // Recargo nocturno dominical
    if (dayOfWeek === 0 && (hourIn >= 21 || hourOut < 6)) {
      const nocturnalHours = calculateNocturnalHours(checkIn, checkOut);
      overtimeBreakdown.RND += nocturnalHours;
      totalSalary += nocturnalHours * hourlyRate * OVERTIME_RATES.RND;
    }
  });

  totalOvertimeHours = overtimeBreakdown.HED + overtimeBreakdown.HEN + overtimeBreakdown.HEDD + overtimeBreakdown.HEDN;
  totalRecaudeHours = overtimeBreakdown.RC + overtimeBreakdown.RD + overtimeBreakdown.RND;

  return {
    totalWorkedHours,
    totalOvertimeHours,
    totalOrdinaryHours,
    totalRecaudeHours,
    overtimeBreakdown,
    basySalary: employee.attributes.salary,
    totalSalary,
  };
};

const calculateNocturnalHours = (checkIn: Date, checkOut: Date): number => {
  let nocturnalHours = 0;
  const hourIn = checkIn.getHours();
  const hourOut = checkOut.getHours();

  if (hourIn >= 21) {
    nocturnalHours += 24 - hourIn;
  }
  if (hourOut < 6) {
    nocturnalHours += hourOut;
  }
  return nocturnalHours;
};