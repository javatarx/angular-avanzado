import { Injectable } from "@angular/core";
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { MonthBalance } from "@routes/month/state/models/month_balance.model";
import { JournalEntry } from "@routes/month/state/models/journal_entry.model";
import { Observable } from "rxjs";

@Injectable()
export class ApiService {
  private urlJournalEntries = environment.apiUrl + "priv/journalentries/";
  private urlMonthBalances = environment.apiUrl + "priv/monthbalances/";
  private _newMonthBalance: MonthBalance = {
    year: 0,
    month: 0,
    incomes: 0,
    outgoings: 0,
    expenses: 0,
    savings: 0,
    goal: 0,
    available: 0
  };

  constructor(private http: HttpClient) {}

  private createNewMonthBalance(year: number, month: number): MonthBalance {
    return {
      ...this._newMonthBalance,
      year,
      month
    };
  }

  public getJournalEntriesList$(): Observable<JournalEntry[]> {
    return this.http.get<JournalEntry[]>(this.urlJournalEntries);
  }

  public postJournalEntry$(journalEntry: JournalEntry): Observable<any> {
    return this.http.post(this.urlJournalEntries, journalEntry);
  }

  public deleteJournalEntry$(journalEntry: JournalEntry): Observable<any> {
    return this.http.delete(this.urlJournalEntries + journalEntry._id);
  }

  public getMonthBalancesList$(): Observable<MonthBalance[]> {
    return this.http.get<MonthBalance[]>(this.urlMonthBalances);
  }

  public postMonthBalance$(year: number, month: number): Observable<any> {
    const monthBalance = this.createNewMonthBalance(year, month);
    return this.http.post(this.urlMonthBalances, monthBalance);
  }

  public putMonthBalance$(monthBalance: MonthBalance): Observable<any> {
    return this.http.put(
      this.urlMonthBalances + monthBalance._id,
      monthBalance
    );
  }

  public deleteMonthBalance$(monthBalance: MonthBalance): Observable<any> {
    return this.http.delete(this.urlMonthBalances + monthBalance._id);
  }
}
