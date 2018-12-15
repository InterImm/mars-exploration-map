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
    "地图底图：Color MOLA Elevation": basemapMOLAColor
};



var marsBase = new L.LayerGroup().addTo(map).setZIndex(999);

// create popup contents
var tiaozhanbaPopup = {
    base: "<div class='leaflet-popup-content-card'> <img src='assets/images/the-mars-show.png'> <h4><a href='https://m.youku.com/video/id_XMzkxODc0MTYyOA==.html?spm=a2h1n.8261147.reload_201812.1~3%213~DL~DT~A&s=f62934f3a2004c0a80e9&source=' target='_blank'>《挑战吧！太空》基地</a> </h4><br/> <p>这里是《挑战吧！太空》的基地。神秘的火星探索，将在这里展开。</p></div>"
}
var failedPopup = {
    mars2: "<div class='leaflet-popup-content-card'><img src='assets/images/Mars3_iki.jpg'> <h4>火星2号 (<a href='https://en.wikipedia.org/wiki/Mars_2'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4>火星2号是苏联于1970年代进行的火星计划的一部分。火星2号与火星3号完全相同，均包括了一个轨道飞行器和一个着陆器。它于1971年5月19日由质子-K/D组级运载火箭发射。探测器升空时，轨道飞行器重3440千克，着陆器重1210千克，轨道干质量2265千克。机体高4.1米，宽2米（太阳能板展开时，宽度为5.9米）。这是第一个在火星表面着陆的人造探测器，但最终着陆器于降落时坠毁在火星表面，因此没有获取任何探测数据和图像。轨道器则一直工作到1972年。 </div>",
    mars3: "<div class='leaflet-popup-content-card'><img src='assets/images/Mars3_iki.jpg'> <h4>火星3号 (<a href='https://en.wikipedia.org/wiki/Mars_3'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4> 火星3号（Марс-3）是苏联在1971年发射的火星探测计划的探测船。于5月28日由质子-K/D组级运载火箭发射，于在1971年12月成功登陆在火星地面。火星3号与火星2号是同一系列的探测船，都拥有1组轨道船与登陆艇。火星2号于12月27日到达火星后，登陆艇于火星表面撞毁，轨道船继续工作了8个月。而火星3号与火星2号的轨道器工作到次年8月22日宣布退役，但是火星3号的着陆器却成为了有史以来第一个成功在火星表面着陆的探测器，虽然它仅仅火星上工作了大约20秒，甚至没能发回一张完整的照片就永远与地球失去了通信联系。 </div>",
    schiaparelli: "<div class='leaflet-popup-content-card'> <img src='assets/images/Schiaparelli_Lander_Model_at_ESOC.jpg'> <h4>斯基亚帕雷利EDM登陆器 ( <a href='https://en.wikipedia.org/wiki/Schiaparelli_EDM_lander'> <i class='fa fa-wikipedia-w' aria-hidden='true'></i> </a>)</h4>斯基亚帕雷利EDM登陆器是欧洲空间局（ESA）和俄罗斯联邦太空总署（Roscosmos）合作的专案计划，用于测试新的火星软着陆方式。</div> ",
    beagle2: "<div class='leaflet-popup-content-card'>  <img src='assets/images/Beagle_2_model_at_Liverpool_Spaceport.jpg'> <h4>小猎犬2号 (<a href='https://en.wikipedia.org/wiki/Beagle_2'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a> )</h4> <p>小猎犬2号是一个由英国研发的着陆航天器，其研发目的在于搜索火星表面的生命迹象，是欧洲航天局2003年火星快车号任务的一部分。 </p> </div>",
}

var workingPopup = {
    insight: "<div class='leaflet-popup-content-card'><video autoplay loop data-autopause='false' data-fill-mode='fill' data-loop='true' data-mute='true' class='ms-slide-bgvideo' style='opacity: 1; width: 100%; margin-left: 0px;'><source src='assets/images/insight.webm' type='video/webm'><source src='assets/images/insight.mp4' type='video/mp4'><source src='/system/feature_items/ogv_videos/assets/images/insight.ogv' type='video/ogg'></video> <h4>洞察号火星探测器 (<a href='https://en.wikipedia.org/wiki/InSight'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4>洞察号是一颗用于研究火星行星内部结构的火星无人着陆探测器。洞察号于2018年5月5日在美国加州中部的范登堡空军基地成功发射。在2018年11月26日，洞察号经过近3亿英里（4.58亿公里）的旅程，成功降落在火星表面的埃律西昂平原上，它将部署地震计与热挖掘探头，并展开无线电科学实验装置，以补充对火星内部结构的研究。</div>",
    curiosity: "<div class='leaflet-popup-content-card'><img src='assets/images/348px-Curiosity_Self-Portrait_at_Big_Sky_Drilling_Site.jpg'> <h4>好奇号 (<a href='https://en.wikipedia.org/wiki/Curiosity_(rover)'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4> <p>好奇号是一辆美国宇航局火星科学实验室辖下的火星探测器，主要任务是探索火星的盖尔撞击坑，为美国宇航局火星科学实验室计划的一部分。好奇号在2011年11月26日于卡纳维拉尔角空军基地进入火星科学实验室航天器，并成功在2012年8月6日于伊奥利亚沼着陆。好奇号经过 56300 万千米的旅程，着陆时离预定着陆点布莱德柏利降落地只相差2.4千米。好奇号的任务包括：探测火星气候及地质，探测盖尔撞击坑内的环境是否曾经能够支持生命，探测火星上的水，及研究日后人类探索的可行性。好奇号的设计将是项目中的火星2020探测车任务设计基础。2012年12月，好奇号原本运行2年的探测任务被无限期延长。</p> </div>"
}

L.marker([0, -5], {
    icon: baseMarker,
    zIndexOffset: 999,
}).bindLabel('<b>《挑战吧！太空》基地</b>', {
    noHide: true,
    direction: 'right',
    offset: [20, -30]
}).bindPopup(tiaozhanbaPopup['base']).addTo(marsBase);




var marsFailedSites = new L.LayerGroup().addTo(map).setZIndex(0);

L.marker([-2.07, -6.21], {
        icon: failedMarker,
    }
).bindLabel('<b>斯基亚帕雷利EDM登陆器 | Schiaparelli EDM | 2016</b>', {
    noHide: false,
    offset: [20, -30]
}).bindPopup(failedPopup['schiaparelli']).addTo(marsFailedSites)

L.marker([10.6, 90], {
    icon: failedMarker,
}).bindLabel('<b>小猎犬 2 号 | Beagle 2 | 2003</b>', {
    noHide: true,
    direction: 'left',
    offset: [20, -30]
}).bindPopup(failedPopup['beagle2']).addTo(marsFailedSites)

L.marker([-45.653, 46.865], {
    icon: failedMarker,
}).bindLabel('<b>火星二号 | Mars 2 | 1971</b>', {
    noHide: true,
    offset: [20, -30]
}).bindPopup(failedPopup['mars2']).addTo(marsFailedSites)

L.marker([-45, 202], {
    icon: failedMarker,
}).bindLabel('<b>火星三号 | Mars 3 | 1971</b>', {
    noHide: true,
    offset: [20, -30]
}).bindPopup(failedPopup['mars3']).addTo(marsFailedSites)

L.marker([-76.57, 165.2], {
    icon: failedMarker,
}).bindLabel('<b>火星极地着陆者 | Mars Polar Lander | 1999</b>', {
    noHide: true,
    direction: 'left',
    offset: [20, -30]
}).addTo(marsFailedSites)


var marsFutureSites = new L.LayerGroup().addTo(map);



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
    }).bindPopup(workingPopup['curiosity']).addTo(marsSites),
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
    

L.marker([4.5, 135.9], {
        icon: workingMarker,
    }).bindLabel('<b>洞察号 | InSight |  2018</b>', {
        noHide: true,
        direction: 'left',
        offset: [20, -30]
    }).bindPopup(workingPopup['insight']).addTo(marsSites);
    




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