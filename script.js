let display = document.getElementById('main-display');
let isDeg = true;

function ins(val) {
    if (display.value === '0') display.value = val;
    else display.value += val;
}

function clr() { display.value = '0'; }
function del() { display.value = display.value.length > 1 ? display.value.slice(0, -1) : '0'; }

function toggle(id) { document.getElementById(id).classList.toggle('hidden'); }

function toggleUnit() {
    isDeg = !isDeg;
    document.getElementById('unit-indicator').innerText = isDeg ? "DEG" : "RAD";
}

function run() {
    try {
        let exp = display.value;
        
        // Handle Degrees to Radians for Trig
        if (isDeg) {
            exp = exp.replace(/Math\.(sin|cos|tan)\(([^)]+)\)/g, (m, f, v) => `Math.${f}(${v} * Math.PI / 180)`);
        }

        let result = eval(exp);
        
        // Final formatting
        display.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
    } catch {
        display.value = "SYNTAX ERR";
        setTimeout(clr, 1500);
    }
}

function toBase(b) {
    let n = parseInt(display.value);
    if (!isNaN(n)) display.value = n.toString(b).toUpperCase();
}
