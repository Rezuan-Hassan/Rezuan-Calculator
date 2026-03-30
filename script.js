let display = document.getElementById('main-display');
let isDeg = true;

// --- TAB SWITCHING LOGIC ---
function switchTab(tab) {
    const stdUI = document.getElementById('standard-ui');
    const cgpaUI = document.getElementById('cgpa-ui');
    const stdNav = document.getElementById('std-nav');
    const cgpaNav = document.getElementById('cgpa-nav');

    if (tab === 'cgpa') {
        stdUI.classList.add('hidden');
        cgpaUI.classList.remove('hidden');
        cgpaNav.classList.add('active');
        stdNav.classList.remove('active');
    } else {
        cgpaUI.classList.add('hidden');
        stdUI.classList.remove('hidden');
        stdNav.classList.add('active');
        cgpaNav.classList.remove('active');
    }
}

// --- ORIGINAL SCIENTIFIC LOGIC ---
function ins(val) {
    if (display.value === '0') display.value = val;
    else display.value += val;
}

function clr() { display.value = '0'; }
function del() { display.value = display.value.length > 1 ? display.value.slice(0, -1) : '0'; }

function toggleUnit() {
    isDeg = !isDeg;
    document.getElementById('unit-indicator').innerText = isDeg ? "DEG" : "RAD";
}

function run() {
    try {
        let exp = display.value;
        if (isDeg) {
            exp = exp.replace(/Math\.(sin|cos|tan)\(([^)]+)\)/g, (m, f, v) => `Math.${f}(${v} * Math.PI / 180)`);
        }
        let result = eval(exp);
        display.value = Number.isInteger(result) ? result : parseFloat(result.toFixed(8));
    } catch {
        display.value = "SYNTAX ERR";
        setTimeout(clr, 1500);
    }
}

// --- NEW CGPA LOGIC ---
function addCourse() {
    const container = document.getElementById('course-container');
    const row = document.createElement('div');
    row.className = 'course-row';
    row.innerHTML = `
        <input type="number" class="credits" placeholder="Credits" step="0.5">
        <select class="grades">
            <option value="4.00">A+ (4.00)</option>
            <option value="3.75">A (3.75)</option>
            <option value="3.50">A- (3.50)</option>
            <option value="3.25">B+ (3.25)</option>
            <option value="3.00">B (3.00)</option>
            <option value="2.75">B- (2.75)</option>
            <option value="2.50">C+ (2.50)</option>
            <option value="2.25">C (2.25)</option>
            <option value="2.00">D (2.00)</option>
            <option value="0.00">F (0.00)</option>
        </select>
    `;
    container.appendChild(row);
}

function calculateDIU() {
    const credInputs = document.querySelectorAll('.credits');
    const gradeInputs = document.querySelectorAll('.grades');
    
    let totalPoints = 0;
    let totalCredits = 0;

    for (let i = 0; i < credInputs.length; i++) {
        let c = parseFloat(credInputs[i].value);
        let g = parseFloat(gradeInputs[i].value);

        if (!isNaN(c) && c > 0) {
            totalPoints += (c * g);
            totalCredits += c;
        }
    }

    if (totalCredits > 0) {
        let gpa = totalPoints / totalCredits;
        document.getElementById('final-gpa').innerText = gpa.toFixed(2);
        document.getElementById('total-creds').innerText = totalCredits;
    } else {
        alert("Please enter credit hours for your courses!");
    }
}
