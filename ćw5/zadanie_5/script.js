const map = L.map('map').setView([52.23, 21.01], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function isValidCoord(value) {
    return !isNaN(value) && value >= -90 && value <= 90;
}

document.getElementById('addMarker').addEventListener('click', () => {
    const latInput = document.getElementById('lat');
    const lngInput = document.getElementById('lng');
    const titleInput = document.getElementById('title');
    const buttonTextInput = document.getElementById('buttonText');
    
    const lat = parseFloat(latInput.value);
    const lng = parseFloat(lngInput.value);
    const title = titleInput.value.trim() || "Nowy marker";
    const buttonText = buttonTextInput.value.trim() || "Kopiuj współrzędne";

    let isValid = true;
    if (!isValidCoord(lat)) {
        document.getElementById('lat-error').textContent = "Nieprawidłowa szerokość geograficzna!";
        isValid = false;
    } else {
        document.getElementById('lat-error').textContent = "";
    }

    if (!isValidCoord(lng)) {
        document.getElementById('lng-error').textContent = "Nieprawidłowa długość geograficzna!";
        isValid = false;
    } else {
        document.getElementById('lng-error').textContent = "";
    }

    if (!isValid) return;

    L.marker([lat, lng]).addTo(map)
        .bindPopup(`
            <div class="popup-content">
                <h3>${title}</h3>
                <button onclick="copyCoords([${lat}, ${lng}])">
                    ${buttonText}
                </button>
            </div>
        `).openPopup();

    latInput.value = "";
    lngInput.value = "";
    titleInput.value = "";
    buttonTextInput.value = "";
});

window.copyCoords = function(coords) {
    navigator.clipboard.writeText(coords.join(', '));
    alert(`Skopiowano: ${coords.join(', ')}`);
};