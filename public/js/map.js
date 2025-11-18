mapboxgl.accessToken = mapToken;

const coords = listing.geometry?.coordinates;

const centerCoords = (coords && coords.length === 2)
    ? coords
    : [73.8786, 18.5246];  


const map = new mapboxgl.Map({
    container: 'map',
    center: centerCoords,
    zoom: 10
});


if (coords && coords.length === 2) {
    new mapboxgl.Marker({ color: "red" })
        .setLngLat(coords)
        .addTo(map);
}
