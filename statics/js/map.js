var adi = adi || {};
adi.map = adi.map || {};
adi.map.mapCanvas;


    //Mapbox stuff --------->
    mapboxgl.accessToken = 'pk.eyJ1IjoicGVudGhpdXN4IiwiYSI6ImNrMjIzMXh0djFrdWYzY3FnZDFxcTNsbW4ifQ.Y_mD0GTT-cPOcmfIeZuPjg';
    adi.map.mapCanvas = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/mapbox/dark-v9',
         style: 'mapbox://styles/mapbox/streets-v11',
        center: [-77.03, 38.91],
        zoom: 9,
        bearing: 0,
        preserveDrawingBuffer: true
    });