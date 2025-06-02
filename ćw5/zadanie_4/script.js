const map = L.map('map').setView([52.23, 21.01], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const markers = [
    {
        coords: [52.23, 21.01],
        title: "Warszawa",
        buttonText: "Kopiuj współrzędne"
    },
    {
        coords: [52.24, 21.05],
        title: "Punkt A",
        buttonText: "Kopiuj"
    },
    {
        coords: [52.22, 20.99],
        title: "Punkt B",
        buttonText: "Kopiuj"
    }
];

markers.forEach(marker => {
    L.marker(marker.coords).addTo(map)
        .bindPopup(`
            <div class="popup-content">
                <h3>${marker.title}</h3>
                <button onclick="copyCoords(${JSON.stringify(marker.coords)})">
                    ${marker.buttonText}
                </button>
            </div>
        `).openPopup();
});


const polygon = L.polygon([
    [52.23, 21.00],
    [52.24, 21.02],
    [52.22, 21.03]
], {
    color: 'blue',
    fillOpacity: 0.5
}).addTo(map);

polygon.on('mouseover', () => {
    polygon.setStyle({ color: 'red' });
});

polygon.on('mouseout', () => {
    polygon.setStyle({ color: 'blue' });
});


window.copyCoords = function(coords) {
    navigator.clipboard.writeText(coords.join(', '));
    alert(`Skopiowano: ${coords.join(', ')}`);
};