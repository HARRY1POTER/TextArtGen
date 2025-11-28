// src/utils/shapeMask.js

export function drawMask(ctx, shape, width = 1024, height = 1024) {
  let w = width;
  let h = height;

  if (shape === "rectangle") {
    w = 1400;
    h = 900;
  }

  ctx.beginPath();

  switch (shape) {
    case "rectangle":
      ctx.rect(0, 0, w, h);
      break;

    case "rounded":
      ctx.roundRect(0, 0, w, h, 150);
      break;

    case "circle":
      ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
      break;

    case "oval":
      ctx.ellipse(w / 2, h / 2, 450, 300, 0, 0, Math.PI * 2);
      break;

    case "diamond":
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w, h / 2);
      ctx.lineTo(w / 2, h);
      ctx.lineTo(0, h / 2);
      break;

    case "triangle":
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      break;

    case "hexagon": {
      const a = w * 0.25;
      ctx.moveTo(a, 0);
      ctx.lineTo(w - a, 0);
      ctx.lineTo(w, h / 2);
      ctx.lineTo(w - a, h);
      ctx.lineTo(a, h);
      ctx.lineTo(0, h / 2);
      break;
    }

    case "pentagon":
      pentagon(ctx);
      break;

    case "star":
      drawStar(ctx, w / 2, h / 2, 5, 500, 200);
      break;

    case "blob1":
      ctx.moveTo(512, 120);
      ctx.bezierCurveTo(820, 180, 900, 600, 512, 900);
      ctx.bezierCurveTo(90, 700, 150, 300, 512, 120);
      break;

    case "blob2":
      ctx.moveTo(512, 80);
      ctx.bezierCurveTo(820, 200, 780, 820, 512, 900);
      ctx.bezierCurveTo(180, 820, 180, 200, 512, 80);
      break;

    case "trapezoid":
      ctx.moveTo(200, 0);
      ctx.lineTo(824, 0);
      ctx.lineTo(1024, 1024);
      ctx.lineTo(0, 1024);
      break;

    default:
      ctx.rect(0, 0, w, h);
  }

  ctx.closePath();
}

export function pentagon(ctx) {
  const w = 1024;
  const h = 1024;

  ctx.moveTo(w / 2, 0);
  ctx.lineTo(w, h * 0.38);
  ctx.lineTo(w * 0.82, h);
  ctx.lineTo(w * 0.18, h);
  ctx.lineTo(0, h * 0.38);
}

export function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
  let rot = (Math.PI / 2) * 3;
  let step = Math.PI / spikes;

  ctx.moveTo(cx, cy - outerRadius);

  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(
      cx + Math.cos(rot) * outerRadius,
      cy + Math.sin(rot) * outerRadius
    );
    rot += step;
    ctx.lineTo(
      cx + Math.cos(rot) * innerRadius,
      cy + Math.sin(rot) * innerRadius
    );
    rot += step;
  }
}
