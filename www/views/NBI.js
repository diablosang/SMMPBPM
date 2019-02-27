Mobile.NBI = function (params) {
    "use strict";

    var viewModel = {
        title: ko.observable(""),
        inited:false,
        hideFoot: true,
        indicatorVisible: ko.observable(false),
        intevalPool: {},
        //ITEM: [
        //    { ITEMID: "item1", ITEMTYPE: "CHART", POS_X: 1, POS_Y: 1, SIZE_W: 2, SIZE_H: 1, TABLEID: "T1" },
        //    { ITEMID: "item2", ITEMTYPE: "MAP", POS_X: 3, POS_Y: 1, SIZE_W: 3, SIZE_H: 3 },
        //    { ITEMID: "item3", ITEMTYPE: "GRID", POS_X: 1, POS_Y: 2, SIZE_W: 2, SIZE_H: 2, TABLEID: "T2" },
        //    { ITEMID: "item4", ITEMTYPE: "PIVOT", POS_X: 1, POS_Y: 4, SIZE_W: 2, SIZE_H: 2, TABLEID: "T3" },
        //    { ITEMID: "item5", ITEMTYPE: "GAUGE", POS_X: 6, POS_Y: 1, SIZE_W: 1, SIZE_H: 1, TABLEID: "T4" },
        //    { ITEMID: "item6", ITEMTYPE: "GAUGE", POS_X: 6, POS_Y: 2, SIZE_W: 1, SIZE_H: 1, TABLEID: "T4" },
        //    { ITEMID: "item7", ITEMTYPE: "CHART", POS_X: 3, POS_Y: 4, SIZE_W: 2, SIZE_H: 2, TABLEID: "T5" },
        //    { ITEMID: "item8", ITEMTYPE: "CHART", POS_X: 5, POS_Y: 4, SIZE_W: 2, SIZE_H: 2, TABLEID: "T6" },
        //    { ITEMID: "item9", ITEMTYPE: "GAUGE", POS_X: 6, POS_Y: 3, SIZE_W: 1, SIZE_H: 1, TABLEID: "T4" },
        //],
        //ITEMP: {
        //    "item1": {
        //        commonSeriesSettings: {
        //            argumentField: "PAR_TIME",
        //            type: "line"
        //        },
        //        series: [
        //            {
        //                name: "尺寸", type: "line", valueField: "SIZE", point: {
        //                    size: 7
        //                }, label: { visible: true, backgroundColor: "transparent", font: { color: "black" } }, ignoreEmptyPoints: true
        //            },
        //            {
        //                name: "目标尺寸", type: "line", valueField: "SIZE_S", point: {
        //                    visible: false, ignoreEmptyPoints: true
        //                }
        //            }
        //        ],
        //        argumentAxis: {
        //            argumentType: "datetime",
        //            label: {
        //                format: "MM-dd HH:mm"
        //            }
        //        },
        //        legend: {
        //            verticalAlignment: "top",
        //            horizontalAlignment: "right",
        //            itemTextPosition: "bottom"
        //        },
        //        tooltip: {
        //            enabled: true,
        //            argumentFormat: "MM-dd HH:mm",
        //            customizeTooltip: function (e) {
        //                return { text: e.value + "<br/>" + e.argumentText };
        //            },
        //            zIndex: 99
        //        },
        //        title: {
        //            text: "尺寸检测跟踪"
        //        }
        //    },
        //    "item3": {
        //        dateSerializationFormat: "yyyy-MM-dd",
        //        columnAutoWidth: true,
        //        columns: [
        //            { dataField: "CODE_EQP", caption: "设备", allowEditing: false, allowSorting: false },
        //            { dataField: "ID_WO", caption: "工单", allowEditing: false, allowSorting: false },
        //            { dataField: "CODE_ITEM", caption: "物料", allowEditing: false, allowSorting: false },
        //            { dataField: "QTY_PLAN", caption: "计划", allowEditing: false, allowSorting: false },
        //            { dataField: "QTY_COMP", caption: "完工", allowEditing: false, allowSorting: false }
        //        ],
        //        selection: {
        //            mode: "single"
        //        },
        //        paging: {
        //            enabled: false
        //        },
        //    },
        //    "item4": {
        //        dataSource: {
        //            fields: [{
        //                caption: "状态",
        //                dataField: "STATUS_OP",
        //                area: "column"
        //            },
        //            {
        //                caption: "车间",
        //                dataField: "CODE_LINE",
        //                width: 150,
        //                area: "row"
        //            },
        //            {
        //                caption: "数量",
        //                dataField:"CODE_EQP",
        //                dataType: "number",
        //                summaryType: "count",
        //                area: "data"
        //            }],
        //        }
        //    },
        //    "item5": {
        //        scale: {
        //            startValue: 0,
        //            endValue: 1000,
        //            tickInterval: 100,
        //            label: {
        //                useRangeColors: true
        //            }
        //        },
        //        rangeContainer: {
        //            palette: "pastel",
        //            ranges: [
        //                { startValue: 0, endValue: 300 },
        //                { startValue: 300, endValue: 800 },
        //                { startValue: 800, endValue: 1000 }
        //            ]
        //        },
        //        title: {
        //            text: "主轴转速"
        //        },
        //        valueField: "ZZ"
        //    },
        //    "item6": {
        //        scale: {
        //            startValue: 0,
        //            endValue: 1000,
        //            tickInterval: 100,
        //            label: {
        //                useRangeColors: true
        //            }
        //        },
        //        rangeContainer: {
        //            palette: "pastel",
        //            ranges: [
        //                { startValue: 0, endValue: 300 },
        //                { startValue: 300, endValue: 800 },
        //                { startValue: 800, endValue: 1000 }
        //            ]
        //        },
        //        title: {
        //            text: "料盘转速"
        //        },
        //        valueField: "LP"
        //    },
        //    "item7": {
        //        chartType:"pie",
        //        series: {
        //            argumentField: "DESC_OP",
        //            valueField: "COUNT",
        //            label: {
        //                visible: true
        //            }
        //        },
        //        title: {
        //            text: "质检不合格工序分布"
        //        },
        //        tooltip: {
        //            enabled:true
        //        }
        //    },
        //    "item8": {
        //        commonSeriesSettings: {
        //            argumentField: "QT",
        //            type: "bar"
        //        },
        //        series: [
        //            {
        //                name: "热处理车间01", type: "bar", valueField: "QTY1", label: { visible: true, backgroundColor: "transparent", font: { color: "black" } }, ignoreEmptyPoints: true, color: "yellow"
        //            },
        //            {
        //                name: "热处理车间01", type: "bar", valueField: "QTY2", label: { visible: true, backgroundColor: "transparent", font: { color: "black" } }, ignoreEmptyPoints: true
        //            },
        //            {
        //                name: "热处理车间03", type: "bar", valueField: "QTY3", label: { visible: true, backgroundColor: "transparent", font: { color: "black" } }, ignoreEmptyPoints: true
        //            }
        //        ],
        //        argumentAxis: {
        //            argumentType: "string"
        //        },
        //        legend: {
        //            verticalAlignment: "top",
        //            horizontalAlignment: "right",
        //            itemTextPosition: "bottom"
        //        },
        //        tooltip: {
        //            enabled: true,
        //            customizeTooltip: function (e) {
        //                return { text: e.value + "<br/>" + e.argumentText };
        //            },
        //            zIndex: 99
        //        },
        //        title: {
        //            text: "产能对比"
        //        }
        //    },
        //    "item9": {
        //        gaugeType: "linear",
        //        geometry: {
        //            orientation:"vertical"
        //        },
        //        scale: {
        //            startValue: 0,
        //            endValue: 5,
        //            tickInterval: 1,
        //            label: {
        //                useRangeColors: true
        //            }
        //        },
        //        rangeContainer: {
        //            palette: "pastel",
        //            ranges: [
        //                { startValue: 0, endValue: 1 },
        //                { startValue: 1, endValue: 3 },
        //                { startValue: 3, endValue: 5 }
        //            ]
        //        },
        //        title: {
        //            text: "压力"
        //        },
        //        valueField: "YL"
        //    },
        //},
        //NBIDATA: {
        //    "T1": [
        //        { PAR_TIME: Date.parse("2018-01-11T10:00:00+08:00"), SIZE: 15, SIZE_S: 10 },
        //        { PAR_TIME: Date.parse("2018-01-11T11:00:00+08:00"), SIZE: 12, SIZE_S: 10 },
        //        { PAR_TIME: Date.parse("2018-01-11T12:00:00+08:00"), SIZE: 17, SIZE_S: 10 },
        //        { PAR_TIME: Date.parse("2018-01-11T13:00:00+08:00"), SIZE: 18, SIZE_S: 10 },
        //        { PAR_TIME: Date.parse("2018-01-11T14:00:00+08:00"), SIZE: 9, SIZE_S: 10 },
        //        { PAR_TIME: Date.parse("2018-01-11T15:00:00+08:00"), SIZE: 5, SIZE_S: 10 }
        //    ],
        //    "T2": [
        //        { CODE_EQP: "L1-01", ID_WO: "1m1100918", CODE_ITEM: "06747-010M01R3-01", QTY_PLAN: 1000, QTY_COMP: 0 },
        //        { CODE_EQP: "L1-01", ID_WO: "1m1100917", CODE_ITEM: "06747-010M01R3-01", QTY_PLAN: 500, QTY_COMP: 100 },
        //        { CODE_EQP: "L1-02", ID_WO: "1m1100916", CODE_ITEM: "06747-010M01R3-02", QTY_PLAN: 2000, QTY_COMP: 600 },
        //        { CODE_EQP: "L1-02", ID_WO: "1m1100915", CODE_ITEM: "06747-010M01R3-02", QTY_PLAN: 800, QTY_COMP: 400 },
        //        { CODE_EQP: "L1-02", ID_WO: "1m1100914", CODE_ITEM: "06747-010M01R3-02", QTY_PLAN: 500, QTY_COMP: 400 },
        //        { CODE_EQP: "L1-03", ID_WO: "1m1100913", CODE_ITEM: "06747-010M01R3-03", QTY_PLAN: 1000, QTY_COMP: 700 },
        //        { CODE_EQP: "L1-03", ID_WO: "1m1100912", CODE_ITEM: "06747-010M01R3-03", QTY_PLAN: 200, QTY_COMP: 150 },
        //    ],
        //    "T3": [
        //        { CODE_LINE: "研发中心高精密工段", CODE_EQP: "L1-01", STATUS_OP:"运营中" },
        //        { CODE_LINE: "研发中心高精密工段", CODE_EQP: "L1-02", STATUS_OP:"运营中" },
        //        { CODE_LINE: "研发中心高精密工段", CODE_EQP: "L1-03", STATUS_OP:"空闲中" },
        //        { CODE_LINE: "研发中心高精密工段", CODE_EQP: "L1-04", STATUS_OP:"空闲中" },
        //        { CODE_LINE: "研发中心高精密工段", CODE_EQP: "L1-05", STATUS_OP:"维修中" },
        //        { CODE_LINE: "热处理分公司", CODE_EQP: "L2-01", STATUS_OP:"运营中" },
        //        { CODE_LINE: "热处理分公司", CODE_EQP: "L2-02", STATUS_OP:"运营中" },
        //        { CODE_LINE: "热处理分公司", CODE_EQP: "L2-03", STATUS_OP:"空闲中" },
        //        { CODE_LINE: "热处理车间01", CODE_EQP: "L3-04", STATUS_OP:"运营中" },
        //        { CODE_LINE: "热处理车间01", CODE_EQP: "L3-05", STATUS_OP:"运营中" },
        //        { CODE_LINE: "热处理车间01", CODE_EQP: "L3-04", STATUS_OP:"维修中" },
        //        { CODE_LINE: "热处理车间01", CODE_EQP: "L3-05", STATUS_OP:"空闲中" },
        //        { CODE_LINE: "热处理车间02", CODE_EQP: "L3-04", STATUS_OP:"运营中" },
        //        { CODE_LINE: "热处理车间02", CODE_EQP: "L3-05", STATUS_OP:"运营中" },
        //        { CODE_LINE: "热处理车间02", CODE_EQP: "L3-04", STATUS_OP:"运营中" },
        //        { CODE_LINE: "热处理车间02", CODE_EQP: "L3-05", STATUS_OP:"空闲中" }
        //    ],
        //    "T4": [
        //        {ZZ:375,LP:572,YL:2.05}
        //    ],
        //    "T5": [
        //        { DESC_OP: "热处理", COUNT: 5 },
        //        { DESC_OP: "磨球", COUNT: 3 },
        //        { DESC_OP: "探伤", COUNT: 4 },
        //        { DESC_OP: "成品探伤", COUNT: 2 },
        //        { DESC_OP: "车间质检", COUNT: 1 },
        //    ],
        //    "T6": [
        //        { QT: "1季度", QTY1: 500, QTY2: 1000, QTY3: 1200 },
        //        { QT: "2季度", QTY1: 700, QTY2: 1200, QTY3: 1600 },
        //        { QT: "3季度", QTY1: 400, QTY2: 1200, QTY3: 1600 },
        //        { QT: "4季度", QTY1: 800, QTY2: 1200, QTY3: 1200 }
        //    ]
        //},
        viewShown: function (e) {
            if (this.inited == false) {
                if (GetDeviceType() == "PC") {
                    Logon();
                }
                else {
                    LoadNBIInfo();
                }
                
            }
            else {
                BindView();
            }     
        },
        viewHidden: function (e) {
            for (var key in this.intevalPool) {
                var intevalID = this.intevalPool[key];
                clearInterval(intevalID);
            }
        }
    };

    function Logon() {
        $("#WebApiServerURL")[0].value = "http://localhost:61862";


        var sessionStorage = window.sessionStorage;
        if (sessionStorage.baiduchn != null) {
            viewModel.chn(sessionStorage.baiduchn);
        }

        var devicetype = GetDeviceType();
        var u = "ADMIN";
        var postData = {
            UserName:u,
            Password: "sangguowei",
            CHN: "",
            DeviceID: "",
            DeviceType: devicetype,
            Lang: DeviceLang()
        };
        var url = $("#WebApiServerURL")[0].value + "/Api/Asapment/Logon2";
        $.ajax({
            type: 'POST',
            url: url,
            data: postData,
            cache: false,
            success: function (data, textStatus) {
                sessionStorage.removeItem("username");
                sessionStorage.setItem("username", u);
                viewModel.inited = true;
                LoadNBIInfo();
                $(window).resize(function () {
                    BindView();
                });
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                ServerError(xmlHttpRequest.responseText);
            }
        });
    }

    function LoadNBIInfo() {
        if (viewModel == null) {
            return;
        }

        var url = $("#WebApiServerURL")[0].value + "/Api/Asapment/GetNBIInfo";
        var u = sessionStorage.getItem("username");
        var postData = {
            userName: u,
            func: params.func
        }

        $.ajax({
            type: 'POST',
            url: url,
            data: postData,
            async: false,
            cache: false,
            success: function (data, textStatus) {
                viewModel.ITEM = data.ITEM;
                viewModel.ITEMP = data.ITEMP;
                viewModel.title(data.TITLE);
                LoadNBIData();
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                ServerError(xmlHttpRequest.responseText);
            }
        });
    }

    function LoadNBIData() {
        var u = sessionStorage.getItem("username");
        var url = $("#WebApiServerURL")[0].value + "/Api/Asapment/GetNBIData";
        var postData = {
            userName: u,
            func: params.func,
            group: params.group
        }
        $.ajax({
            type: 'POST',
            url: url,
            data: postData,
            async: false,
            cache: false,
            success: function (data, textStatus) {
                viewModel.NBIDATA = data;
                BindView();

                var items = viewModel.ITEM;
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (item.AUTOUPD > 0) {
                        AutoUpdateData(item.ITEMID, item.AUTOUPD);
                    }
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                ServerError(xmlHttpRequest.responseText);
            }
        });

    }

    function BindView() {
        var items = viewModel.ITEM;
        var gap = 5;
        var cols = parseInt(items[0].SIZE);
        var pageWidth = $(document.body).width();
        var itemWidth = parseInt((pageWidth - gap) / cols - gap);
        var itemHeight = parseInt(itemWidth / 16 * 10);
        
        var divCanvas = $("#divCanvas");
        divCanvas.empty();
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            var itemInfo = {
                htmlItem: "<div id='item" + item.ITEMID + "' class='NBI_ITEM' />",
                posX: (itemWidth + gap) * (item.POS_X - 1) + gap,
                posY: (itemHeight + gap) * (item.POS_Y - 1) + gap,
                w: itemWidth * item.SIZE_W + gap * (item.SIZE_W - 1),
                h: itemHeight * item.SIZE_H + gap * (item.SIZE_H - 1)
            };

            item.itemInfo = itemInfo;

            switch (item.ITEMTYPE) {
                case "CHART": {
                    BindChartItem(item, divCanvas);
                    break;
                }
                case "MAP": {
                    BindMapItem(item, divCanvas);
                    break;

                }
                case "GRID": {
                    BindGridItem(item, divCanvas);
                    break;
                }
                case "PIVOT": {
                    BindPivotItem(item, divCanvas);
                    break;
                }
                case "GAUGE": {
                    BindGaugeItem(item, divCanvas);
                    break;
                }
            }
        }
    }

    function BindItem(itemid) {
        var items = viewModel.ITEM;
        var gap = 5;
        var cols = parseInt(items[0].SIZE);
        var pageWidth = $(document.body).width();
        var itemWidth = parseInt((pageWidth - gap) / cols - gap);
        var itemHeight = parseInt(itemWidth / 16 * 10);
        var item;
        var divCanvas = $("#divCanvas");
        for (var i = 0; i < items.length; i++) {
            if (items[i].ITEMID == itemid) {
                item = items[i];
                break;
            }
        }
        
        var itemInfo = {
            htmlItem: "<div id='item" + item.ITEMID + "' class='NBI_ITEM' />",
            posX: (itemWidth + gap) * (item.POS_X - 1) + gap,
            posY: (itemHeight + gap) * (item.POS_Y - 1) + gap,
            w: itemWidth * item.SIZE_W + gap * (item.SIZE_W - 1),
            h: itemHeight * item.SIZE_H + gap * (item.SIZE_H - 1)
        };

        item.itemInfo = itemInfo;

        $("#item" + itemid).remove();

        switch (item.ITEMTYPE) {
            case "CHART": {
                BindChartItem(item, divCanvas);
                break;
            }
            case "MAP": {
                BindMapItem(item, divCanvas);
                break;

            }
            case "GRID": {
                BindGridItem(item, divCanvas);
                break;
            }
            case "PIVOT": {
                BindPivotItem(item, divCanvas);
                break;
            }
            case "GAUGE": {
                BindGaugeItem(item, divCanvas);
                break;
            }
        }
    }

    function BindGaugeItem(item, divCanvas) {
        var itemInfo = item.itemInfo;
        var prop = item.SYS_NBIITEMP;
        var option = viewModel.ITEMP[item.ITEMID];
        if (option == null) {
            return;
        }

        option.size = {
            width: itemInfo.w,
            height: itemInfo.h
        };
        option.value = viewModel.NBIDATA[item.ITEMID][0][option.valueField];

        switch (option.gaugeType) {
            case "circular": {
                $(itemInfo.htmlItem).appendTo(divCanvas).dxCircularGauge(option);
                break;
            } 
            case "bar": {
                $(itemInfo.htmlItem).appendTo(divCanvas).dxBarGauge(option);
                break;
            }
            case "linear": {
                $(itemInfo.htmlItem).appendTo(divCanvas).dxLinearGauge(option);
                break;
            }
            default: {
                $(itemInfo.htmlItem).appendTo(divCanvas).dxCircularGauge(option);
                break;
            }
        }

        if (option.gaugeType == null) {
            
        }
        else {
            
        }
        
        var divItem = $("#item" + item.ITEMID);
        divItem.css("top", itemInfo.posY).css("left", itemInfo.posX).css("width", itemInfo.w).css("height", itemInfo.h);
    }

    function BindPivotItem(item, divCanvas) {
        var itemInfo = item.itemInfo;
        var prop = item.SYS_NBIITEMP;
        var option = viewModel.ITEMP[item.ITEMID];
        if (option == null) {
            return;
        }
        option.dataSource.store = viewModel.NBIDATA[item.ITEMID];

        $(itemInfo.htmlItem).appendTo(divCanvas).dxPivotGrid(option);
        var divItem = $("#item" + item.ITEMID);
        divItem.css("top", itemInfo.posY).css("left", itemInfo.posX).css("width", itemInfo.w).css("height", itemInfo.h);
    }

    function BindChartItem(item, divCanvas) {
        var itemInfo = item.itemInfo;
        var prop = item.SYS_NBIITEMP;
        var option = viewModel.ITEMP[item.ITEMID];
        if (option == null) {
            return;
        }

        option.size = {
            width: itemInfo.w,
            height: itemInfo.h
        };

        var desField = DeviceLang() == "CHS" ? "DES1" : "DES2";
        if (option.title == null) {
            option.title = { text: item[desField] };
        }
        else {
            if (option.title.text == null || option.title.text == "") {
                option.title.text = item[desField];
            }
        }

        option.dataSource = viewModel.NBIDATA[item.ITEMID];
        option.tooltip.zIndex = 999;

        option.onLegendClick = function (e) {
            if (option.chartType == "pie") {
                var arg = e.target;
                var item = this.getAllSeries()[0].getPointsByArg(arg)[0];
                if (item.isVisible()) {
                    item.hide();
                } else {
                    item.show();
                }
            }
            else {
                var series = e.target;
                if (series.isVisible() == true) {
                    series.hide();
                }
                else {
                    series.show();
                }
            }
            
        };


        if (option.chartType == "pie") {
            $(itemInfo.htmlItem).appendTo(divCanvas).dxPieChart(option);
        }

        else {
            $(itemInfo.htmlItem).appendTo(divCanvas).dxChart(option);
        }
        
        var divItem = $("#item" + item.ITEMID);
        divItem.css("top", itemInfo.posY).css("left", itemInfo.posX).css("width", itemInfo.w).css("height", itemInfo.h);
    }

    function BindGridItem(item, divCanvas) {
        var itemInfo = item.itemInfo;
        var prop = item.SYS_NBIITEMP;
        var option = viewModel.ITEMP[item.ITEMID];
        if (option == null) {
            return;
        }
        option.dataSource = viewModel.NBIDATA[item.ITEMID];

        $(itemInfo.htmlItem).appendTo(divCanvas);
        var divItem = $("#item" + item.ITEMID);
        divItem.css("top", itemInfo.posY).css("left", itemInfo.posX).css("width", itemInfo.w).css("height", itemInfo.h);

        var titleHtml = "<div id='" + "title" + item.ITEMID + "'>";
        $(titleHtml).appendTo(divItem);
        var divTitle = $("#title" + item.ITEMID);
        divTitle.css("text-align", "center").css("width", "100%").css("font-size","28px");
        divTitle.text(item.DES1);
        $("<div>").appendTo(divItem).dxDataGrid(option);


        //$(itemInfo.htmlItem).appendTo(divCanvas).dxDataGrid(option);
        //var divItem = $("#item" + item.ITEMID);
        //divItem.css("top", itemInfo.posY).css("left", itemInfo.posX).css("width", itemInfo.w).css("height", itemInfo.h);
    }

    function BindMapItem(item, divCanvas) {
        var itemData = [
            { lng: 121.477551, lat: 31.255583 },
            { lng: 121.548265, lat: 31.254101 },
            { lng: 121.431557, lat: 31.203707 }
        ];

        var itemInfo = item.itemInfo;

        $(itemInfo.htmlItem).appendTo(divCanvas);
        var divItem = $("#item" + item.ITEMID);
        divItem.css("top", itemInfo.posY).css("left", itemInfo.posX).css("width", itemInfo.w).css("height", itemInfo.h);
        $("<div id='baiduMap' />").appendTo(divItem);
        var baidu = $("#baiduMap");
        baidu.css("width", itemInfo.w).css("height", itemInfo.h);
        var map = new BMap.Map("baiduMap", {
            enableMapClick: false
        });    // 创建Map实例

        var geo = new BMap.Geocoder();
        var point = geo.getPoint("上海市", function (point) {
            map.centerAndZoom(point, 12);
        }, "");

        map.enableScrollWheelZoom(true); // 开启鼠标滚轮缩放
        var mapStyle = { style: "midnight" }
        map.setMapStyle(mapStyle);

        for (var i = 0; i < itemData.length; i++) {
            var marker = new BMap.Marker(new BMap.Point(itemData[i].lng, itemData[i].lat));
            map.addOverlay(marker);
        }
    }


    function AutoUpdateData(item, inteval) {
        var intevalID = viewModel.intevalPool[item];
        if (intevalID != null) {
            clearInterval(intevalID);
            viewModel.intevalPool[item] = null;
        }

        if (inteval > 0) {
            viewModel.intevalPool["item"] = setInterval(function () {
                BindItemData(item);
            }, inteval * 1000);
        }
    }

    function BindItemData(itemid) {
        var u = sessionStorage.getItem("username");
        var url = $("#WebApiServerURL")[0].value + "/Api/Asapment/GetNBIItemData";
        var postData = {
            userName: u,
            func: params.func,
            group: params.group,
            item: itemid
        };

        $.ajax({
            type: 'POST',
            url: url,
            data: postData,
            cache: false,
            success: function (data, textStatus) {
                viewModel.NBIDATA[itemid] = data;
                BindItem(itemid);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                ServerError(xmlHttpRequest.responseText);
            }
        });
    }

    return viewModel;
};

