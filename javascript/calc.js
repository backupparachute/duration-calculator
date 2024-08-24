// dayjs.extend(customParseFormat);

let splits = [];
let split_prefix="split"
let leg_prefix="leg"
let counter = 0;

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

function addSplit() {

  counter++;
  let legs_card = document.querySelector('#legs-card');
  legs_card.style.display = 'block';
  let legs_div = document.querySelector('#legs');

  legs_div.insertAdjacentHTML( 'beforeend', `<div class="row mb-1">
    <div class="col"><input class="form-control leg" type="text" name="leg" value="" id="${split_prefix}-${counter}-${leg_prefix}-1" readonly></div>
    <div class="col"><input class="form-control leg" type="text" name="leg" value="" id="${split_prefix}-${counter}-${leg_prefix}-2" readonly></div>
    </div>
    ` );

  let splits_div = document.querySelector('#splits');
  splits.push(counter);
  splits_div.insertAdjacentHTML( 'beforeend', `<input class="form-control split mb-1" type="text" name="split" value="" id="${split_prefix}-${counter}" placeholder="HH:MM:SS">` );
}

function calcTotals(event) {


  let s = document.querySelector('#start').value;
  let f = document.querySelector('#finish').value;


  if(s && f) {
    console.log("calc values exist...")
    let start = dayjs(s, ["YYYY-MM-DD HH:mm:ss","HH:mm:ss"])
    let end = dayjs(f, ["YYYY-MM-DD HH:mm:ss","HH:mm:ss"])

    if (splits && splits.length) {
      console.log("split values exist..");
      calcSplits(start, end, 1);
    }

    console.log("start = "+start.toString());
    console.log("end = "+end.toString());
    let diff = end.diff(start);
    let durr = dayjs.duration(diff);
    console.log(durr.humanize());
    console.log(diff);

    document.querySelector('#difference').value = durr.format("HH:mm:ss")
  }

  function calcSplits(start, end, index) {

    console.log(`split start=${start}, end=${end}...`)

    // let s = document.querySelector(`#${split_prefix}-${index}`);
    let s = valIfPresent(document.querySelector(`#${split_prefix}-${index}`), null);
    
    if ( !s) { return; }

    s = dayjs(s, ["YYYY-MM-DD HH:mm:ss","HH:mm:ss"]);

    let durr = calcDiffDurr(s, start);

    console.log(`leg 1 durr = ${durr}`);

    // document.querySelector(`#${split_prefix}-${index}-${leg_prefix}-1`).value = durr.format("HH:mm:ss");
    document.querySelector(`#${split_prefix}-${index}-${leg_prefix}-1`).value = durr;

    let sn = valIfPresent(document.querySelector(`#${split_prefix}-${index+1}`), end)

    console.log(`split next = ${sn}`);

    if (sn) {
      sn = dayjs(sn, ["YYYY-MM-DD HH:mm:ss","HH:mm:ss"]);
    }

    durr = calcDiffDurr( sn || end, s);

    console.log(`leg 2 durr = ${durr}`);
    document.querySelector(`#${split_prefix}-${index}-${leg_prefix}-2`).value = durr;

    calcSplits(s, end, index+1);

  }

  function calcDiffDurr(val, comp) {

    // val = dayjs(val, ["YYYY-MM-DD HH:mm:ss","HH:mm:ss"]);

    let diff = val.diff(comp); 
    let durr = dayjs.duration(diff);

    console.log(`diff=${diff}, durr=${durr.humanize()}`);
 
    return durr.format("HH:mm:ss");
  }

  function valIfPresent(val, def) {
    if ( val && val.value ) { 
      console.log(`found value=${val.value}...`)
      return val.value; 
    }

    return def;
  }

}
