const {
  keyboard,
  mouse,
  screen,
  Button,
  Point,
  Key,
} = require("@nut-tree-fork/nut-js");

// Set speed and config (optional but recommended)
keyboard.config.autoDelayMs = 150;
mouse.config.autoDelayMs = 100;

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function simulateTyping() {
  const lines = [
    "console.log('Working...');",
    "const now = new Date();",
    "let counter = 0;",
    "function simulateWork() {}",
  ];
  const text = lines[randomInt(0, lines.length - 1)];
  await keyboard.type(text);
  await keyboard.pressKey(Key.Enter);
  await keyboard.releaseKey(Key.Enter);
  console.log("Typed:", text);
}

async function simulateMouseMovement() {
  const { width, height } = (await screen.width()) && (await screen.height());
  const x = randomInt(100, width - 100);
  const y = randomInt(100, height - 100);
  await mouse.move([new Point(x, y)]);
  console.log("Moved mouse to:", x, y);
}

async function simulateAltTab() {
  await keyboard.pressKey(Key.LeftAlt);
  await keyboard.pressKey(Key.Tab);
  await keyboard.releaseKey(Key.Tab);
  await keyboard.releaseKey(Key.LeftAlt);
  console.log("Performed Alt+Tab");
}

async function simulateActivity() {
  const action = randomInt(1, 3);

  switch (action) {
    case 1:
      await simulateTyping();
      break;
    case 2:
      await simulateMouseMovement();
      break;
    case 3:
      await simulateAltTab();
      break;
  }
}

// Run random activity every 10–20 seconds
setInterval(async () => {
  try {
    await simulateActivity();
  } catch (err) {
    console.error("Error simulating activity:", err);
  }
}, randomInt(10000, 20000));

