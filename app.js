var falcon_url = "https://falcon.mon.school"

var width = 800;
var height = 400;

function draw(ctx, shape, args) {
    if (shape == "circle") {
        drawCircle(ctx, args);
    }
    else if (shape == "rectangle") {
        drawRect(ctx, args);
    }
}

function drawCircle(ctx, args) {
    ctx.beginPath();
    ctx.fillStyle = args.fill;
    ctx.strokestyle = args.stroke;
    ctx.arc(args.x, args.y, args.r, 0, Math.PI*2, true);
    ctx.fill();
}

function drawRect(ctx, args) {
    ctx.fillStyle = args.fill;
    ctx.fillRect(args.x, args.y, args.w, args.h)
}

function init() {
    console.log("init!");

    var canvas = document.getElementById("app").getElementsByTagName("canvas")[0];
    const ctx = canvas.getContext('2d');


    var canvas2 = document.createElement('canvas');
    canvas2.width = canvas.width;
    canvas2.height = canvas.height;
    const ctx2 = canvas2.getContext('2d')

//    ctx.translate(width/2, height/2);

    var session = new LiveCodeSession({
        ...livecode_options,
        base_url: falcon_url,
        onMessage: function(msg) {
            if (msg.msgtype == "draw") {
                draw(ctx2, msg.shape, msg.args)
            }
            else if (msg.msgtype == "show") {
                ctx.drawImage(canvas2, 0, 0);
                drawRect(ctx2, {x: 0, y: 0, w: canvas2.width, h: canvas2.height, fill: "white"});
            }
            else if (msg.msgtype == "write") {
                console.log(msg.data);
            }
        }
    });
}

window.onload = init;
