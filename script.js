function getTimeInZone(offset) {
    const now = new Date();
    // Convert local time to UTC, then add offset
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (offset * 3600000));
}

function setClock(zonePrefix, date) {
    const hour = date.getHours() % 12;
    const minute = date.getMinutes();
    const second = date.getSeconds();
    // Calculate angles
    const hourAngle = (hour + minute / 60) * 30; // 360/12
    const minuteAngle = (minute + second / 60) * 6; // 360/60
    const secondAngle = second * 6;
    document.getElementById(zonePrefix + '-hour').style.transform = `rotate(${hourAngle}deg)`;
    document.getElementById(zonePrefix + '-minute').style.transform = `rotate(${minuteAngle}deg)`;
    document.getElementById(zonePrefix + '-second').style.transform = `rotate(${secondAngle}deg)`;
}

function updateTimes() {
    // IST: UTC+5.5
    const ist = getTimeInZone(5.5);
    // EST: UTC-5
    const est = getTimeInZone(-5);
    // MDT: UTC-6
    const mdt = getTimeInZone(-6);
    // PHT: UTC+8
    const pht = getTimeInZone(8);
    document.getElementById('ist').textContent = ist.toLocaleString('en-US', { hour12: false });
    document.getElementById('est').textContent = est.toLocaleString('en-US', { hour12: false });
    document.getElementById('mdt').textContent = mdt.toLocaleString('en-US', { hour12: false });
    document.getElementById('pht').textContent = pht.toLocaleString('en-US', { hour12: false });
    setClock('ist', ist);
    setClock('est', est);
    setClock('mdt', mdt);
    setClock('pht', pht);
}

updateTimes();
setInterval(updateTimes, 1000);
