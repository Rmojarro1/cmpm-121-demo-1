const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Eggplant Harvest";

document.title = gameName;
document.body.style.backgroundColor = "purple";

const header = document.createElement("h1");
header.innerHTML = gameName;
header.style.textAlign = "center"; 
header.style.margin = "20px 0"; 
app.append(header);

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Part-timer",
    cost: 10,
    rate: 0.1,
    description: "Because getting someone to do this full-time is too hard.",
  },
  {
    name: "Friendly Neighbor",
    cost: 100,
    rate: 2,
    description: "Just one more row, Susan. I promise.",
  },
  {
    name: "Harvesting Robot",
    cost: 1000,
    rate: 50,
    description: "Robots can't complain about working in the sun.",
  },
  {
    name: "Eggplant-shaped UFO",
    cost: 10000,
    rate: 100,
    description: "Warning, may occasionally pick up a stray cow.",
  },
  {
    name: "Eggplant Ray",
    cost: 100000,
    rate: 2000,
    description:
      "Just zap whatever you see, it'll become an eggplant. Don't worry about the ethics of it.",
  },
];

let counter: number = 0;

const upgrades: number[] = Array(availableItems.length).fill(0);
const prices: number[] = availableItems.map((item) => item.cost);
let startTime: number = performance.now();

function createButton(
  text: string,
  description: string,
  disabled: boolean,
  parent: HTMLElement,
  clickHandler: () => void,
): HTMLButtonElement {
  const button = document.createElement("button");
  button.textContent = text;
  button.title = description;
  button.disabled = disabled;
  parent.appendChild(button);
  button.addEventListener("click", clickHandler);
  return button;
}

const mainButtonContainer = document.createElement("div");
app.appendChild(mainButtonContainer);
const mainButton = createButton("🍆", "", false, mainButtonContainer, handleMainButtonClick);
mainButtonContainer.style.textAlign = "center";
mainButton.style.fontSize = "2em"; 
mainButton.style.padding = "15px 30px"; 
mainButton.style.border = "3px solid #006400"; 
mainButton.style.backgroundColor = "#c8a2c8";
mainButton.style.borderRadius = "15px";

const playerInfoContainer = document.createElement("div");
app.appendChild(playerInfoContainer);
playerInfoContainer.style.textAlign = "center";
const playerCount = document.createElement("p");
playerCount.textContent = `${counter} 🍆s harvested`;
playerInfoContainer.appendChild(playerCount);

const growthRate = document.createElement("p");
growthRate.textContent = "Current harvest rate: 0";
playerInfoContainer.appendChild(growthRate);

const upgradeContainer = document.createElement("div");
app.appendChild(upgradeContainer);

const buttons: HTMLButtonElement[] = availableItems.map((item, index) =>
  createButton(
    `${item.name} = ${item.cost} 🍆`,
    item.description,
    true,
    upgradeContainer,
    () => handlePurchaseButtonClick(index),
  ),
);
upgradeContainer.style.textAlign = "center";

function updateButtons(): void {
  buttons.forEach((button, index) => {
    button.disabled = counter < prices[index];
    let buttonText = `${availableItems[index].name}`;
    if (upgrades[index] > 0) {
      buttonText += `(${upgrades[index]})`;
    }
    const priceText = Number.isInteger(prices[index])
      ? prices[index].toString()
      : prices[index].toFixed(2);

    buttonText += ` = ${priceText} 🍆`;

    button.textContent = buttonText;
  });
}

function handlePurchaseButtonClick(index: number): void {
  if (counter >= prices[index]) {
    counter = updateCounter(counter, -availableItems[index].cost, playerCount);
    upgrades[index]++;
    prices[index] = updatePrice(prices[index]);
    updateText();
    updateButtons();
    if (upgrades[index] === 1) {
      startTime = performance.now();
      requestAnimationFrame(performFrameUpdate);
    }
  }
}

function handleMainButtonClick(): void {
  counter = updateCounter(counter, 1, playerCount);
  updateButtons();
}

function updateCounter(
  counter: number,
  value: number,
  playerCount: HTMLElement,
): number {
  counter += value;
  const counterText = Number.isInteger(counter)
      ? counter.toString()
      : counter.toFixed(2);
  playerCount.textContent = `You have ${counterText} 🍆s`;
  return counter;
}

function updatePrice(price: number): number {
  return price * 1.15;
}

function updateText(): void {
  const totalRate = upgrades.reduce(
    (sum, upgradeCount, index) =>
      sum + upgradeCount * availableItems[index].rate,
    0,
  );
  growthRate.textContent = `Current harvest rate: ${totalRate.toFixed(2)}`;
}

function calculateElapsedTime(startTime: number): number {
  const currentTime = performance.now();
  return (currentTime - startTime) / 1000;
}

function updateCounterForUpgrades(elapsedTime: number): void {
  upgrades.forEach((upgradeCount, index) => {
    if (upgradeCount > 0) {
      const increment = upgradeCount * availableItems[index].rate * elapsedTime;
      counter = updateCounter(counter, increment, playerCount);
    }
  });
}

function performFrameUpdate(): void {
  if (upgrades.some((upgrade) => upgrade > 0)) {
    const elapsedTime = calculateElapsedTime(startTime);
    updateCounterForUpgrades(elapsedTime);
    startTime = performance.now(); 
    requestAnimationFrame(performFrameUpdate);
    updateButtons();
  }
}

requestAnimationFrame(performFrameUpdate);