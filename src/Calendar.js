class Calendar {
  constructor(shift=0) {
    this._shift = shift;
    this.DAY_LENGTH_MS = 86400000;
    this.WEEK_LENGTH_MS = 86400000*7;
  }

  set shift(val) {
    this._shift = this._shift + val;
  }

  get shift() {
    return this._shift;
  }

  processMonthTs(s) {
    const shift = s || this._shift;
    const current = new Date();
    const mIndex  = current.getMonth()+shift;
    const _start  = new Date(current.getFullYear(), mIndex,   1);
    const _end    = new Date(current.getFullYear(),   mIndex+1, 0);
    const start   = _start.getTime();
    const end     = _end.getTime();
    const mList   = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];
    const index   = mIndex; // honor month length and get rid of overflow;
    const label   = mList[index];
    return {label, start, end};
  }

  processGridMeta(s) {
    const shift        = s || this._shift;
    const month        = this.processMonthTs(shift);
    const _monthStart  = new Date(month.start);
    const _monthEnd    = new Date(month.end);
    const before       = 0-_monthStart.getDay();
    const after        = 6-_monthEnd.getDay();
    const start        = month.start + before*this.DAY_LENGTH_MS;
    const end          = month.end + after*this.DAY_LENGTH_MS;
    const gridDuration = end+this.DAY_LENGTH_MS - start;
    const weeks        = gridDuration/this.WEEK_LENGTH_MS;
    const label        = month.label;
    const duration     = { day:this.DAY_LENGTH_MS, week:this.WEEK_LENGTH_MS, grid:gridDuration };
    return { label, start, end, weeks, duration };
  }

  processGridModel(s) {
    const shift = s || this._shift;
    const meta = this.processGridMeta(shift);
    const { start, weeks, duration: { day, grid, week, } } = meta; // obj distracting
    const currentMonth = new Date(start+grid/2).getMonth();
    return {
      meta,
      data:[...Array(weeks).keys()].map((w,wi) => ({
        index:wi,
        ts:start+week*wi,
        days:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'].map((d,di)=> {
            return {
            index:di,
            name:d.toUpperCase(),
            label:new Date((start+week*wi)+(day*di)).toDateString(),
            ts:(start+week*wi)+(day*di),
            isCurentMonth:currentMonth === new Date((start+week*wi)+(day*di)).getMonth(),
          };
        }),
      }))
    };
  }
}

export default Calendar;