export function findNearestObject(objects, x, y) {
  let nearestObject = null;
  let shortestDistance = Number.MAX_VALUE;

  for (const obj of objects) {
    const distance = Math.sqrt((x - obj.x) ** 2 + (y - obj.y) ** 2);
    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestObject = obj;
    }
  }

  return nearestObject;
}

export function calculateAngle(x1, y1, x2, y2) {
  const angleInRadians = Math.atan2(y2 - y1, x2 - x1);
  let angleInDegrees = angleInRadians * (180 / Math.PI) + 90; // 90 only adjuster for the game

  // Ensure the angle is positive
  if (angleInDegrees < 0) {
    angleInDegrees += 360;
  }

  return angleInDegrees;
}

export function drawCircle(context, x, y, size, radiusModifier = 1) {
  context.save();
  const centerX = x + size * 0.5;
  const centerY = y + size * 0.5;
  const radius = size * radiusModifier;

  // Create a radial gradient
  const gradient = context.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    radius
  );

  gradient.addColorStop(1, "rgba(170, 255, 0, 0.1)"); // Center of the circle will be white
  gradient.addColorStop(0, "rgba(170, 255, 0, 0.3)"); // Outer edge of the circle will be green

  context.fillStyle = gradient;
  context.beginPath();
  context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
  context.fill();
  context.lineWidth = 2;
  context.stroke();
  context.restore();
}