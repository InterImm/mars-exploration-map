/***  little hack starts here ***/
L.Map = L.Map.extend({
    openPopup: function (popup) {
        //        this.closePopup();  // just comment this
        this._popup = popup;

        return this.addLayer(popup).fire('popupopen', {
            popup: this._popup
        });
    }
}); /***  end of hack ***/





var map = L.map('map', {
    center: [0, 0],
    zoom: 3
});




var baseMarker = L.ExtraMarkers.icon({
    icon: 'fa-street-view',
    markerColor: 'orange',
    shape: 'penta',
    prefix: 'fa'
});

var siteMarker = L.ExtraMarkers.icon({
    icon: 'fa-lightbulb-o',
    markerColor: 'green',
    shape: 'star',
    prefix: 'fa'
});

var failedMarker = L.ExtraMarkers.icon({
    icon: 'fa-times-circle',
    markerColor: 'yellow',
    shape: 'star',
    prefix: 'fa'
});

var futureMarker = L.ExtraMarkers.icon({
    icon: 'fa-clock-o',
    markerColor: 'blue',
    shape: 'star',
    prefix: 'fa'
});

var workingMarker = L.ExtraMarkers.icon({
    icon: 'fa-bolt',
    markerColor: 'blue',
    shape: 'star',
    prefix: 'fa'
});





var baseUrl = 'http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/';


var basemapMOLAColor = new L.tileLayer(baseUrl + 'mola-color/{z}/{x}/{y}.png', {
    attribution: '<a href="http://astrogeology.usgs.gov/search/map/Mars/GlobalSurveyor/MOLA/Mars_MGS_MOLA_ClrShade_merge_global_463m">NASA/MOLA</a> | <a href="http://interimm.org">星际移民中心</a>',
    tms: true,
    maxNativeZoom: 6,
}).addTo(map).setZIndex(0);



var baseMaps = {
    "Color MOLA Elevation": basemapMOLAColor
};



var marsBase = new L.LayerGroup().addTo(map).setZIndex(999);

// create popup contents
var customPopup = {
    base: "《挑战吧！太空》基地<br/> 这里是《挑战吧！太空》的基地",
    mars2: "<a href='https://en.wikipedia.org/wiki/Mars_2'>Wikipedia</a>",
    schiaparelli: "<a href='https://en.wikipedia.org/wiki/Schiaparelli_EDM_lander'>Wikipedia</a>",
    beagle2: " <a href='https://en.wikipedia.org/wiki/Beagle_2'>Wikipedia</a> ",
}

L.marker([0, -5], {
    icon: baseMarker,
    zIndexOffset: 999,
}).bindLabel('<b>《挑战吧！太空》基地</b>', {
    noHide: true,
    direction: 'left',
    offset: [20, -30]
}).bindPopup(customPopup['base']).addTo(marsBase);


var marsFailedSites = new L.LayerGroup().addTo(map).setZIndex(0);

L.marker([-2.07, -6.21], {
        icon: failedMarker,
    }
).bindLabel('<b>斯基亚帕雷利EDM登陆器 | Schiaparelli EDM | 2016</b>', {
    noHide: false,
    offset: [20, -30]
}).bindPopup(customPopup['schiaparelli']).addTo(marsFailedSites)

L.marker([10.6, 90], {
    icon: failedMarker,
}).bindLabel('<b>小猎犬 2 号 | Beagle 2 | 2003</b>', {
    noHide: true,
    direction: 'left',
    offset: [20, -30]
}).bindPopup(customPopup['beagle2']).addTo(marsFailedSites)

L.marker([-45.653, 46.865], {
    icon: failedMarker,
}).bindLabel('<b>火星二号 | Mars 2 | 1971</b>', {
    noHide: true,
    offset: [20, -30]
}).addTo(marsFailedSites)

L.marker([-45, 202], {
    icon: failedMarker,
}).bindLabel('<b>火星三号 | Mars 3 | 1971</b>', {
    noHide: true,
    offset: [20, -30]
}).addTo(marsFailedSites)

L.marker([-76.57, 165.2], {
    icon: failedMarker,
}).bindLabel('<b>火星极地着陆者 | Mars Polar Lander | 1999</b>', {
    noHide: true,
    direction: 'left',
    offset: [20, -30]
}).addTo(marsFailedSites)


var marsFutureSites = new L.LayerGroup().addTo(map);

L.marker([3.4, 136.5], {
    icon: futureMarker,
}).bindLabel('<b>洞察号 | InSight |  2018</b>', {
    noHide: true,
    direction: 'left',
    offset: [20, -30]
}).addTo(marsFutureSites);



var marsSites = new L.LayerGroup().addTo(map);


L.marker([22.485, 310.034], {
    icon: siteMarker,
}).bindLabel('<b>海盗 1 号 | Viking 1 | 1975</b>', {
    noHide: true,
    direction: 'left',
    offset: [20, -30]
}).addTo(marsSites),
L.marker([48.269, 134.015], {
    icon: siteMarker,
}).bindLabel('<b>海盗 2 号 | Viking 2 | 1975</b>', {
    noHide: true,
    offset: [20, -30]
}).addTo(marsSites),
L.marker([19.136, 326.781], {
    icon: siteMarker,
}).bindLabel('<b>火星探路者 | Pathfinder | 1996</b>', {
    noHide: true,
    direction: 'left',
    offset: [20, -30]
}).addTo(marsSites),
L.marker([68.22, -125.7], {
    icon: siteMarker,
}).bindLabel('<b>凤凰号 | Pheonix | 2007</b>', {
    noHide: true,
    offset: [20, -30]
}).addTo(marsSites),




L.marker([-4.590, 137.442], {
        icon: workingMarker,
    }).bindLabel('<b>好奇号 | Curiosity | 2011</b>', {
        noHide: true,
        offset: [20, -30]
    }).addTo(marsSites),
    L.marker([-14.568, 175.473], {
        icon: siteMarker,
    }).bindLabel('<b>勇气号 | Spirit | 2003</b>', {
        noHide: true,
        offset: [20, -30]
    }).addTo(marsSites),
    L.marker([-1.946, 354.473], {
        icon: siteMarker,
    }).bindLabel('<b>机遇号 | Opportunity | 2003</b>', {
        noHide: true,
        offset: [20, -30]
    }).addTo(marsSites);
    





var mapLegends = new L.LayerGroup().addTo(map);


// Using color legends data from http://astrogeology.usgs.gov/search/map/Mars/GlobalSurveyor/MOLA/Mars_MGS_MOLA_ClrShade_merge_global_463m

function getColor(d) {
    return d >= 21000 ? 'rgb(181,251,254)' :
        d >= 20000 ? 'rgb(218,253,255)' :
        d >= 19000 ? 'rgb(255,255,255)' :
        d >= 18000 ? 'rgb(252,249,249)' :
        d >= 17000 ? 'rgb(249,244,243)' :
        d >= 16000 ? 'rgb(248,241,239)' :
        d >= 15000 ? 'rgb(246,238,236)' :
        d >= 14000 ? 'rgb(238,223,218)' :
        d >= 13000 ? 'rgb(229,208,201)' :
        d >= 12000 ? 'rgb(221,193,185)' :
        d >= 11000 ? 'rgb(211,179,170)' :
        d >= 9000 ? 'rgb(194,153,141)' :
        d >= 8000 ? 'rgb(186,141,128)' :
        d >= 7000 ? 'rgb(177,130,116)' :
        d >= 6000 ? 'rgb(168,119,105)' :
        d >= 5000 ? 'rgb(190,107,91)' :
        d >= 3000 ? 'rgb(226,111,69)' :
        d >= 2000 ? 'rgb(240,147,67)' :
        d >= 1000 ? 'rgb(254,188,63)' :
        d >= 0 ? 'rgb(243,254,38)' :
        d >= -1000 ? 'rgb(148,239,38)' :
        d >= -2000 ? 'rgb(66,225,38)' :
        d >= -3000 ? 'rgb(38,230,170)' :
        d >= -4000 ? 'rgb(38,134,235)' :
        d >= -5000 ? 'rgb(38,62,223)' :
        d >= -6000 ? 'rgb(76,38,211)' :
        d >= -7000 ? 'rgb(130,38,199)' :
        d >= -8000 ? 'rgb(129,38,152)' :
        'rgb(104,38,103)';
}

var legend = L.control({
    position: 'bottomright'
});

legend.onAdd = function (map) {



    var div = L.DomUtil.create('div', 'info legend'),
        grades = [-9000, -8000, -7000, -6000, -5000, -4000, -3000, -2000, -1000, 0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 11000, 12000, 13000, 14000, 15000, 16000, 18000, 19000, 20000, 21000],
        labels = [];



    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i]) + '"></i> ' +
            grades[i] + (grades[i + 1] + 1 ? ' &ndash; ' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);




var overlayMaps = {
    "《挑战吧！太空》": marsBase,
    "成功着陆的火星探测器": marsSites,
    "失败的火星探测器": marsFailedSites,
    "尚未着陆的火星探测器": marsFutureSites
}


L.control.layers(baseMaps, overlayMaps).addTo(map);