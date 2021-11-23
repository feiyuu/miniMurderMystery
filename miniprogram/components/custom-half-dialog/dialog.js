Component({
    options: {
        multipleSlots: !0,
        addGlobalClass: !0
    },
    properties: {
        closabled: {
            type: Boolean,
            value: !0
        },
        title: {
            type: String,
            value: ""
        },
        subTitle: {
            type: String,
            value: ""
        },
        extClass: {
            type: String,
            value: ""
        },
        desc: {
            type: String,
            value: ""
        },
        tips: {
            type: String,
            value: ""
        },
        maskClosable: {
            type: Boolean,
            value: !0
        },
        mask: {
            type: Boolean,
            value: !0
        },
        show: {
            type: Boolean,
            value: !1,
            observer: "_showChange"
        },
        buttons: {
            type: Array,
            value: []
        },
        footer: {
            type: Boolean,
            value: !1
        }
    },
    methods: {
        close: function(t) {
            t.currentTarget.dataset.type;
            this.data.maskClosable && (this.setData({
                show: !1
            }), this.triggerEvent("close"));
        },
        buttonTap: function(t) {
            var e = t.currentTarget.dataset.index;
            this.triggerEvent("buttontap", {
                index: e,
                item: this.data.buttons[e]
            }, {});
        }
    }
});