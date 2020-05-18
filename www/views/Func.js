Mobile.Func = function (params) {
    "use strict";

    var viewModel = {
        title: ko.observable(""),
        popGroupVisible: ko.observable(false),
        inited: false,
        uiRoot:"",
        viewShown: function () {
            SetLanguage();
            var sessionStorage = window.sessionStorage;
            var u = sessionStorage.getItem("username");
            if (u == null) {
                var view = "Login";
                var option = { root: true };
                Mobile.app.navigate(view, option);
                return;
            }

            if (this.inited == false) {
                BindData(this, "");
            }
            
        },
        popupGroupOption:{
            title: "场景",
            showTitle:true,
            visible: this.popGroupVisible,
            onShown: function (e) {
            }
        },
        listGroupOption: {
            onItemClick: function (e) {
                var pop = $("#popGroup").dxPopup("instance");
                pop.hide();
                var fType = e.itemData.FUNCTYPE;
                if (fType == 4 || fType == 5) {
                    OpenPlugInView(e.itemData.FUNCID);
                }
                else {
                    OpenListView(e.itemData.FUNCID);
                }
            }
        },
    };

    return viewModel;

    function BindData(viewModel) {
        try {
            var sessionStorage = window.sessionStorage;
            var u = sessionStorage.getItem("username");
            //var url = serviceURL + "/Api/Asapment/GetUserMenu?UserName=" + u + "&PARENT=" + viewModel.parentFunc();
            var url = serviceURL + "/Api/Asapment/GetUserMenu?UserName=" + u + "&PARENT=@ALL";
            $.ajax({
                type: 'GET',
                url: url,
                cache: false,
                success: function (data, textStatus) {
                    asapmentMenu.viewModel = viewModel;
                    asapmentMenuData = data;
                    asapmentMenu.BindUI(data);
                },
                error: function (xmlHttpRequest, textStatus, errorThrown) {
                    ServerError(xmlHttpRequest.responseText);
                }
            });
        }
        catch (e) {
            ServerError(xmlHttpRequest.responseText);
        }
    };

    function SetLanguage() {
        if (DeviceLang() == "CHS") {
            viewModel.title("功能目录");
        }
        else {
            viewModel.title("Function Menu");

        }
    }
};

