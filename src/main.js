const canvas = document.getElementById('gameCanvas-layer0');

// 1.6:1 aspect ratio
const ASPECT_RATIO = 1.6/1;
const UNITS_TALL = 20;

class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.stopping = false;

        this.gameLoop = this.gameLoop.bind(this);
        this.resizeCanvas = this.resizeCanvas.bind(this);
        this.lastFrameTime = Date.now();
        this.FPS = 0;
    }

    resizeCanvas() {
        this.width = canvas.clientWidth;
        this.height = canvas.clientHeight;

        this.canvas.width = this.width;
        this.canvas.height = this.height;

        if (canvas.height) {
            const ratio = this.width / this.height;

            if (ratio > ASPECT_RATIO) {
                // Too wide
                this.width = ASPECT_RATIO * this.height;
            } else {
                // Too thin
                this.height = this.width / ASPECT_RATIO;
            }
        }
    }

    gameLoop() {
        this.preDraw();

        this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
        this.ctx.fillRect(0, 0, 1, 1);
        this.ctx.fillRect(UNITS_TALL*ASPECT_RATIO - 1, UNITS_TALL - 1, 1, 1);


        this.postDraw();

        if (!this.stopping) {
            window.requestAnimationFrame(this.gameLoop);
        } else {
            this.stopping = false;
        }
    }

    preDraw() {
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);

        // This probably won't be needed once we start drawing
        //  a proper background
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate((this.canvas.width - this.width) / 2, (this.canvas.height - this.height) / 2);

        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.save();

        // 20 units tall, origin starts in bottom left
        //  positive y goes up
        this.ctx.scale(this.height / UNITS_TALL, -1 * this.height / UNITS_TALL);
        this.ctx.translate(0, -1 * UNITS_TALL);

    }

    postDraw() {
        this.ctx.restore();

        const now = Date.now();
        this.ctx.fillStyle = '#000000';
        this.ctx.textAlign = 'right';
        this.ctx.font = '16px sans-serif';

        this.FPS = this.FPS * 0.9 + (now - this.lastFrameTime) * 0.1;
        this.ctx.fillText(`FPS: ${Math.round(1000 / this.FPS)}`, this.width - 10, 16);

        this.lastFrameTime = now;


    }

    start() {
        window.requestAnimationFrame(this.gameLoop);
        window.addEventListener('resize', this.resizeCanvas);
        this.resizeCanvas();
    }

    stop() {
        this.stopping = true;
        window.removeEventListener('resize', this.resizeCanvas);
    }
}

const r = new Renderer(canvas);
r.start();

