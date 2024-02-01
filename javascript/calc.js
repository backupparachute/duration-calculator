// dayjs.extend(customParseFormat);

document.addEventListener("DOMContentLoaded", function(){
  // Handler when the DOM is fully loaded
  console.log("loading event listenr...");

  document.querySelectorAll('input').forEach(item => {
    item.addEventListener('blur', event => {
		calcTotals(event);
    })
  })

    // let searchParams = new URLSearchParams(window.location.search);
    // let str = searchParams.get('start')
    // let fin = searchParams.get('finish')
    //
    // console.log("found start param: "+str);
    // console.log("found finish param: "+fin);
    // bump for pages

    // if (trs) {
    //   trs = Number(trs);
    //   console.log("setting trs = "+trs);
    //   document.querySelector('#tot-rnd-size').value = trs;
    // }

  calcTotals();

});

function calcTotals(event) {


  let s = document.querySelector('#start').value;
  let f = document.querySelector('#finish').value;

  if(s && f) {
    console.log("calc values exist...")
    // let start = dayjs(document.querySelector('#start').value, "YYYY-MM-DD HH:mm:ss")
    let start = dayjs(s, ["YYYY-MM-DD HH:mm:ss","HH:mm:ss"])
    let end = dayjs(f, ["YYYY-MM-DD HH:mm:ss","HH:mm:ss"])

    console.log("start = "+start.toString());
    console.log("end = "+end.toString());
    let diff = end.diff(start);
    let durr = dayjs.duration(diff);
    console.log(durr.humanize());
    console.log(diff);

    document.querySelector('#difference').value = durr.format("HH:mm:ss")
  }
    // console.log("calc totals...");
    //
    // let first_cap_raise = calc_cap_raise(to_percent(document.querySelector('#first_per_round').value));
    // document.querySelector('#first .cap-raise').innerHTML = to_currency(first_cap_raise);
    //
    // let sec_cap_raise = calc_cap_raise(to_percent(document.querySelector('#sec_per_round').value));
    // document.querySelector('#second .cap-raise').innerHTML = to_currency(sec_cap_raise);
    //
    // let third_cap_raise = calc_cap_raise(to_percent(document.querySelector('#third_per_round').value));
    // document.querySelector('#third .cap-raise').innerHTML = to_currency(third_cap_raise);
    //
    //
   	// let per_rnd_acct = calc_per_rnd_acct();
    // document.querySelector('#per-rnd-acct').value = per_rnd_acct.toFixed(2);
    //
    // let first_calc_per_comp_sold = calc_per_company_sold(first_cap_raise, document.querySelector('#first_cap_val').value);
    // document.querySelector('#first .per-comp-sold').innerHTML = first_calc_per_comp_sold.toFixed(2)+"%";
    //
    // let sec_calc_per_comp_sold = calc_per_company_sold(sec_cap_raise, document.querySelector('#sec_cap_val').value);
    // document.querySelector('#second .per-comp-sold').innerHTML = sec_calc_per_comp_sold.toFixed(2)+"%";
    //
    // let third_calc_per_comp_sold = calc_per_company_sold(third_cap_raise, document.querySelector('#third_cap_val').value);
    // document.querySelector('#third .per-comp-sold').innerHTML = third_calc_per_comp_sold.toFixed(2)+"%";
    //
    // document.querySelector('#per-comp-sold-tot').value = (Number(first_calc_per_comp_sold)+Number(sec_calc_per_comp_sold)+Number(third_calc_per_comp_sold)).toFixed(2);
}
