let display = document.getElementById('main-display');
let isDeg = true;

// Fix: Handles basic input
function ins(val) {
    if (display.value === '0') display.value = val;
    else display.value += val;
}

function clr() { display.value = '0'; }
function del() { display.value = display.value.length > 1 ? display.value.slice(0, -1) : '0'; }

// Fix: Toggles the scientific panel visibility
function toggle(id) { 
    document.getElementById(id).classList.toggle('hidden'); 
}

function toggleUnit() {
    isDeg = !isDeg;
    document.getElementById('unit-indicator').innerText = isDeg ? "DEG" : "RAD";
}

function run() {
    try {
        let exp = display.value;
        
        // Fix: Degrees to Radians conversion for trig functions
        if (isDeg) {
            exp = exp.replace(/Math\.(sin|cos|tan)\(([^)]+)\)/g, (m, f, v) => `Math.${f}(${v} * Math.PI / 180)`);
        }

        let result = eval(exp);
        
        // Final formatting to prevent long decimals
        display.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
    } catch {
        display.value = "SYNTAX ERR";
        setTimeout(clr, 1500);
    }
}
