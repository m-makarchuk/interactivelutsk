const modelEl = document.querySelector('#model');
let isDragging = false;
let previousMousePosition = { x: 0, y: 0 };
let modelRotationY = 0;
let isModelMoving = false;
let previousTouchPosition = { x: 0, y: 0 };

modelEl.addEventListener('mousedown', (event) => {
  isDragging = true;
  previousMousePosition = { x: event.clientX, y: event.clientY };
});

modelEl.addEventListener('touchstart', (event) => {
  isDragging = true;
  previousTouchPosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
});

window.addEventListener('mousemove', (event) => {
  if (isDragging) {
    const deltaMove = {
      x: event.clientX - previousMousePosition.x,
      y: event.clientY - previousMousePosition.y,
    };

    // Ограничення обертання по осі Y
    modelRotationY = Math.min(Math.max(modelRotationY + deltaMove.x * 0.1, -90), 90);

    const modelRotation = { x: 0, y: modelRotationY, z: deltaMove.y * 0.1 };
    modelEl.setAttribute('rotation', modelRotation);

    previousMousePosition = { x: event.clientX, y: event.clientY };
  }
});

window.addEventListener('touchmove', (event) => {
  if (isDragging) {
    const deltaMove = {
      x: event.touches[0].clientX - previousTouchPosition.x,
      y: event.touches[0].clientY - previousTouchPosition.y,
    };

    // Ограничення обертання по осі Y
    modelRotationY = Math.min(Math.max(modelRotationY + deltaMove.x * 0.1, -90), 90);

    const modelRotation = { x: 0, y: modelRotationY, z: deltaMove.y * 0.1 };
    modelEl.setAttribute('rotation', modelRotation);

    previousTouchPosition = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

window.addEventListener('touchend', () => {
  isDragging = false;
});

// Переміщення моделі
modelEl.addEventListener('dblclick', () => {
  isModelMoving = !isModelMoving;
});

window.addEventListener('mousemove', (event) => {
  if (isModelMoving) {
    const modelPosition = modelEl.getAttribute('position');
    modelEl.setAttribute('position', {
      x: modelPosition.x + event.movementX * 0.01,
      y: modelPosition.y,
      z: modelPosition.z + event.movementY * 0.01
    });
  }
});

// Масштабування моделі
window.addEventListener('wheel', (event) => {
  event.preventDefault();
  const modelScale = modelEl.getAttribute('scale');
  const delta = event.deltaY * 0.01;
  modelEl.setAttribute('scale', {
    x: modelScale.x + delta,
    y: modelScale.y + delta,
    z: modelScale.z + delta
  });
});