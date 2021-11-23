for (var a = function(a, e) {
    a || (a = "");
    for (var t = "", r = 0; r < e; r++) t += "0";
    return (t + a).substr(-e);
}, e = function(a) {
    return a = a.replace(/-/g, "/"), new Date(a);
}, t = new Date(), r = [], n = 1990; n <= t.getFullYear(); n++) r.push(n + "年");

var u = [];

for (n = 0; n < 12; n++) u.push(a(n + 1, 2) + "月");

var s = [];

for (n = 0; n < 31; n++) s.push(a(n + 1, 2) + "日");

var i = [];

for (n = 0; n < 24; n++) i.push(a(n, 2) + "时");

var l = [];

for (n = 0; n < 60; n++) l.push(a(n, 2) + "分");

Component({
    properties: {
        value: String,
        dateValue: {
            type: Date
        }
    },
    data: {
        valueArray: [ 0, 0, 0, 0, 0 ],
        rangeValues: [ u, s, i, l ],
        pickerYear: 1990,
        pickerMonth: 1
    },
    observers: {
        value: function(a) {
            this.setData({
                valueArray: this._dateToValueArray(e(a))
            });
        },
        dateValue: function(a) {
            this.setData({
                valueArray: this._dateToValueArray(a)
            });
        },
        valueArray: function(a) {
            this._settMonthDays(a[0] + 1);
        }
    },
    methods: {
        _dateToValueArray: function(a) {
            return [ a.getMonth(), a.getDate() - 1, a.getHours(), a.getMinutes() ];
        },
        _settMonthDays: function(e) {
            var t = 31;
            switch (e) {
              case 2:
                t = 28;
                break;

              case 4:
              case 6:
              case 9:
              case 11:
                t = 30;
            }
            for (var r = [], n = 0; n < t; n++) r.push(a(n + 1, 2) + "日");
            this.setData({
                pickerMonth: e,
                "rangeValues[1]": r
            });
        },
        handleCancel: function(a) {
            this.setData({
                valueArray: this.data.valueArray
            });
        },
        handleColumnChange: function(a) {
            if (a.detail.column > 1) return !1;
            this.data.pickerYear;
            var e = this.data.pickerMonth;
            0 == a.detail.column ? a.detail.value : 1 == a.detail.column && (e = a.detail.value + 1), 
            this._settMonthDays(e);
        },
        handleValueChange: function(a) {
            var t = [];
            for (var r in a.detail.value) {
                var n = this.data.rangeValues[r][a.detail.value[r]];
                t.push(n.toString().substr(0, n.length - 1));
            }
            var u = t[0] + "-" + t[1] + " " + t[2] + ":" + t[3];
            this.triggerEvent("change", {
                date: e(u),
                dateString: u
            });
        }
    }
});