document.addEventListener("DOMContentLoaded", function () {
    let map = L.map("map", {
        center: [34.0, 9.0], // Centered in Tunisia
        zoom: 7 // Zoom level adjusted for Tunisia
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: "Map Name"
    }).addTo(map);

    // Define a custom icon for the marker
    let customIcon = L.divIcon({
        className: 'custom-icon',
        html: '<div class="marker-icon"></div><div class="city-name">City</div>',
        iconSize: [30, 42],
        iconAnchor: [15, 42]
    });

    // Add markers with custom icon
    function addMarker(lat, lng, cityName) {
        let marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);
        marker.on('click', function () {
            // Increase marker size on click
            marker.setIcon(L.divIcon({
                className: 'custom-icon larger',
                html: '<div class="marker-icon"></div><div class="city-name">' + cityName + '</div>',
                iconSize: [40, 56],
                iconAnchor: [20, 56]
            }));
            // You can add additional actions when marker is clicked
        });
    }

    // Add markers for major cities in Tunisia
    let cities = [
        { name: "Tunis", lat: 36.8065, lng: 10.1815 },
        { name: "Jandouba", lat: 36.5013, lng: 8.7792 },
        { name: "Zaghouane", lat: 36.4165, lng: 10.1423 },
        { name: "Kef", lat: 36.1751, lng: 8.7045 },
        { name: "Siliana", lat: 36.0836, lng: 9.3749 },
        { name: "Gasserine", lat: 35.1674, lng: 8.8363 },
        { name: "Bizerte", lat: 3.3736, lng: 9.9706 } // Added Bizerte
    ];

    cities.forEach(city => {
        addMarker(city.lat, city.lng, city.name);
    });

    function searchLocation() {
        let input = document.getElementById("searchInput").value;
        // Dummy coordinates for example
        let lat = 34.662582;
        let lng = 10.169837;
        let cityName = "Dummy City"; // Replace with the actual city name
        addMarker(lat, lng, cityName);
        map.setView([lat, lng], 13);
        document.getElementById("searchResult").innerText = "Searched for: " + input;
    }
});
