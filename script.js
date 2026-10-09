 // ১. আপনার Firebase Database URL টি নিচে দিন (শেষে স্লেশ / অবশ্যই রাখবেন)
const FIREBASE_URL = "https://YOUR-DATABASE-NAME.firebaseio.com/";

// ২. পেজ লোড হওয়ার সাথে সাথে Firebase থেকে সুইচের আগের আপডেটগুলো এনে UI তে দেখাবে
document.addEventListener('DOMContentLoaded', () => {
    fetchLoadsState();
});

// Firebase থেকে বর্তমান সুইচের স্টেট (ON/OFF) পড়ার ফংশন
function fetchLoadsState() {
    fetch(`${FIREBASE_URL}/loads.json`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                for (let i = 1; i <= 4; i++) {
                    if (data[`load${i}`]) {
                        const state = data[`load${i}`];
                        const toggle = document.getElementById(`toggle-${i}`);
                        const badge = document.getElementById(`badge-${i}`);
                        
                        if (toggle && badge) {
                            const isChecked = (state === "ON");
                            toggle.checked = isChecked;
                            badge.textContent = state;
                            badge.className = isChecked ? 'badge badge-on' : 'badge badge-off';
                        }
                    }
                }
            }
        })
        .catch(error => console.error("Firebase থেকে ডাটা আনতে সমস্যা হয়েছে:", error));
}

// ৩. ওয়েবসাইটে যেকোনো সুইচে ক্লিক করলে এই ফংশনটি কাজ করবে
function toggleLoad(loadNumber) {
    const toggle = document.getElementById(`toggle-${loadNumber}`);
    const badge = document.getElementById(`badge-${loadNumber}`);

    if (!toggle || !badge) return;

    let state = toggle.checked ? "ON" : "OFF";

    // সাথে সাথে স্ক্রিনের ডিজাইন (UI) আপডেট করা
    if (toggle.checked) {
        badge.textContent = "ON";
        badge.className = "badge badge-on";
    } else {
        badge.textContent = "OFF";
        badge.className = "badge badge-off";
    }

    // Firebase ডাটাবেসে নতুন স্টেট আপডেট করা
    fetch(`${FIREBASE_URL}/loads/load${loadNumber}.json`, {
        method: 'PUT',
        body: JSON.stringify(state),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(`Load ${loadNumber} সফলভাবে আপডেট হয়েছে:`, data);
    })
    .catch(error => console.error("Firebase-এ ডাটা পাঠাতে সমস্যা হয়েছে:", error));
}
