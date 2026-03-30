let display = document.getElementById('main-display');
let isDeg = true;

// Tab Switcher Fix
function switchTab(type) {
    const std = document.getElementById('standard-ui');
    const cg = document.getElementById('cgpa-ui');
    const sBtn = document.getElementById('std-nav');
    const cBtn = document.getElementById('cgpa-nav');

    if (type === 'cgpa') {
        std.classList.add('hidden');
        cg.classList.remove('hidden');
        cBtn.classList.add('active');
        sBtn.classList.remove('active');
    } else {
        cg.classList.add('hidden');
        std.classList.remove('hidden');
        sBtn.classList.add('active');
        cBtn.classList.remove('active');
    }
}

// Scientific Logic
function ins(v) { (display.value === '0') ? display.value = v : display.value += v; }
function clr() { display.value = '0'; }
function del() { display.value = display.value.length > 1 ? display.value.slice(0, -1) : '0'; }
function toggleUnit() {
    isDeg = !isDeg;
    document.getElementById('unit-indicator').innerText = isDeg ? "DEG" : "RAD";
}
function run() {
    try {
        let exp = display.value;
        if (isDeg) exp = exp.replace(/Math\.(sin|cos|tan)\(([^)]+)\)/g, (m, f, v) => `Math.${f}(${v} * Math.PI / 180)`);
        display.value = eval(exp).toFixed(4).replace(/\.?0+$/, "");
    } catch { display.value = "ERROR"; setTimeout(clr, 1000); }
}

// DIU CGPA Logic
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
