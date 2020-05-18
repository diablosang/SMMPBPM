Mobile.Login = function (params) {

    var viewModel = {
        hideLayout: true,
        title: ko.observable(""),
        versionChecked: ko.observable(false),
        indicatorVisible: ko.observable(false),
        viewShown: function () {
            SetLanguage();
            var w = $("#inputBox1").width();
            $(".LG_TextBox").width(w - 33);

            var localStorage = window.localStorage;

            var url = localStorage.getItem("serviceurl");
            if (url != null && url != "") {
                serviceURL = url;
            }

            $("#logoImg").attr("src", serviceURL + "/logo.png?v=3");

            var u = localStorage.getItem("username");
            if (u != null) {
                var p = localStorage.getItem("password");
                this.username(u);
                this.password(p);
            }

            if (viewModel.versionChecked() == false) {
                try {
                    CheckUpdate();

                    cordova.getAppVersion.getVersionNumber().then(function (version) {
                        $("#appver").text("Version: " + version);
                        CheckUpdate();
                    });
                }
                catch (e) { }

                viewModel.versionChecked(true);
            }
        },
        username: ko.observable(""),
        password: ko.observable(""),
        onLoginClick: function () {

            Logon(this, this.username(), this.password());

        },
        settingClick: function (e) {
            Mobile.app.navigate("Config");
        }
    };

    return viewModel;

    function Logon(viewModel, u, p) {
        serverVer = CheckServerVersion();
        viewModel.indicatorVisible(true);
        var sessionStorage = window.sessionStorage;
        var devicetype = DevExpress.devices.real().platform;
       
        var postData = {
            UserName: u,
            Password: p,
            CHN: pushChn,
            DeviceID: deviceid,
            DeviceType: devicetype,
            Lang: DeviceLang(),
            appVer: appVer
        };
        var url = serviceURL + "/Api/Asapment/Logon2";
        $.ajax({
            type: 'POST',
            url: url,
            data: postData,
            cache: false,
            success: function (data, textStatus) {
                sessionStorage.removeItem("username");
                sessionStorage.setItem("username", u);

                var localStorage = window.localStorage;
                localStorage.setItem("username", u);
                localStorage.setItem("password", p);
                viewModel.indicatorVisible(false);
                var view = "Dash";
                var option = { root: true };
                GetUserList(u);
                Mobile.app.navigate(view, option);

            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                viewModel.indicatorVisible(false);
                ServerError(xmlHttpRequest.responseText);
            }
        });

    }

    function CheckServerVersion() {
        var ver = "1";
        var url = serviceURL + "/Api/Asapment/GetServerVersion";
        $.ajax({
            type: 'GET',
            url: url,
            cache: false,
            async: false,
            success: function (data, textStatus) {
                ver = parseInt(data.ver);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                ver = 1;
            }
        });

        return ver;
    }

    function CheckUpdate() {
        var ver = appVer;
        var url = serviceURL + "/Api/Debug/CheckAppVersion2?ver=" + ver;
        var currentplatform = DevExpress.devices.real().platform;

        $.ajax({
            type: 'GET',
            url: url,
            cache: false,
            success: function (data, textStatus) {
                var newver = data.NewVersion;
                if (newver != "0") {
                    var closedDialog;
                    var closedDialog = DevExpress.ui.dialog.custom({
                        title: SysMsg.info,
                        message: SysMsg.newVer1 + newver + SysMsg.newVer2,
                        buttons: [{ text: SysMsg.yes, value: true, onClick: function () { return true; } }, { text: SysMsg.no, value: false, onClick: function () { return false; } }]
                    });

                    closedDialog.show().done(function (dialogResult) {
                        if (dialogResult == true) {
                            var apkURL = "";
                            if (currentplatform == 'android') {
                                apkURL = serviceURL + "/App/Mobile.apk";
                                window.open(apkURL, '_system', 'location=yes');
                            }
                            else if (currentplatform == 'ios') {
                                return;
                                //apkURL = "https://itunes.apple.com/us/app/%E4%BC%81%E8%8D%AB%E5%AE%A2%E6%88%B7%E7%AB%AF/id1216043513?mt=8";
                                //window.open(apkURL, '_blank', 'location=yes');
                            }
                            return;
                        }
                    });
                }
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                //ServerError(xmlHttpRequest.responseText);
            }
        });
    }

    function SetLanguage() {
        if (DeviceLang() == "CHS") {
            viewModel.title("登录");
            $("#txtUser").dxTextBox("instance").option("placeholder", "请输入用户名");
            $("#txtPwd").dxTextBox("instance").option("placeholder", "请输入密码");
            $("#btnLogin").dxButton("instance").option("text", "登录");
        }
        else {
            viewModel.title("Logon");
            $("#txtUser").dxTextBox("instance").option("placeholder", "Please input user name");
            $("#txtPwd").dxTextBox("instance").option("placeholder", "Please input password");
            $("#btnLogin").dxButton("instance").option("text", "Login");
        }
    }

    function GetUserList(u) {
        var url = serviceURL + "/Api/Asapment/GetUserList?UserName=" + u;

        $.ajax({
            type: 'GET',
            url: url,
            cache: false,
            success: function (data, textStatus) {
                asUserList = data;
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                viewModel.indicatorVisible(false);
                ServerError(xmlHttpRequest.responseText);
            }
        });
    }
};

function LogoClicked() {
    $("#layout_header").show();
    $("#layout_footer").show();
    $("#layout_viewfooter").show();
}