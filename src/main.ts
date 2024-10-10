import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Raul's Game";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button: HTMLButtonElement = document.createElement("button");
button.textContent = "🍆";
document.body.appendChild(button);

const upgradeButtonA: HTMLButtonElement = document.createElement("button");
upgradeButtonA.textContent = "UpgradeA = 10 🍆 ";
upgradeButtonA.disabled = true;
document.body.appendChild(upgradeButtonA);

const upgradeButtonB: HTMLButtonElement = document.createElement("button");
upgradeButtonB.textContent = "UpgradeB = 100 🍆 ";
upgradeButtonB.disabled = true;
document.body.appendChild(upgradeButtonB);

const upgradeButtonC: HTMLButtonElement = document.createElement("button");
upgradeButtonC.textContent = "UpgradeC = 1000 🍆 ";
upgradeButtonC.disabled = true;
document.body.appendChild(upgradeButtonC);



let buttonCounter: number = 0;
let upgradeA: number = 0;
let upgradeB: number = 0; 
let upgradeC: number = 0;

const growthRate = document.createElement('gr'); 
growthRate.textContent = ("Current growth rate: " + ((0.1 * upgradeA) + (2 * upgradeB))); 
document.body.appendChild(growthRate); 

const upgradeAText = document.createElement('upA'); 
upgradeAText.textContent = ("UpgradeA: " + upgradeA); 
document.body.appendChild(upgradeAText);  

const upgradeBText = document.createElement('upB'); 
upgradeBText.textContent = ("UpgradeB: " + upgradeB); 
document.body.appendChild(upgradeBText);  

const upgradeCText = document.createElement('upC');
upgradeCText.textContent = ("UpgradeC: " + upgradeC);
document.body.appendChild(upgradeCText);

function updateCounter(
  count: number,
  value: number,
  button: HTMLButtonElement,
): number {
  count += value;
  button.textContent = "🍆 clicked " + count.toFixed(2) + " times\n";
  updateButtons(); 
  return count;
}

function updateButtons(): void {
  upgradeButtonA.disabled = !hasUpgradeA(buttonCounter);
  upgradeButtonB.disabled = !hasUpgradeB(buttonCounter);
  upgradeButtonC.disabled = !hasUpgradeC(buttonCounter);
}

function hasUpgradeA(count: number): boolean {
  return count >= 10;
}

function hasUpgradeB(count: number): boolean {
  return count >= 100;
}

function hasUpgradeC(count: number): boolean {
  return count >= 1000;
}

function updateText(): void{
  growthRate.textContent = ("Current growth rate: " + ((0.1 * upgradeA) + (2 * upgradeB) + (50 * upgradeC)).toFixed(2));
  upgradeAText.textContent = ("UpgradeA: " + upgradeA);
  upgradeBText.textContent = ("UpgradeB: " + upgradeB);
  upgradeCText.textContent = ("UpgradeC: " + upgradeC);
}


let startTime: number = performance.now();

function frameUpdate(): void {
  if (upgradeA > 0 || upgradeB > 0 || upgradeC > 0) {
    const currentTime = performance.now();
    const elapsedTime = (currentTime - startTime) / 1000;

    if(upgradeA > 0) {
      const incrementA = upgradeA * 0.1 * elapsedTime;
      buttonCounter = updateCounter(buttonCounter, incrementA, button);
    }

    if(upgradeB > 0) {
      const incrementB = upgradeB * 2 * elapsedTime;
      buttonCounter = updateCounter(buttonCounter, incrementB, button);
    }
    
    if(upgradeC > 0) {
      const incrementC = upgradeC * 50 * elapsedTime;
      buttonCounter = updateCounter(buttonCounter, incrementC, button);
    }
    console.log(buttonCounter);
    startTime = currentTime;
    updateButtons(); 
    requestAnimationFrame(frameUpdate);
  }
}

button.addEventListener("click", () => {
  buttonCounter = updateCounter(buttonCounter, 1, button);
  updateButtons(); 
});

upgradeButtonA.addEventListener("click", () => {
  if (buttonCounter >= 10) {
    buttonCounter = updateCounter(buttonCounter, -10, button);
    upgradeA++;
    updateText();  
    updateButtons(); 
    if (upgradeA === 1) {
      startTime = performance.now();
      requestAnimationFrame(frameUpdate);
    }
  }
});

upgradeButtonB.addEventListener("click", () => {
  if (buttonCounter >= 100) {
    buttonCounter = updateCounter(buttonCounter, -100, button);
    upgradeB++;
    updateText(); 
    updateButtons(); 
    if (upgradeB === 1) {
      startTime = performance.now();
      requestAnimationFrame(frameUpdate);
    }
  }
});

upgradeButtonC.addEventListener("click", () => {
  if (buttonCounter >= 1000) {
    buttonCounter = updateCounter(buttonCounter, -1000, button);
    upgradeC++;
    updateText();
    updateButtons();
    if (upgradeC === 1) {
      startTime = performance.now();
      requestAnimationFrame(frameUpdate);
    }
  }
});

requestAnimationFrame(frameUpdate);
