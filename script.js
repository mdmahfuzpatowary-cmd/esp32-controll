function toggleLoad(loadNumber) {
    const toggle = document.getElementById(`toggle-${loadNumber}`);
    const badge = document.getElementById(`badge-${loadNumber}`);

    if (toggle.checked) {
        badge.textContent = "ON";
        badge.className = "badge badge-on";
        console.log(`Load ${loadNumber} switched ON`);
        
        // এখানে ESP32 তে কমান্ড পাঠাতে API Call যুক্ত করতে পারেন
    } else {
        badge.textContent = "OFF";
        badge.className = "badge badge-off";
        console.log(`Load ${loadNumber} switched OFF`);
        
        // এখানে ESP32 তে কমান্ড পাঠাতে API Call যুক্ত করতে পারেন
    }
}
