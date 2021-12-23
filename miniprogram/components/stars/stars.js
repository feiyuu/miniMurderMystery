Component({
    properties: {
        extClass: {
            type: String,
            value: ""
        },
        score: {
            type: Number,
            value: 0
        },
        noscore: {
            type: Number,
            value: 0
        }
    },
    data: {
        int: 0
    },
    observers: {
        'score': function (val) {
            if (val == null) return;
            console.log(val);
            var e = parseInt(val / 2);
            this.setData({
                int: e > 5 ? 5 : e
            });
        }
    },
    ready: function () {
       
    }
});