<template>
    <div>
        <p>你好， 我是手势密码组件</p>
        <canvas ref="canvas"></canvas>
    </div>
</template>
<script>
export default {
    data() {
        return {
            width: 300,
            height: 300,
            ctx: "",
            canvas: "",
            arr: [],
            restPoint: []
        };
    },
    methods: {
        initDom() {
            var canvas = this.$refs.canvas;
            var width = this.width || 320;
            var height = this.height || 320;
            canvas.style.width = "300px";
            canvas.style.height = "300px";
        },
        init() {
            this.initDom();

            this.lastPoint = [];
            // this.makeState();
            // this.touchFlag = false;
            this.canvas = this.$refs.canvas;
            this.ctx = this.canvas.getContext("2d");
            this.createCircle();
            // this.drawPoint("#4d7bfe"); // 每帧圆心
            // console.log(this.ctx.canvas.width, this.ctx.canvas.height, 123);
        },
        createCircle() {
            // 创建解锁点的坐标，根据canvas的大小来平均分配半径
            var n = 3; //共n行n列
            var count = 0;
            this.r = this.ctx.canvas.width / (2 + 4 * 3); // 公式计算
            console.log(this.r, 99);
            this.lastPoint = [];
            this.arr = [];
            this.restPoint = [];
            var r = this.r;
            var d = this.ctx.canvas.width;
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    count++;
                    var obj = {
                        x: (j * d) / 4 + d / 4,
                        y: (i * d) / 4 + d / 4,
                        index: count
                    };
                    console.log(obj.x, obj.y);
                    this.arr.push(obj);
                    this.restPoint.push(obj);
                }
            }
            console.log(
                this.arr,
                "=====",
                this.ctx.canvas.width,
                this.ctx.canvas.height
            );
            this.ctx.clearRect(
                0,
                0,
                this.ctx.canvas.width,
                this.ctx.canvas.height
            );
            console.log(this.arr, "0000000000000000");
            for (var k = 0; k < this.arr.length; k++) {
                // this.drawCle(this.arr[i].x, this.arr[i].y);
                // this.drawPoint('#d2d9e2');
                this.ctx.fillStyle = "#d2d9e2";
                this.ctx.beginPath();
                this.ctx.arc(
                    this.arr[k].x,
                    this.arr[k].y,
                    this.r / 2.5,
                    0,
                    Math.PI * 2,
                    true
                );
                this.ctx.closePath();
                this.ctx.fill();
            }
        },
        drawPoint(style) {
            // 初始化圆心
            if (!this.isShowTrack) {
                return;
            }
            for (var i = 0; i < this.lastPoint.length; i++) {
                this.ctx.fillStyle = style;
                this.ctx.beginPath();
                this.ctx.arc(
                    this.lastPoint[i].x,
                    this.lastPoint[i].y,
                    this.r / 2.5,
                    0,
                    Math.PI * 2,
                    true
                );
                this.ctx.closePath();
                this.ctx.fill();
            }
        }
    },
    mounted() {
        this.init();
    }
};
</script>
<style lang="css">
</style>