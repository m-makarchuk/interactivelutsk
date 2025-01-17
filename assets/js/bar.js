
const targetLatitude = 50.4501;  // Наприклад, для Києва
const targetLongitude = 30.5244; // Наприклад, для Києва
const targetRadius = 500000; // Радіус в метрах (наприклад, 500 м)


function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Радіус Землі в кілометрах
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // відстань в метрах
    return distance;
}


function toRad(degrees) {
    return degrees * Math.PI / 180;
}


function checkLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const currentLatitude = position.coords.latitude;
            const currentLongitude = position.coords.longitude;


            const distance = calculateDistance(currentLatitude, currentLongitude, targetLatitude, targetLongitude);
            console.log('Відстань: ' + distance + ' м');

            if (distance <= targetRadius) {
                document.getElementById('madonna').style.display = 'block';
            } else {
                document.getElementById('madonna').style.display = 'none';
            }
        }, function(error) {
            console.error('Помилка геолокації:', error);
        });
    } else {
        console.error('Геолокація не підтримується вашим браузером.');
    }
}

setInterval(checkLocation, 5000);
