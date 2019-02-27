﻿window.Mobile = window.Mobile || {};

var serverVer;
var asapmentMenuData;

$(function () {
    var startView = "Login"; 
    var start = ""; //"NBIDEBUG";
    

    DevExpress.devices.current({ platform: "generic" });

    $(document).on("deviceready", function () {
        
        StatusBar.backgroundColorByHexString("#4a7087");

        navigator.splashscreen.hide();
        if (window.devextremeaddon) {
            window.devextremeaddon.setup();
        }
        $(document).on("backbutton", function () {
            DevExpress.processHardwareBackButton();
        });

        var uuid = device.uuid;
        var sessionStorage = window.sessionStorage;
        sessionStorage.removeItem("uuid");
        sessionStorage.setItem("uuid", uuid);

    });

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
    Mobile.app.router.register(":view/:id", { view: startView, id: appVer });
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
        var group = GetQueryVariable("group");
        var view = "NBI?func=" + func + "&group=" + group;
        Mobile.app.navigate(view, { root: true });
    }
    else if (start == "NBIDEBUG") {
        Mobile.app.navigate("NBI?func=MFG_RPT_BI1&group=GADMIN", { root: true });
    }
    else {
        Mobile.app.navigate();
    }

});

