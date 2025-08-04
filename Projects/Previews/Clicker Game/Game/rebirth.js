// rebirth.js

let rebirths = 0;
let rebirthPrice = 1000000;
let multiplier = 1;
let renamePrice = 10000000;
let rebirthsNeeded = 1;

document.getElementById("rename").addEventListener("click", function () {
    if (rebirths <= rebirthsNeeded && renamePrice <= clicks) {
    const newName = prompt("Enter a new name for your button:");
    if (newName) {
        document.getElementById("btn").innerHTML = newName;
    }
    clicks -= renamePrice;
    rebirthsNeeded++;
    renamePrice *= 7.5;
    } else if (renamePrice > clicks && rebirths <= rebirthsNeeded) {alert("You don't have enough clicks for a name change!");

    } else if (rebirthsNeeded > rebirths && renamePrice <= clicks) {alert("You need to rebirth " + rebirthsNeeded + " times to change the button name!");

    } else if (rebirthsNeeded > rebirths && renamePrice > clicks) {alert("You need to rebirth " + rebirthsNeeded + " times to change the button name! You also don't have enough clicks for a name change!");
    }
}) 

function updateRebirthButton() {
    const rebirthBtn = document.getElementById("rebirth");
    rebirthBtn.innerHTML = `
        Rebirth <br>
        Price: ${rebirthPrice.toLocaleString()} <br>
        Rebirths: ${rebirths} <br>
        Current Multiplier: ${multiplier}x <br>
        ⚠️WARNING! WILL RESET CLICKS⚠️
    `;
}

document.getElementById("rebirth").addEventListener("click", function () {

    // Check if user has enough clicks (optional logic)
    if (clicks >= rebirthPrice) {
    alert("Are you sure? This will reset ALL your clicks to 0 and multiply your clicks by " + multiplier + "! Your upgrades will stay." );
    clicks = 0
    rebirths++;
    rebirthPrice *= 75;
    multiplier += 5;
    } else {
        alert("You don't have enough clicks for a rebirth!");
    }

    // Reset other values here if needed, like clicks = 0;
    updateText()
    updateRebirthButton();

    
});



updateRebirthButton();
