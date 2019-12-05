export interface ExpenseResult {
  expenses: Expense[];
  count: number;
}


export interface Expense {
  id: number;
  title: string;
  edate: string;
  amount: string;
  doc: string;
  user: number;
}
