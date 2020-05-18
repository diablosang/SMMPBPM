var asapmentMenu = {
    viewModel: {},
    desfield: "",
    BindUI: function (data) {
        $("#divMenu").empty();
        var divMenu = $("#divMenu");
        var desfield = "DES1";
        if (DeviceLang() == "ENG") {
            desfield = "DES2";
        }

        asapmentMenu.desfield = desfield;

        var dataL1 = data.filter(function (e) { return e.PARENT == asapmentMenu.viewModel.uiRoot && e.FUNCTYPE != "1"; });
        if (asapmentMenu.viewModel.uiRoot != "") {
            dataL1.push({ FUNCID: "SYSBACK", FUNCTYPE: -1,DES1:"退回根目录",DES:"Back",IMAGEID:"ARROWLEFT" });
        }

        if (dataL1.length > 0) {
            var html = "<table id='tbRoot' class='MenuGCTB MenuGP' />";
            divMenu.append(html)
            var tb = $("#tbRoot")[0];
            asapmentMenu.AppendFuncItem(data, tb, dataL1);
        }

        dataL1 = data.filter(function (e) { return e.PARENT == asapmentMenu.viewModel.uiRoot && e.FUNCTYPE == "1"; });
        dataL1.forEach(function (d1, i1, a1) {
            var gpid = "gp" + d1.FUNCID;
            var html = "<div id='" + gpid + "' class='MenuGP' />";
            divMenu.append(html);
            var gp = $("#" + gpid);
            var ghid = "gh" + d1.FUNCID;
            html = "<div id='" + ghid + "' class='MenuGH' />";
            gp.append(html);
            var gh = $("#" + ghid);
            var imagesrc = GetIconImage(d1.IMAGEID);
            html = " <img src='" + imagesrc + "'/>";
            gh.append(html);
            html = "<div>" + d1[desfield] + "</div>";
            gh.append(html);
            var tbid = tb + d1.FUNCID;
            html = "<table id='" + tbid + "' class='MenuGCTB' />"
            gp.append(html)
            var tb = $("#" + tbid)[0];

            var dataL2 = data.filter(function (e) { return e.PARENT == d1.FUNCID && e.MTYPE == "FUNC" && e.FUNCTYPE != "1"; });
            var curCell = 1;
            var tr;
            var funcItem = dataL2;
            dataL2.forEach(function (d2, i2, a2) {
                var dataL3 = data.filter(function (e) { return e.PARENT == d2.FUNCID && e.MTYPE == "FUNC" && e.FUNCTYPE != "1"; });
                dataL3.forEach(function (d3, i3, a3) {
                    funcItem.push(d3);
                });
            });

            if (funcItem.length > 0) {
                asapmentMenu.AppendFuncItem(data, tb, funcItem);
            }


            dataL2 = data.filter(function (e) { return e.PARENT == d1.FUNCID && e.MTYPE == "FUNC" && e.FUNCTYPE == "1"; });
            dataL2.forEach(function (d2, i2, a2) {
                var dataL3 = data.filter(function (e) { return e.PARENT == d2.FUNCID && e.MTYPE == "FUNC" });
                if (dataL3.length == 0) {
                    return;
                }

                funcItem = dataL3;
                dataL3.forEach(function (d3, i3, a3) {
                    if (d3.FUNCTYPE != "1") {
                        var dataL4 = data.filter(function (e) { return e.PARENT == d3.FUNCID && e.MTYPE == "FUNC" && e.FUNCTYPE != "1"; });
                        dataL4.forEach(function (d4, i4, a4) {
                            funcItem.push(d4);
                        });
                    }
                });

                if (funcItem.length > 0) {
                    var tr = tb.insertRow();
                    var tc = tr.insertCell();
                    tc.colSpan = 4;
                    tc.innerHTML = "<div class='MenuGCTBF'>" + d2[desfield] + "</div>";
                    asapmentMenu.AppendFuncItem(data, tb, funcItem);
                }
            });
        });

        asapmentMenu.viewModel.inited = true;
    },
    AppendFuncItem: function (data, tb, funcItem) {
        var curCell = 1;
        funcItem.forEach(function (d2, i, a) {
            if (curCell == 1) {
                tr = tb.insertRow();
                var tce = tr.insertCell();
                tce.innerHTML = "&nbsp;";
                tce = tr.insertCell();
                tce.innerHTML = "&nbsp;";
                tce = tr.insertCell();
                tce.innerHTML = "&nbsp;";
                tce = tr.insertCell();
                tce.innerHTML = "&nbsp;";
            }
            var tc = tr.cells[curCell - 1];
            var img = GetIconImage(d2.IMAGEID);
            var action;

            switch (d2.FUNCTYPE) {
                case 1: {
                    action = "asapmentMenu.OpenMenuRoot('" + d2.FUNCID + "')";
                    break;
                }
                case 5:
                case 10: {
                    action = "asapmentMenu.BindLower('" + d2.FUNCID + "')";
                    break;
                }
                case -1: {
                    action = "asapmentMenu.OpenMenuRoot('')";
                    break;
                }
                default: {
                    var dataGroup = data.filter(function (e) { return e.PARENT == d2.FUNCID && e.MTYPE == "GROUP"; });
                    if (dataGroup.length == 0) {
                        return;
                    }
                    else if (dataGroup.length == 1) {
                        action = "asapmentMenu.OpenListView('" + dataGroup[0].FUNCID + "')";
                    }
                    else {
                        action = "asapmentMenu.OpenASGroup('" + d2.FUNCID + "')";
                    }
                    break;
                }
            }

            tc.innerHTML = "<div onclick=\"" + action + "\"><img src='" + img + "' /><div>" + d2[asapmentMenu.desfield] + "</div></div>";
            curCell++;
            if (curCell > 4) {
                curCell = 1;
            }
        });
    },
    OpenMenuRoot: function (root) {
        asapmentMenu.viewModel.uiRoot = root;
        asapmentMenu.BindUI(asapmentMenuData);
    },
    OpenListView: function(funcid) {
        var view = "FormList?FUNCID=" + funcid;
        Mobile.app.navigate(view);
    },
    OpenPlugInView: function (funcid) {
        var sessionStorage = window.sessionStorage;
        var u = sessionStorage.getItem("username");
        var url = serviceURL + "/Api/Asapment/GetPlugInViewInfo";
        var postData = {
            userName: u,
            func: funcid
        };

        $.ajax({
            type: 'POST',
            data: postData,
            url: url,
            cache: false,
            success: function (data, textStatus) {
                var view = data.view;
                Mobile.app.navigate(view);
            },
            error: function (xmlHttpRequest, textStatus, errorThrown) {
                ServerError(xmlHttpRequest.responseText);
            }
        });
    },
    OpenASGroup: function (funcid) {
        var pop = $("#popGroup").dxPopup("instance");
        pop.show();

        var dataGroup = asapmentMenuData.filter(function (e) { return e.PARENT == funcid && e.MTYPE == "GROUP"; });

        var desfield = "DES1";
        if (DeviceLang() == "ENG") {
            desfield = "DES2";
        }

        var ds = [];
        dataGroup.forEach(function (d, i, a) {
            ds.push({ text: d[desfield], FUNCID: d.FUNCID });
        })

        var list = $("#listGroup").dxList("instance");
        list.option("dataSource", ds);
    }
}