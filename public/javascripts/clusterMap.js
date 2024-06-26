// // <!DOCTYPE html>
// // <html>
// // <head>
// // <meta charset="utf-8">
// // <title>Create and style clusters</title>
// // <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
// // <link href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet">
// // <script src="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js"></script>
// // <style>
// // body { margin: 0; padding: 0; }
// // #map { position: absolute; top: 0; bottom: 0; width: 100%; }
// // </style>
// // </head>
// // <body>
// // <div id="map"></div>

// // <script>
// // 	mapboxgl.accessToken = 'pk.eyJ1Ijoic3BodXJ0aGkwMTI1IiwiYSI6ImNsdm9vaGF4NTBsYjcyaW1nY2I2bjRpMTAifQ.6f_XzWa-UkIVStHVgEObpQ';
// //     const map = new mapboxgl.Map({
// //         container: 'map',
// //         // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
// //         style: 'mapbox://styles/mapbox/dark-v11',
// //         center: [-103.5917, 40.6699],
// //         zoom: 3
// //     });

// //     map.on('load', () => {
// //         // Add a new source from our GeoJSON data and
// //         // set the 'cluster' option to true. GL-JS will
// //         // add the point_count property to your source data.
// //         map.addSource('earthquakes', {
// //             type: 'geojson',
// //             // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
// //             // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
// //             data: 'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
// //             cluster: true,
// //             clusterMaxZoom: 14, // Max zoom to cluster points on
// //             clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
// //         });

// //         map.addLayer({
// //             id: 'clusters',
// //             type: 'circle',
// //             source: 'earthquakes',
// //             filter: ['has', 'point_count'],
// //             paint: {
// //                 // Use step expressions (https://docs.mapbox.com/style-spec/reference/expressions/#step)
// //                 // with three steps to implement three types of circles:
// //                 //   * Blue, 20px circles when point count is less than 100
// //                 //   * Yellow, 30px circles when point count is between 100 and 750
// //                 //   * Pink, 40px circles when point count is greater than or equal to 750
// //                 'circle-color': [
// //                     'step',
// //                     ['get', 'point_count'],
// //                     '#51bbd6',
// //                     100,
// //                     '#f1f075',
// //                     750,
// //                     '#f28cb1'
// //                 ],
// //                 'circle-radius': [
// //                     'step',
// //                     ['get', 'point_count'],
// //                     20,
// //                     100,
// //                     30,
// //                     750,
// //                     40
// //                 ]
// //             }
// //         });

// //         map.addLayer({
// //             id: 'cluster-count',
// //             type: 'symbol',
// //             source: 'earthquakes',
// //             filter: ['has', 'point_count'],
// //             layout: {
// //                 'text-field': ['get', 'point_count_abbreviated'],
// //                 'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
// //                 'text-size': 12
// //             }
// //         });

// //         map.addLayer({
// //             id: 'unclustered-point',
// //             type: 'circle',
// //             source: 'earthquakes',
// //             filter: ['!', ['has', 'point_count']],
// //             paint: {
// //                 'circle-color': '#11b4da',
// //                 'circle-radius': 4,
// //                 'circle-stroke-width': 1,
// //                 'circle-stroke-color': '#fff'
// //             }
// //         });

// //         // inspect a cluster on click
// //         map.on('click', 'clusters', (e) => {
// //             const features = map.queryRenderedFeatures(e.point, {
// //                 layers: ['clusters']
// //             });
// //             const clusterId = features[0].properties.cluster_id;
// //             map.getSource('earthquakes').getClusterExpansionZoom(
// //                 clusterId,
// //                 (err, zoom) => {
// //                     if (err) return;

// //                     map.easeTo({
// //                         center: features[0].geometry.coordinates,
// //                         zoom: zoom
// //                     });
// //                 }
// //             );
// //         });

// //         // When a click event occurs on a feature in
// //         // the unclustered-point layer, open a popup at
// //         // the location of the feature, with
// //         // description HTML from its properties.
// //         map.on('click', 'unclustered-point', (e) => {
// //             const coordinates = e.features[0].geometry.coordinates.slice();
// //             const mag = e.features[0].properties.mag;
// //             const tsunami =
// //                 e.features[0].properties.tsunami === 1 ? 'yes' : 'no';

// //             // Ensure that if the map is zoomed out such that
// //             // multiple copies of the feature are visible, the
// //             // popup appears over the copy being pointed to.
// //             while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
// //                 coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
// //             }

// //             new mapboxgl.Popup()
// //                 .setLngLat(coordinates)
// //                 .setHTML(
// //                     `magnitude: ${mag}<br>Was there a tsunami?: ${tsunami}`
// //                 )
// //                 .addTo(map);
// //         });

// //         map.on('mouseenter', 'clusters', () => {
// //             map.getCanvas().style.cursor = 'pointer';
// //         });
// //         map.on('mouseleave', 'clusters', () => {
// //             map.getCanvas().style.cursor = '';
// //         });
// //     });
// // </script>

// // </body>
// // </html>







// mapboxgl.accessToken = mapToken;
// const map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/light-v10',
//     center: [-103.59179687498357, 40.66995747013945],
//     zoom: 3
// });




// map.on('load', function () {
//     // Add a new source from our GeoJSON data and
//     // set the 'cluster' option to true. GL-JS will
//     // add the point_count property to your source data.
//     map.addSource('campgrounds', {
//         type: 'geojson',
//         // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
//         // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
//         data: campgrounds,
//         cluster: true,
//         clusterMaxZoom: 14, // Max zoom to cluster points on
//         clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
//     });

//     map.addLayer({
//         id: 'clusters',
//         type: 'circle',
//         source: 'campgrounds',
//         filter: ['has', 'point_count'],
//         paint: {
//             // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
//             // with three steps to implement three types of circles:
//             //   * Blue, 20px circles when point count is less than 100
//             //   * Yellow, 30px circles when point count is between 100 and 750
//             //   * Pink, 40px circles when point count is greater than or equal to 750
//             'circle-color': [
//                 'step',
//                 ['get', 'point_count'],
//                 '#00BCD4',
//                 10,
//                 '#2196F3',
//                 30,
//                 '#3F51B5'
//             ],
//             'circle-radius': [
//                 'step',
//                 ['get', 'point_count'],
//                 15,
//                 10,
//                 20,
//                 30,
//                 25
//             ]
//         }
//     });

//     map.addLayer({
//         id: 'cluster-count',
//         type: 'symbol',
//         source: 'campgrounds',
//         filter: ['has', 'point_count'],
//         layout: {
//             'text-field': '{point_count_abbreviated}',
//             'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
//             'text-size': 12
//         }
//     });

//     map.addLayer({
//         id: 'unclustered-point',
//         type: 'circle',
//         source: 'campgrounds',
//         filter: ['!', ['has', 'point_count']],
//         paint: {
//             'circle-color': '#11b4da',
//             'circle-radius': 4,
//             'circle-stroke-width': 1,
//             'circle-stroke-color': '#fff'
//         }
//     });

//     // inspect a cluster on click
//     map.on('click', 'clusters', function (e) {
//         const features = map.queryRenderedFeatures(e.point, {
//             layers: ['clusters']
//         });
//         const clusterId = features[0].properties.cluster_id;
//         map.getSource('campgrounds').getClusterExpansionZoom(
//             clusterId,
//             function (err, zoom) {
//                 if (err) return;

//                 map.easeTo({
//                     center: features[0].geometry.coordinates,
//                     zoom: zoom
//                 });
//             }
//         );
//     });

//     // When a click event occurs on a feature in
//     // the unclustered-point layer, open a popup at
//     // the location of the feature, with
//     // description HTML from its properties.
//     map.on('click', 'unclustered-point', function (e) {
//         const { popUpMarkup } = e.features[0].properties;
//         const coordinates = e.features[0].geometry.coordinates.slice();

//         // Ensure that if the map is zoomed out such that
//         // multiple copies of the feature are visible, the
//         // popup appears over the copy being pointed to.
//         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }

//         new mapboxgl.Popup()
//             .setLngLat(coordinates)
//             .setHTML(popUpMarkup)
//             .addTo(map);
//     });

//     map.on('mouseenter', 'clusters', function () {
//         map.getCanvas().style.cursor = 'pointer';
//     });
//     map.on('mouseleave', 'clusters', function () {
//         map.getCanvas().style.cursor = '';
//     });
// });
mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10', // Use a dark map style
    center: [77.4126,23.2599],
    zoom: 3.5
});




map.on('load', function () {
    // Add a new source from our GeoJSON data and
    // set the 'cluster' option to true. GL-JS will
    // add the point_count property to your source data.
    map.addSource('campgrounds', {
        type: 'geojson',
        // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
        // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
        data: campgrounds,
        cluster: true,
        clusterMaxZoom: 14, // Max zoom to cluster points on
        clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
    });

    map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
                'step',
                ['get', 'point_count'],
                '#00BCD4',
                10,
                '#2196F3',
                30,
                '#3F51B5'
            ],
            'circle-radius': [
                'step',
                ['get', 'point_count'],
                15,
                10,
                20,
                30,
                25
            ]
        }
    });

    map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'campgrounds',
        filter: ['has', 'point_count'],
        layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
        }
    });

    map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'campgrounds',
        filter: ['!', ['has', 'point_count']],
        paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
        }
    });

    // inspect a cluster on click
    map.on('click', 'clusters', function (e) {
        const features = map.queryRenderedFeatures(e.point, {
            layers: ['clusters']
        });
        const clusterId = features[0].properties.cluster_id;
        map.getSource('campgrounds').getClusterExpansionZoom(
            clusterId,
            function (err, zoom) {
                if (err) return;

                map.easeTo({
                    center: features[0].geometry.coordinates,
                    zoom: zoom
                });
            }
        );
    });

    // When a click event occurs on a feature in
    // the unclustered-point layer, open a popup at
    // the location of the feature, with
    // description HTML from its properties.
    map.on('click', 'unclustered-point', function (e) {
        const { popUpMarkup } = e.features[0].properties;
        const coordinates = e.features[0].geometry.coordinates.slice();

        // Ensure that if the map is zoomed out such that
        // multiple copies of the feature are visible, the
        // popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(popUpMarkup)
            .addTo(map);
    });

    map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
    });
    map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
    });
});
