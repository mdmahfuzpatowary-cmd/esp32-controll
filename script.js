// ওয়েবসাইট লোড হওয়ার সাথে সাথে মেমরি থেকে আগের অবস্থা চেক করবে
document.addEventListener('DOMContentLoaded', () => {
    for (let i = 1; i <= 4; i++) {
        const savedState = localStorage.getItem(`load_${i}`);
        const toggle = document.getElementById(`toggle-${i}`);
        const badge = document.getElementById(`badge-${i}`);

        if (savedState !== null) {
            const isChecked = savedState === 'ON';
            toggle.checked = isChecked;
            badge.textContent = isChecked ? 'ON' : 'OFF';
            badge.className = isChecked ? 'badge badge-on' : 'badge badge-off';
        }
    }
});

function toggleLoad(loadNumber) {
    const toggle = document.getElementById(`toggle-${loadNumber}`);
    const badge = document.getElementById(`badge-${loadNumber}`);

    let state = toggle.checked ? "ON" : "OFF";

    // ব্রাউজারের স্থানীয় মেমরিতে সেভ রাখা
    localStorage.setItem(`load_${loadNumber}`, state);

    // UI আপডেট
    if (toggle.checked) {
        badge.textContent = "ON";
        badge.className = "badge badge-on";
    } else {
        badge.textContent = "OFF";
        badge.className = "badge badge-off";
    }
}
