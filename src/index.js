import Calendar from './Calendar';
import './styles.css';

const buttons = [...document.querySelectorAll('.month-shift')];
const myUiCalendar = document.querySelector('#my-ui-calendar');
const calendar = new Calendar();
buttons.forEach((v)=>{ v.addEventListener('click', shiftMonthHandler) });
draw(myUiCalendar, calendar);


// ==================================
// Application Renderer:
function shiftMonthHandler(e) {
  switch(e.target.dataset.shift.toUpperCase()) {
    case 'LEFT':  calendar.shift = -1; break;
    case 'RIGHT': calendar.shift = +1; break;
  }
  draw(myUiCalendar, calendar);
}

function draw(node, instance) {
  const model = instance.processGridModel();
  node.innerHTML = compose(model);
}

function compose(model) {
  const hRows = composeRows(model.data[0].days, true);
  const bRows = model.data.map((week,wid)=>composeRows(week.days)).join('');
  const head = `<thead class="ui-calendar__head">${hRows}</thead>`;
  const body = `<tbody class="ui-calendar__body">${bRows}</tbody>`;
  return `
  <div class="ui-calendar">
    <table class="ui-calendar__container">
      ${head}
      ${body}
    </table>
  </div>`;
}

function composeRows(days,isHead) {
  days = isHead
    ? days.map(day=>`<th> <div>${day.name}</div> </th>`).join('')
    : days.map(day=>`<td class="${day.isCurentMonth?'':'gray'} cell"> <div>${day.label}</div> </td>`).join('');
  return `<tr>${days}</tr>`;
}
