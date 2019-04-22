﻿var appVer = "1.2.3";
var nullDeviceType = "PC";
var asUserList = [];
var pushChn = "";
var deviceid = "";
var serviceURL = "http://180.166.252.90:20191/WebAPITest";

window.Mobile = $.extend(true, window.Mobile, {
  "config": {
    "layoutSet": "navbar",
    "navigation": [
      {
        "title": "待办",
        "onExecute": "#Dash",
        "icon": "event"
      },
      {
        "title": "收藏",
        "onExecute": "#Fav",
        "icon": "favorites"
      },
      {
        "title": "功能",
        "onExecute": "#Func",
        "icon": "menu"
      },
      {
        "title": "我的",
        "onExecute": "#UserCenter",
        "icon": "preferences"
      }
    ],
    "navigationEN": [
      {
        "title": "To Do",
        "onExecute": "#Dash",
        "icon": "event"
      },
      {
        "title": "Favorites",
        "onExecute": "#Fav",
        "icon": "favorites"
      },
      {
        "title": "Menu",
        "onExecute": "#Func",
        "icon": "menu"
      },
      {
        "title": "My",
        "onExecute": "#UserCenter",
        "icon": "preferences"
      }
    ],
    "commandMapping": {
      "generic-header-toolbar": {
        "commands": [
          {
            "id": "btnBKFNew",
            "location": "after"
          },
          {
            "id": "btnLogoff",
            "location": "before"
          },
          {
            "id": "btnScan",
            "location": "after"
          }
        ]
      }
    }
  }
});