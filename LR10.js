window.onload = function () {
    let playerName = "";
    while (!playerName) {
        playerName = prompt("Введіть ваше ім'я:");
        if (playerName === null) playerName = "";
    }

    document.getElementById("userName").textContent = playerName;

    const symbols = ["🍎", "🍋", "🍒", "🍑", "🍐"];
    let attempts = 0;
    const maxAttempts = 3;
    const generateBtn = document.getElementById("generateBtn");
    const result = document.getElementById("result");

    generateBtn.addEventListener("click", () => {
        if (attempts >= maxAttempts) return;
        attempts++;
        document.getElementById("attemptText").textContent = `Спроба ${attempts} з ${maxAttempts}`;
        result.textContent = "";

        const cols = [[], [], []];
        for (let col = 1; col <= 3; col++) {
            const columnEl = document.getElementById(`col${col}`);
            columnEl.innerHTML = "";
            const used = [];

            for (let row = 0; row < 3; row++) {
                let symbol;
                do {
                    symbol = symbols[Math.floor(Math.random() * symbols.length)];
                } while (used.includes(symbol));
                used.push(symbol);
                cols[col - 1].push(symbol);

                const cell = document.createElement("div");
                cell.className = "cell";
                cell.textContent = symbol;
                columnEl.appendChild(cell);
                cell.classList.add("spin");
                setTimeout(() => cell.classList.remove("spin"), 500);
            }
        }

        let win = false;
        for (let i = 0; i < 3; i++) {
            if (cols[0][i] === cols[1][i] && cols[1][i] === cols[2][i]) {
                win = true;
            }
        }

        if (win) {
            result.textContent = `${playerName}, ви виграли! 🎉`;
            generateBtn.disabled = true;
        } else if (attempts === maxAttempts) {
            result.textContent = `${playerName}, спроби закінчились. Ви не виграли 😞`;
            generateBtn.disabled = true;
        } else {
            result.textContent = "Не співпало, спробуйте ще!";
        }
    });
};
