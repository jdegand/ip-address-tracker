document.querySelector('.arrow').addEventListener('click', (e) => {
    const ipAddress = document.getElementById("input").value;

    if(ipAddress){
        fetch(`https://geo.ipify.org/api/v1?apiKey=YOUR_API_KEY_HERE&ipAddress=${ipAddress}`)
        .then(response => response.json())
        .then(data => update(data))
        .catch(error => alert('Please enter a valid IP Address'));
    } else {
        fetch(`https://geo.ipify.org/api/v1?apiKey=YOUR_API_KEY_HERE&ipAddress=8.8.8.8`)
        .then(response => response.json())
        .then(data => update(data))
        .catch(error => alert('Please enter a valid IP Address'));
    }  
})

function update(data){
    //resets the map
    var container = L.DomUtil.get('mapid');

    if(container != null){
        container._leaflet_id = null;
    }

    let ip = document.getElementById('ip');
    let city = document.getElementById('city');
    let timezone = document.getElementById('timezone');
    let isp = document.getElementById('isp');

    ip.textContent = data.ip;
    city.textContent = `${data.location.city} ${data.location.country}
    ${data.location.postalCode}`;
    timezone.textContent = "UTC " + data.location.timezone;
    isp.textContent = data.isp;

    var map = L.map('mapid').setView([data.location.lat, data.location.lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([data.location.lat, data.location.lng]).addTo(map)
    .bindPopup(`${data.location.city}, ${data.location.region}`)
    .openPopup();
}

document.addEventListener('DOMContentLoaded', ()=> {
    document.querySelector('.arrow').click();
})
