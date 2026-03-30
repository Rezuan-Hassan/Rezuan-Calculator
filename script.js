let display = document.getElementById('main-display');
let isDeg = true;

function switchTab(type) {
    const std = document.getElementById('standard-ui');
    const cg = document.getElementById('cgpa-ui');
    document.getElementById('calc-nav').classList.toggle('active', type === 'standard');
    document.getElementById('cgpa-nav').classList.toggle('active', type === 'cgpa');
    
    if (type === 'cgpa') {
        std.classList.add('hidden');
        cg.classList.remove('hidden');
    } else {
        cg.classList.add('hidden');
        std.classList.remove('hidden');
    }
}

function ins(val) {
    if (display.value === '0') display.value = val;
    else display.value += val;
}

function clr() { display.value = '0'; }

function del() { 
    display.value = display.value.length > 1 ? display.value.slice(0, -1) : '0'; 
}

function toggleUnit() {
    isDeg = !isDeg;
    document.getElementById('unit-indicator').innerText = isDeg ? "DEG" : "RAD";
}

function run() {
    try {
        let exp = display.value;
        
        // Correcting trig functions for degrees
        if (isDeg) {
            exp = exp.replace(/Math\.(sin|cos|tan)\(([^)]+)\)/g, (m, f, v) => {
                return `Math.${f}((${v}) * Math.PI / 180)`;
            });
        }

        let result = eval(exp);
        display.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
    } catch {
        display.value = "SYNTAX ERR";
        setTimeout(clr, 1500);
    }
}

function addCourse() {
    const row = document.createElement('div');
    row.className = 'course-row';
    row.innerHTML = `<input type="number" class="credits" placeholder="Credits"><select class="grades">
        <option value="4.00">A+ (4.00)</option><option value="3.75">A (3.75)</option>
        <option value="3.50">A- (3.50)</option><option value="3.25">B+ (3.25)</option>
        <option value="3.00">B (3.00)</option><option value="2.75">B- (2.75)</option>
        <option value="2.50">C+ (2.50)</option><option value="2.25">C (2.25)</option>
        <option value="2.00">D (2.00)</option><option value="0.00">F (0.00)</option></select>`;
    document.getElementById('course-container').appendChild(row);
}

function calculateDIU() {
    const c = document.querySelectorAll('.credits');
    const g = document.querySelectorAll('.grades');
    let p = 0, t = 0;
    c.forEach((val, i) => {
        let cred = parseFloat(val.value);
        if (!isNaN(cred)) {
            p += (cred * parseFloat(g[i].value));
            t += cred;
        }
    });
    if (t > 0) {
        document.getElementById('final-gpa').innerText = (p/t).toFixed(2);
        document.getElementById('total-creds').innerText = t;
    }
}
