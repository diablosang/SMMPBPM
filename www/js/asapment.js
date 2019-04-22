﻿function createListControl(field,readonly,block) {
    var col = {
        dataField: field.FIELDNAME,
        caption: field.DES,
        allowEditing: !readonly,
        allowSorting:false
    };

    switch (field.CTRLTYPE)
    {
        
        case "2": {
            if (field.DSTYPE == "5") {
                col.lookup = {
                    dataSource: asUserList,
                    displayExpr: "DES",
                    valueExpr: "IDNUM",
                };
            }
            else {
                if (field.DS_DATA.length > 0) {
                    col.lookup = {
                        dataSource: field.DS_DATA,
                        displayExpr: "DES",
                        valueExpr: "IDLINE",
                    };
                }
            }
            break;
        }
        case "3": {
            col.dataType = "boolean";
            break;
        }
        case "4": {
            col.dataType = "date";
            col.format = field.DSPFORMAT;
            break;
        }
        case "7": {
            col.dataType = "number";
            break;
        }
        case "8": {
            col.dataWindow = true;
            break;
        }
        case "9":{
            col.cellTemplate = function (container, options) {
                $("<div>")
                    .append($("<img>", { "src": "data:image;base64," + options.value, "class": "GridSizedImg" }))
                    .appendTo(container);
            }
        }
    }

    return col;
}

function createMainControl(id, $parent,field,option)
{
    var feID = id;

    switch (field.CTRLTYPE)
    {
        case "1": {
            $('<div>').attr('id', feID).appendTo($parent).dxTextBox(option);
            break;
        }
        case "2": {
            if (field.DSTYPE == "5") {
                option.dataSource = asUserList;
                option.displayExpr = "DES";
                option.valueExpr = "IDNUM";

                $('<div>').attr('id', feID).appendTo($parent).dxSelectBox(option);
            }
            else {
                if (field.DS_DATA.length > 0) {
                    option.dataSource = field.DS_DATA;
                    option.displayExpr = "DES";
                    option.valueExpr = "IDLINE";

                    $('<div>').attr('id', feID).appendTo($parent).dxSelectBox(option);
                }
                else {
                    $('<div>').attr('id', feID).appendTo($parent).dxTextBox(option);
                }
            }
            break;
        }
        case "3": {
            $('<div>').attr('id', feID).appendTo($parent).dxCheckBox(option);
            break;
        }
        case "4": {
            option.formatString = "yyyy-MM-dd";
            option.pickerType = "calendar";
            option.dateSerializationFormat="yyyy-MM-dd";
            $('<div>').attr('id', feID).appendTo($parent).dxDateBox(option);
            break;
        }
        case "5": {
            option.height = "100px";
            $('<div>').attr('id', feID).appendTo($parent).dxTextArea(option);
            break;
        }
        case "7": {
            $('<div>').attr('id', feID).appendTo($parent).dxNumberBox(option);
            break;
        }
        case "8": {
            option.dataWindow = true;
            //option.readOnly = true;
            $('<div>').attr('id', feID).appendTo($parent).dxTextBox(option);
            break;
        }
        case "914": {
            option.disabled = true;
            $('<div>').attr('id', feID).appendTo($parent).dxTextBox(option);
            break;
        }
    }
}

function ServerError(errorMessage)
{
    DevExpress.ui.notify(errorMessage, "error", 2000);
    if (errorMessage == "NO SESSION") {
        DevExpress.ui.notify("用户登录已失效，请重新登录", "error", 2000);
        var sessionStorage = window.sessionStorage;
        var u = sessionStorage.getItem("username");
        if (u != null) {
            sessionStorage.removeItem("username");
        }
        Mobile.app.viewCache.clear();
        var view = "Login/0";
        var option = { root: true };
        Mobile.app.navigate(view, option);
    }
    else {
        DevExpress.ui.notify(errorMessage, "error", 2000);
    }
}

function GetIconImage(img) {
    var url = serviceURL + "/images/Asapment/" + img + ".png?v="+Math.random();;
    return url;
}

function GetDateString(date) {
    return date.split("T")[0];
}

function GetTimeString(date) {
    var t = date.split("T")[1];
    var str = t.split(":");
    return str[0] + ":" + str[1];
}

function GetDateTimeString(date) {
    var d = date.split("T")[0];
    var t = date.split("T")[1];
    var str = t.split(":");
    return d+" "+str[0] + ":" + str[1];
}

function GetDashCSS(date) {
    var date = new Date(date);
    var now = new Date();
    var diffDays = (now - date) / (1000 * 60 * 60 * 24);
    if (diffDays > 7) {
        return "dashDate7";
    }
    else if (diffDays > 7) {
        return "dashDate3";
    }
    else {
        return "dashDate";
    }
}

function GetDashText(data) {
    if (data.FUNCDESC == null) {
        return data.FDES + "-" + data.GDES
    }
    else {
        return data.FUNCDESC + "-" + data.GROUPDESC
    }
    
}

function GetDashText2(data) {
    return data.DOCID + " " + data.DOCOWNER;;
}

function GetDashText3(data) {
    return data.SUBJECT;
}

function OpenListView(funcid) {
    var view = "FormList?FUNCID=" + funcid;
    Mobile.app.navigate(view);
}

function OpenPlugInView(funcid) {
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
}

function OpenASGroup(funcid) {
    //var asGroup = $("#asGroup").dxActionSheet("instance");
    var pop = $("#popGroup").dxPopup("instance");
    pop.show();

    var dataGroup = asapmentMenuData.filter(function (e) { return e.PARENT == funcid && e.MTYPE == "GROUP"; });

    var desfield="DES1";
    if(DeviceLang()=="ENG"){
        desfield="DES2";
    }

    var ds = [];
    dataGroup.forEach(function (d, i, a) {
        ds.push({ text: d[desfield],FUNCID:d.FUNCID });
    })

    var list = $("#listGroup").dxList("instance");
    list.option("dataSource", ds);
    //asGroup.option("dataSource", ds);
    //asGroup.show();
}


function ShowBigImg(_this) {
    var outerdiv = "#outerdiv";
    var innerdiv = "#innerdiv";
    var bigimg = "#bigimg";

    var src = _this.attr("src");//获取当前点击的pimg元素中的src属性  
    $(bigimg).attr("src", src);//设置#bigimg元素的src属性  

    /*获取当前点击图片的真实大小，并显示弹出层及大图*/
    $("<img/>").attr("src", src).load(function () {
        var windowW = $(window).width();//获取当前窗口宽度  
        var windowH = $(window).height();//获取当前窗口高度  
        var realWidth = this.width;//获取图片真实宽度  
        var realHeight = this.height;//获取图片真实高度  
        var imgWidth, imgHeight;
        var scale = 0.9;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放  

        if (realHeight > windowH * scale) {//判断图片高度  
            imgHeight = windowH * scale;//如大于窗口高度，图片高度进行缩放  
            imgWidth = imgHeight / realHeight * realWidth;//等比例缩放宽度  
            if (imgWidth > windowW * scale) {//如宽度扔大于窗口宽度  
                imgWidth = windowW * scale;//再对宽度进行缩放  
            }
        } else if (realWidth > windowW * scale) {//如图片高度合适，判断图片宽度  
            imgWidth = windowW * scale;//如大于窗口宽度，图片宽度进行缩放  
            imgHeight = imgWidth / realWidth * realHeight;//等比例缩放高度  
        } else {//如果图片真实高度和宽度都符合要求，高宽不变  
            imgWidth = realWidth;
            imgHeight = realHeight;
        }

        $(bigimg).css("width", imgWidth);//以最终的宽度对图片缩放  

        var w = (windowW - imgWidth) / 2;//计算图片与窗口左边距  
        var h = (windowH - imgHeight) / 2;//计算图片与窗口上边距  
        $(innerdiv).css({ "top": h, "left": w });//设置#innerdiv的top和left属性  
        $(outerdiv).fadeIn("fast");//淡入显示#outerdiv及.pimg  
    });

    $(outerdiv).click(function () {//再次点击淡出消失弹出层  
        $(this).fadeOut("fast");
    });
}


function GetQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return null;
}

function GetDeviceType() {
    var deviceType = DevExpress.devices.deviceType;

    if (deviceType == null) {
        return nullDeviceType;
    }

    var platform = DevExpress.devices.real().platform;
    if (deviceType == "desktop") {
        return "PC";
    }
    else if (deviceType == "phone") {
        return platform;
    }
    else {
        return platform + "PAD";
    }
}

function OpenFile(fileID) {
    var u = sessionStorage.getItem("username");
    var url = serviceURL + "/Api/Asapment/DownloadFile?UserName=" + u + "&FILEID=" + fileID;
    $.ajax({
        type: 'GET',
        url: url,
        cache: false,
        success: function (data, textStatus) {
            var furl = serviceURL + "/Asapment/Temp/" + data.file;
            window.open(furl, '_system', 'location=yes');
        },
        error: function (xmlHttpRequest, textStatus, errorThrown) {
            ServerError(xmlHttpRequest.responseText);
        }
    });
}