function areSquaresColliding(square1, square2) {
  // Unpack properties for square 1
  const x1 = square1.x;
  const y1 = square1.y;
  const width1 = square1.width;
  const height1 = square1.height;

  // Unpack properties for square 2
  const x2 = square2.x;
  const y2 = square2.y;
  const width2 = square2.width;
  const height2 = square2.height;

  // Check for collision
  if (
    x1 < x2 + width2 &&
    x1 + width1 > x2 &&
    y1 < y2 + height2 &&
    y1 + height1 > y2
  ) {
    // Squares are colliding
    return true;
  }

  // No collision
  return false;
}

// Example squares
const square1 = { x: 0, y: 0, width: 50, height: 50 };
const square2 = { x: 30, y: 20, width: 40, height: 40 };

// Check for collision
if (areSquaresColliding(square1, square2)) {
  console.log("Squares are colliding!");
} else {
  console.log("Squares are not colliding.");
}

function areCirclesColliding(circle1, circle2) {
  // Unpack properties for circle 1
  const x1 = circle1.x;
  const y1 = circle1.y;
  const radius1 = circle1.radius;

  // Unpack properties for circle 2
  const x2 = circle2.x;
  const y2 = circle2.y;
  const radius2 = circle2.radius;

  // Calculate the distance between the centers of the circles
  const distanceBetweenCenters = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  // Check for collision
  if (distanceBetweenCenters <= radius1 + radius2) {
    // Circles are colliding
    return true;
  }

  // No collision
  return false;
}

// Example circles
const circle1 = { x: 0, y: 0, radius: 30 };
const circle2 = { x: 50, y: 20, radius: 25 };

// Check for collision
if (areCirclesColliding(circle1, circle2)) {
  console.log("Circles are colliding!");
} else {
  console.log("Circles are not colliding.");
}

function arePolygonsColliding(polygon1, polygon2) {
  function dotProduct(point, axis) {
    return point.x * axis.x + point.y * axis.y;
  }

  function getAxis(projectionPoints) {
    const min = Math.min(...projectionPoints);
    const max = Math.max(...projectionPoints);
    return { min, max };
  }

  function getProjection(poly, axis) {
    let min = dotProduct(poly[0], axis);
    let max = min;

    for (let i = 1; i < poly.length; i++) {
      const p = dotProduct(poly[i], axis);
      if (p < min) min = p;
      if (p > max) max = p;
    }

    return { min, max };
  }

  function overlap(projection1, projection2) {
    return projection1.min <= projection2.max && projection1.max >= projection2.min;
  }

  function getAxes(poly) {
    const axes = [];
    for (let i = 0; i < poly.length; i++) {
      const p1 = poly[i];
      const p2 = poly[(i + 1) % poly.length];
      const edge = { x: p2.x - p1.x, y: p2.y - p1.y };
      const axis = { x: -edge.y, y: edge.x };
      const length = Math.sqrt(axis.x * axis.x + axis.y * axis.y);
      axes.push({ x: axis.x / length, y: axis.y / length });
    }
    return axes;
  }

  const axes1 = getAxes(polygon1);
  const axes2 = getAxes(polygon2);

  for (const axis of [...axes1, ...axes2]) {
    const projection1 = getProjection(polygon1, axis);
    const projection2 = getProjection(polygon2, axis);
    if (!overlap(projection1, projection2)) {
      return false; // Separating axis found, no collision
    }
  }

  return true; // No separating axis found, polygons are colliding
}

// Example polygons (arrays of points)
const polygon1 = [
  { x: 0, y: 0 },
  { x: 50, y: 0 },
  { x: 50, y: 50 },
  { x: 0, y: 50 }
];

const polygon2 = [
  { x: 30, y: 20 },
  { x: 80, y: 20 },
  { x: 80, y: 70 },
  { x: 30, y: 70 }
];

// Check for collision
if (arePolygonsColliding(polygon1, polygon2)) {
  console.log("Polygons are colliding!");
} else {
  console.log("Polygons are not colliding.");
}
