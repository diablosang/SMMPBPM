﻿Mobile.Config = function (params) {

    var viewModel = {
        title: ko.observable(""),
        hideFoot: true,
        url: ko.observable(""),
        viewShown: function () {
            SetLanguage();
            this.url(serviceURL);
        },
        onSaveClick: function () {
            var localStorage = window.localStorage;
            localStorage.setItem("serviceurl", this.url());
            serviceURL = this.url();
            DevExpress.ui.notify(SysMsg.saveSuccess, "success", 1000);
            Mobile.app.back();
        },
        onLogoffClick: function () {
            var sessionStorage = window.sessionStorage;
            var u = sessionStorage.getItem("username");

            if (u == null) {
                return;
            }

            Mobile.app.viewCache.clear();
            sessionStorage.removeItem("username");
            var url = serviceURL + "/Api/Asapment/Logoff?UserName=" + u;
            $.ajax({
                type: 'GET',
                url: url,
                cache: false,
                success: function (data, textStatus) {
                    var view = "Login";
                    var option = { root: true };
                    Mobile.app.navigate(view, option);
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    ServerError(xmlHttpRequest.responseText);
                }
            });


            return;
        },
        onScan: function () {
            try {
                ScanBarcode(this);
            }
            catch (e) {
                DevExpress.ui.notify(e, "error", 3000);
            }

        }
    };

    return viewModel;

    function ScanBarcode(viewModel) {
        cordova.plugins.barcodeScanner.scan(
         function (result) {
             if (result.text == null || result.text == "") {
                 return;
             }

             var url = result.text;
             viewModel.url(url);
             var localStorage = window.localStorage;
             localStorage.setItem("serviceurl", url);
             serviceURL = url;
             DevExpress.ui.notify(SysMsg.saveFailed, "success", 1000);
         },
         function (error) {
             DevExpress.ui.notify(SysMsg.scanFailed + error, "error", 3000);
         }
      );
    }

    function SetLanguage() {
        if (DeviceLang() == "CHS") {
            viewModel.title("设置");
            $("#lblAddress").html("服务器地址");
            $("#btnSave").dxButton("instance").option("text", "保存");
            $("#btnScan").dxButton("instance").option("text", "扫描");
        }
        else {
            viewModel.title("Setting");
            $("#lblAddress").html("Service Address");
            $("#btnSave").dxButton("instance").option("text", "Save");
            $("#btnScan").dxButton("instance").option("text", "Scan");
            $("#spanAddress").text("Service Address:");
        }
    }
};