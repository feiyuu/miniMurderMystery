Component({
    properties: {
        minNum: {
            type: Number,
            value: 1
        },
        num: {
            type: Number,
            value: 1
        },
        maxNum: {
            type: Number,
            value: 12
        },
        custom: {
            type: Boolean,
            value: !1
        },
        title: {
            type: String,
            value: "男"
        },
        backgroundColor: {
            type: String,
            value: "#a7bcf1"
        }
    },
    data: {
        num: 1,
        minusStatus: "disabled",
        plusStatus: "normal"
    },
    observers: {
        maxNum: function(t) {
            t <= this.data.num ? this.setData({
                num: t,
                plusStatus: "disabled"
            }) : this.setData({
                plusStatus: "normal"
            }), this.data.num == this.data.minNum ? this.setData({
                minusStatus: "disabled"
            }) : this.setData({
                minusStatus: "normal"
            });
        }
    },
    ready: function() {
        console.log(this.data.num), console.log(this.data.maxNum), this.data.num == this.data.minNum && this.setData({
            minusStatus: "disabled"
        }), this.data.maxNum == this.data.num && this.setData({
            plusStatus: "disabled"
        });
    },
    methods: {
        bindMinus: function() {
            var t = this.data.maxNum, a = this.data.minNum, s = this.data.num;
            s > a && s--;
            var u = s <= a ? "disabled" : "normal", i = s >= t ? "disabled" : "normal";
            this.setData({
                num: s,
                minusStatus: u,
                plusStatus: i
            }), this.triggerEvent("jinputEvent", {
                value: s
            });
        },
        bindPlus: function() {
            var t = this.data.minNum, a = this.data.maxNum, s = this.data.num;
            s < a && s++;
            var u = s <= t ? "disabled" : "normal", i = s >= a ? "disabled" : "normal";
            this.setData({
                num: s,
                minusStatus: u,
                plusStatus: i
            }), this.triggerEvent("jinputEvent", {
                value: s
            });
        },
        bindManual: function(t) {
            var a = this.data.minNum, s = this.data.maxNum, u = t.detail.value;
            u < a ? u = a : u > s && (u = s);
            var i = u <= a ? "disabled" : "normal", n = u >= s ? "disabled" : "normal";
            this.setData({
                num: u,
                minusStatus: i,
                plusStatus: n
            }), this.triggerEvent("jinputEvent", {
                value: u
            });
        }
    }
});