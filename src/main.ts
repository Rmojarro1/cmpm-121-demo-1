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

let buttonCounter: number = 0;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
button.addEventListener("click", () => {
  buttonCounter++;
  console.log("Button clciked: " + buttonCounter + "\n");
  button.textContent = "🍆 clicked " + buttonCounter + " times\n";
});
