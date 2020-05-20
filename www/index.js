﻿window.Mobile = window.Mobile || {};

var serverVer;
var asapmentMenuData;

$(function () {
    var startView = "Login"; 
    var start = "";//"NBI";//"NBIDEBUG";

    DevExpress.devices.current({ platform: "generic" });
    BindTheme();

    $(document).on("deviceready", function () {
        navigator.splashscreen.hide();
        if (window.devextremeaddon) {
            window.devextremeaddon.setup();
        }
        $(document).on("backbutton", function () {
            DevExpress.processHardwareBackButton();
        });

        var uuid = device.uuid;
        deviceid = uuid;

        window.JPush.init();
        window.setTimeout(GetRegistrationID, 1000);

        if (device.platform != "Android") {
            window.JPush.setApplicationIconBadgeNumber(0);
        }

        try {
            window.open = cordova.InAppBrowser.open;
        }
        catch (e) { }


    });

    function BindTheme() {
        var dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (dark) {
            DevExpress.ui.themes.current('generic.dark');
        }
        else {
            DevExpress.ui.themes.current('generic.light');
        }
    }

    function GetRegistrationID() {
        window.JPush.getRegistrationID(function (rid) {
            try {
                if (rid == null || rid == "") {
                    var t1 = window.setTimeout(GetRegistrationID, 1000);
                    return;
                }
                pushChn = rid;
            }
            catch (e) {
                DevExpress.ui.notify(e, "error", 3000);
            }
        });
    }

    function onNavigatingBack(e) {
        if (e.isHardwareButton && !Mobile.app.canBack()) {
            e.cancel = true;
            exitApp();
        }
    }

    function exitApp() {
        switch (DevExpress.devices.real().platform) {
            case "android":
                navigator.app.exitApp();
                break;
            case "win":
                window.external.Notify("DevExpress.ExitApp");
                break;
        }
    }

    if (DeviceLang() == "CHS") {
        Mobile.app = new DevExpress.framework.html.HtmlApplication({
            namespace: Mobile,
            layoutSet: DevExpress.framework.html.layoutSets[Mobile.config.layoutSet],
            navigation: Mobile.config.navigation,
            commandMapping: Mobile.config.commandMapping
        });

        SysMsg = chsMsg;
    }
    else {
        Mobile.app = new DevExpress.framework.html.HtmlApplication({
            namespace: Mobile,
            layoutSet: DevExpress.framework.html.layoutSets[Mobile.config.layoutSet],
            navigation: Mobile.config.navigationEN,
            commandMapping: Mobile.config.commandMapping
        });

        SysMsg = engMsg;
    }
    Mobile.app.router.register(":view", { view: startView});
    Mobile.app.on("navigatingBack", onNavigatingBack);
    Mobile.app.on("viewShown", function (e) {
        var viewModel = e.viewInfo.model;
        if (viewModel.hideLayout == true) {
            $("#layout_header").hide();
            $("#layout_footer").hide();
            $("#layout_viewfooter").hide();
            $("#layout-content").css("bottom", 0);

        }
        else {
            $("#layout_header").show();
            if (viewModel.hideFoot == true) {
                $("#layout_footer").hide();
                $("#layout_viewfooter").hide();
                $("#layout-content").css("bottom", 0);
            }
            else {
                $("#layout_footer").show();
                $("#layout_viewfooter").show();
                $("#layout-content").css("bottom", "68px");
            }
        }
    });

    //Mobile.app.navigate();
    if (start == "NBI") {
        var func = GetQueryVariable("func");
        var crs = GetQueryVariable("crs");

        var view = "NBI?appver=" + appVer + "&func=" + func;
        if (crs=="1") {
            view = view + "&crs=1";
        }

        Mobile.app.navigate(view, { root: true });
    }
    else if (start == "NBIDEBUG") {
        //Mobile.app.navigate("NBI?func=BI_CRS1&crs=1", { root: true });
        Mobile.app.navigate("NBI?func=BI_MFG2_1", { root: true });
    }
    else {
        Mobile.app.navigate();
    }

});

