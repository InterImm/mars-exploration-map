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
    marspolarlander: "<div class='leaflet-popup-content-card'>  <img src='assets/images/Mars_Polar_Lander_artist_depiction.png'> <h4>火星极地着陆者号 (<a href='https://en.wikipedia.org/wiki/Mars_Polar_Lander'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a> )</h4> <p>火星极地着陆者号（Mars Polar Lander）是美国国家航空航天局的火星探测卫星，也是火星探测98计划（Mars Surveyor '98 mission）的一部分，于1999年发射。火星极地着陆者号也搭载深太空二号（Deep Space 2）探测器升空，预计登陆火星南极。</p><p>火星极地着陆者号后来在登陆火星的过程中失去联络，任务失败。失败原因很可能是程式发生错误，所以逆喷射引擎在距离地表40米的地方关闭，导致火星极地着陆者号坠毁在火星表面。</p> </div>"
}

var workingPopup = {
    insight: "<div class='leaflet-popup-content-card'><video autoplay loop data-autopause='false' data-fill-mode='fill' data-loop='true' data-mute='true' class='ms-slide-bgvideo' style='opacity: 1; width: 100%; margin-left: 0px;'><source src='assets/images/insight.webm' type='video/webm'><source src='assets/images/insight.mp4' type='video/mp4'><source src='/system/feature_items/ogv_videos/assets/images/insight.ogv' type='video/ogg'></video> <h4>洞察号火星探测器 (<a href='https://en.wikipedia.org/wiki/InSight'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4>洞察号是一颗用于研究火星行星内部结构的火星无人着陆探测器。洞察号于2018年5月5日在美国加州中部的范登堡空军基地成功发射。在2018年11月26日，洞察号经过近3亿英里（4.58亿公里）的旅程，成功降落在火星表面的埃律西昂平原上，它将部署地震计与热挖掘探头，并展开无线电科学实验装置，以补充对火星内部结构的研究。</div>",
    curiosity: "<div class='leaflet-popup-content-card'><img src='assets/images/348px-Curiosity_Self-Portrait_at_Big_Sky_Drilling_Site.jpg'> <h4>好奇号 (<a href='https://en.wikipedia.org/wiki/Curiosity_(rover)'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4> <p>好奇号是一辆美国宇航局火星科学实验室辖下的火星探测器，主要任务是探索火星的盖尔撞击坑，为美国宇航局火星科学实验室计划的一部分。好奇号在2011年11月26日于卡纳维拉尔角空军基地进入火星科学实验室航天器，并成功在2012年8月6日于伊奥利亚沼着陆。好奇号经过 56300 万千米的旅程，着陆时离预定着陆点布莱德柏利降落地只相差2.4千米。好奇号的任务包括：探测火星气候及地质，探测盖尔撞击坑内的环境是否曾经能够支持生命，探测火星上的水，及研究日后人类探索的可行性。好奇号的设计将是项目中的火星2020探测车任务设计基础。2012年12月，好奇号原本运行2年的探测任务被无限期延长。</p> </div>"
}

var successfulPopup = {
    opportunity: "<div class='leaflet-popup-content-card'><img src='assets/images/opportunity.jpg'> <h4>机遇号 (<a href='https://en.wikipedia.org/wiki/Opportunity_(rover)'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4> <p> 机遇号，亦称为机会号或火星探测漫游者-B（MER-B），是一个于2004年进行火星探测任务的地表漫游车；它是NASA目前火星探测漫游车任务的两辆中的其中一辆。它在2003年从地球发射，并于2004年1月25日降落在子午线高原。机遇号惊险的在2007年的沙尘暴中存活了下来，现在位在奋斗撞击坑西边的“Perseverance Valley”。</p> <p>受到火星2018年6月至8月间发生全球性沙尘暴阻隔阳光的影响，机遇号自该年6月12日起中断和地球的通讯，进入低电量休眠状态。控制中心在此后长达115个火星日间（逾三个月）无从得知机遇号的行踪与状态，直到该年9月20日才经由环绕火星轨道的火星侦察轨道卫星所传回的影像确认机遇号的位置。不过机遇号迄今仍处于休眠模式，截至2018年10月止，NASA尚未与机遇号恢复联系。</p> </div>",
    spirit: "<div class='leaflet-popup-content-card'><img src='assets/images/spirit.jpg'> <h4>勇气号 (<a href='https://en.wikipedia.org/wiki/Spirit_(rover)'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4> <p> 勇气号的主要任务是探测火星上是否存在水和生命，并分析其物质成分，评估火星上的环境是否有益于生命。2003年6月10日发射，2004年1月3日着陆火星表面。最初预计的工作寿命只有三个月。</p><p>由于太阳能电池板的蒙尘，勇气号的电力供应一直在持续下降；幸运的是，2005年3月12日和2009年2月6日的两次大风吹散了尘埃，使得其电力得到恢复。</p><p>2006年，六只车轮中的右前轮失灵。</p><p>2009年5月，在通过特洛伊沙地时，车轮陷入软土，又使其中一个故障，勇气号无法动弹，之后的观测一直被限制在原地，此后有过几次解救行动但都失败。2010年1月26日，NASA宣布放弃拯救，勇气号从此转为静止观测平台。</p><p>2011年3月22日，NASA最后一次联络上勇气号。2011年5月24日，NASA在最后一次尝试联络后结束勇气号的任务。</p> </div>",
    viking1: "<div class='leaflet-popup-content-card'><img src='assets/images/viking1.jpg'> <h4>海盗1号 (<a href='https://en.wikipedia.org/wiki/Viking_1'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4> <p>海盗号是美国国家航空航天局维京号计划中两艘飞往火星中的第一艘。于 1976 年 7 月 20 号在火星软着陆，是第二艘在火星上软着陆的探测器，也是第一艘在火星上软着陆并且完成任务的探测器。</p><p>在机遇号之前，海盗1号是火星表面任务最长记录的保持者，长达2307天，也就是超过了六年的时间。</p> </div>",
    viking2: "<div class='leaflet-popup-content-card'><img src='assets/images/viking1.jpg'> <h4>海盗2号 (<a href='https://en.wikipedia.org/wiki/Viking_2'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4> <p>海盗2号任务为火星海盗号计划的一部分，其轨道卫星及着陆器基本上与海盗1号的相同。海盗2号的着陆器在火星表面工作了1281个火星日，最终在电池失效后，于1980年4月11日停止运作。轨道卫星则工作到1978年7月25日，共环绕火星706周，传回了近16000份图像。</p></div>",
    pathfinder: "<div class='leaflet-popup-content-card'><img src='assets/images/pathfinder.jpg'> <h4>火星探路者号 (<a href='https://en.wikipedia.org/wiki/Mars_Pathfinder'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4> <p>火星探路者号是一艘在1997年携带探测车登陆火星且建立临时基地的探测器。</p> <p>火星探路者号任务证明了一些创新技术，例如安全气囊和自动回避障碍，这两项在后续的火星车任务都在采用。</p></div>",
    pheonix: "<div class='leaflet-popup-content-card'><img src='assets/images/Phoenix_landing.jpg'> <h4>凤凰号火星探测器 (<a href='https://en.wikipedia.org/wiki/Phoenix_(spacecraft)'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4> <p>凤凰号是美国国家航空航天局于2003年基于火星侦察兵计划而启动的火星探测项目，凤凰号于2007年8月4日发射，在2008年5月25日成功在火星北极软着陆。这项计划的主要目的是将一枚着陆器送往火星的北极地区，对火星的极地环境进行探测，搜索适合火星上微生物生存的环境，并研究那里的水的历史。</p> <p>除了拍摄照片和气象观测等任务，凤凰号还搭载了长约2.3米的机械臂，它可以向下挖掘，并将挖掘所得的土壤样本送回凤凰号，使用搭载的科学仪器对土壤中的水冰和其他物质（例如矿物，可能的生命物质等）加以分析。</p></div>",
    zhurong: "<div class='leaflet-popup-content-card'><img src='assets/images/1920px-Artist’s_impression_of_the_Tianwen-1_mission.jpeg'> <h4>祝融号火星车 (<a href='https://zh.wikipedia.org/wiki/%E7%A5%9D%E8%9E%8D%E5%8F%B7%E7%81%AB%E6%98%9F%E8%BD%A6'><i class='fa fa-wikipedia-w' aria-hidden='true'></i></a>)</h4> <p>祝融号火星车是由中国空间技术研究院制造，搭载在天问一号着陆器上执行火星探测任务的火星车。该探测器于2020年7月23日12时41分由长征五号遥四运载火箭从海南文昌航天发射场发射升空，2021年5月15日上午7时18分在火星乌托邦平原南部预选着陆区着陆。</p> <p>祝融号火星车重240公斤，携带有地形相机、多光谱相机、次表层探测雷达、磁强计以及成分探测仪等共6台科学载荷。祝融号火星车是第一辆搭载磁场探测仪的探测车。</p></div>"
}

// L.marker([0, -5], {
//     icon: baseMarker,
//     zIndexOffset: 999,
// }).bindLabel('<b>《挑战吧！太空》基地</b>', {
//     noHide: true,
//     direction: 'right',
//     offset: [20, -30]
// }).bindPopup(tiaozhanbaPopup['base']).addTo(marsBase);




var marsFailedSites = new L.LayerGroup().addTo(map).setZIndex(0);

L.marker([-2.07, -6.21], {
        icon: failedMarker,
    }
).bindLabel('<b>斯基亚帕雷利EDM登陆器 | Schiaparelli EDM | 2016</b>', {
    noHide: true,
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
}).bindPopup(failedPopup['marspolarlander']).addTo(marsFailedSites)


var marsFutureSites = new L.LayerGroup().addTo(map);



var marsSites = new L.LayerGroup().addTo(map);


L.marker([22.485, 310.034], {
    icon: siteMarker,
}).bindLabel('<b>海盗 1 号 | Viking 1 | 1975</b>', {
    noHide: true,
    direction: 'left',
    offset: [20, -30]
}).bindPopup(successfulPopup['viking1']).addTo(marsSites),
L.marker([48.269, 134.015], {
    icon: siteMarker,
}).bindLabel('<b>海盗 2 号 | Viking 2 | 1975</b>', {
    noHide: true,
    offset: [20, -30]
}).bindPopup(successfulPopup['viking2']).addTo(marsSites),
L.marker([19.136, 326.781], {
    icon: siteMarker,
}).bindLabel('<b>火星探路者 | Pathfinder | 1996</b>', {
    noHide: true,
    direction: 'left',
    offset: [20, -30]
}).bindPopup(successfulPopup['pathfinder']).addTo(marsSites),
L.marker([68.22, -125.7], {
    icon: siteMarker,
}).bindLabel('<b>凤凰号 | Pheonix | 2007</b>', {
    noHide: true,
    offset: [20, -30]
}).bindPopup(successfulPopup['pheonix']).addTo(marsSites),
L.marker([25.1, 109.9], {
    icon: siteMarker,
}).bindLabel('<b>祝融号 | Zhurong | 2021</b>', {
    noHide: true,
    offset: [20, -30]
}).bindPopup(successfulPopup['zhurong']).addTo(marsSites),




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
    }).bindPopup(successfulPopup['spirit']).addTo(marsSites),
    L.marker([-1.946, 354.473], {
        icon: siteMarker,
    }).bindLabel('<b>机遇号 | Opportunity | 2003</b>', {
        noHide: true,
        offset: [20, -30]
    }).bindPopup( successfulPopup['opportunity'] ).addTo(marsSites);


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
    // "《挑战吧！太空》": marsBase,
    "成功着陆的火星探测器": marsSites,
    "失败的火星探测器": marsFailedSites,
    "尚未着陆的火星探测器": marsFutureSites
}


L.control.layers(baseMaps, overlayMaps).addTo(map);