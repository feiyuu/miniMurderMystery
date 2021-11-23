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
    ready: function() {
        console.log(this.data.score);
        var e = parseInt(this.data.score / 2);
        this.setData({
            int: e > 5 ? 5 : e
        });
    }
});