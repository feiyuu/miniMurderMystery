var o = getApp();

module.exports = {
    setTabarStyle: function() {
        var a = o.globalData.dpdata.DaoHang.split("|");
        console.log(a), wx.setTabBarStyle({
            color: a[0],
            selectedColor: a[1],
            backgroundColor: a[2],
            borderStyle: a[3]
        }), wx.setTabBarItem({
            index: 0,
            iconPath: "/img/ps/" + o.globalData.dpdata.PeiSe + "/ic-index.png",
            selectedIconPath: "/img/ps/" + o.globalData.dpdata.PeiSe + "/ic-index-on.png"
        }), wx.setTabBarItem({
            index: 1,
            iconPath: "/img/ps/" + o.globalData.dpdata.PeiSe + "/ic-menu-dd.png",
            selectedIconPath: "/img/ps/" + o.globalData.dpdata.PeiSe + "/ic-menu-dd-on.png"
        }), wx.setTabBarItem({
            index: 2,
            iconPath: "/img/ps/" + o.globalData.dpdata.PeiSe + "/ic-menu-zj.png",
            selectedIconPath: "/img/ps/" + o.globalData.dpdata.PeiSe + "/ic-menu-zj-on.png"
        }), wx.setTabBarItem({
            index: 3,
            iconPath: "/img/ps/" + o.globalData.dpdata.PeiSe + "/ic-menu-ph.png",
            selectedIconPath: "/img/ps/" + o.globalData.dpdata.PeiSe + "/ic-menu-ph-on.png"
        }), wx.setTabBarItem({
            index: 4,
            iconPath: "/img/ps/" + o.globalData.dpdata.PeiSe + "/ic-menu-wd.png",
            selectedIconPath: "/img/ps/" + o.globalData.dpdata.PeiSe + "/ic-menu-wd-on.png"
        }), "heise" == a[4] ? (console.log("黑色"), wx.setNavigationBarColor({
            frontColor: "#ffffff",
            backgroundColor: a[2],
            backgroundColorBottom: a[2],
            backgroundColorTop: a[2]
        })) : (console.log("白色"), wx.setNavigationBarColor({
            frontColor: "#000000",
            backgroundColor: a[2],
            backgroundColorBottom: a[2],
            backgroundColorTop: a[2]
        })), wx.setBackgroundColor({
            backgroundColorTop: a[2],
            backgroundColorBottom: a[2],
            backgroundColor: a[2]
        });
    },
    setNavigationBar: function() {
        if (wx.setBackgroundColor({
            backgroundColor: "#000000",
            backgroundColorBottom: "#000000",
            backgroundColorTop: "#000000"
        }), o.globalData && o.globalData.dpdata) {
            var a = o.globalData.dpdata.DaoHang.split("|");
            "heise" == a[4] ? (console.log("黑色"), wx.setNavigationBarColor({
                frontColor: "#ffffff",
                backgroundColor: a[2],
                backgroundColorBottom: a[2],
                backgroundColorTop: a[2]
            })) : (console.log("白色"), wx.setNavigationBarColor({
                frontColor: "#000000",
                backgroundColor: a[2],
                backgroundColorBottom: a[2],
                backgroundColorTop: a[2]
            }));
        }
    }
};