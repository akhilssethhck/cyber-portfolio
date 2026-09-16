const canvas = document.getElementById("network-canvas");
const ctx = canvas.getContext("2d");

let width;
let height;
let nodes = [];

const mouse = {
    x: null,
    y: null,
    active: false
};

function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

    createNodes();
}

function createNodes() {
    const nodeCount = Math.min(
        70,
        Math.max(30, Math.floor((width * height) / 15000))
    );

    nodes = [];

    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * width,
            y: Math.random() * height,

            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,

            radius: Math.random() * 1.5 + 1
        });
    }
}

window.addEventListener("resize", resizeCanvas);

window.addEventListener("mousemove", (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    mouse.active = true;
});

window.addEventListener("mouseleave", () => {
    mouse.active = false;
});

function updateNodes() {

    nodes.forEach((node) => {

        node.x += node.vx;
        node.y += node.vy;

        // Wrap around screen
        if (node.x < 0) node.x = width;
        if (node.x > width) node.x = 0;

        if (node.y < 0) node.y = height;
        if (node.y > height) node.y = 0;

        // Mouse interaction
        if (mouse.active) {

            const dx = node.x - mouse.x;
            const dy = node.y - mouse.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            const interactionRadius = 140;

            if (
                distance < interactionRadius &&
                distance > 0
            ) {

                const force =
                    (interactionRadius - distance) /
                    interactionRadius;

                node.x += (dx / distance) * force * 2.5;
                node.y += (dy / distance) * force * 2.5;
            }
        }
    });
}

function drawConnections() {

    for (let i = 0; i < nodes.length; i++) {

        for (let j = i + 1; j < nodes.length; j++) {

            const a = nodes[i];
            const b = nodes[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;

            const distance = Math.sqrt(
                dx * dx + dy * dy
            );

            const connectionDistance = 150;

            if (distance < connectionDistance) {

                const opacity =
                    (1 - distance / connectionDistance) * 0.35;

                ctx.beginPath();

                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);

                ctx.strokeStyle =
                    `rgba(200, 30, 30, ${opacity})`;

                ctx.lineWidth = 0.7;

                ctx.stroke();
            }
        }
    }
}

function drawNodes() {

    nodes.forEach((node) => {

        ctx.beginPath();

        ctx.arc(
            node.x,
            node.y,
            node.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle = "rgba(230, 40, 40, 0.8)";

        ctx.fill();
    });
}

function drawMouseEffect() {

    if (!mouse.active) return;

    const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        140
    );

    gradient.addColorStop(
        0,
        "rgba(200, 30, 30, 0.08)"
    );

    gradient.addColorStop(
        1,
        "rgba(200, 30, 30, 0)"
    );

    ctx.beginPath();

    ctx.arc(
        mouse.x,
        mouse.y,
        140,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = gradient;

    ctx.fill();
}

function animate() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );

    updateNodes();

    drawConnections();

    drawNodes();

    drawMouseEffect();

    requestAnimationFrame(animate);
}

resizeCanvas();
animate();
