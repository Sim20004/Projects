var clicks = 0;
var pointsperClick = 1;
var ppcprice = 50;

const autoClickerPrice = 1000;
const devPointsBox = document.getElementById("devPoints");
let autoClickerUnlocked = false;
let autoClickerSpeed = 1; // Clicks per second
let autoClickerInterval;
let autoClickerUpgradePrice = 500;
let lastMilestoneIndex = -1;
let InfinityAvailable = false;
let toggleInfinity = false;
let godlyClickerUnlocked = false;   






const milestones = [
    { points: 500, name: "Clicker", color: "green", requiresAuto: false, unlocked: false},
    { points: 1500, name: "Good Clicker", color: "blue", requiresAuto: false, unlocked: false},
    { points: 5000, name: "Intermediate Clicker", color: "purple", requiresAuto: true, unlocked: false },
    { points: 15000, name: "Professional Clicker", color: "red", requiresAuto: true, unlocked: false },
    { points: 50000, name: "Ultimate Clicker", color: "yellow", requiresAuto: true, unlocked: false },
    { points: 100000, name: "Angel Clicker", color: "gold", requiresAuto: true, unlocked: false },
    { points: 1000000, name: "Heavenly Clicker", color: "turquoise", requiresAuto: true, unlocked: false },
    { points: 10000000, name: "GODLY CLICKER", color: "rainbow", requiresAuto: true, unlocked: false }
];


  



devPointsBox.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        const value = parseInt(devPointsBox.value);
        if (!isNaN(value)) {
            clicks += value;
            updateText();
            devPointsBox.value = ""; // Clear after use
        }
    }
});


function updateStatus() {
    const statusEl = document.getElementById("status");
    const colors1 = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "red", "orange", "yellow", "green", "blue"];

    for (let milestone of milestones) {
        if (clicks >= milestone.points && !milestone.unlocked) {
          milestone.unlocked = true; // ✅ Mark as unlocked
      
          if (milestone.name === "GODLY CLICKER" && !godlyClickerUnlocked) {
            autoClickerUnlocked = true;
            startAutoClicker();
            updateText()
            const text = milestone.name;        
            const rainbowHTML = [...text].map((char, i) =>
              `<span style="all: unset; color: ${colors1[i % colors1.length]}; font-weight: bold;">${char}</span>`
            ).join("");
            statusEl.innerHTML = rainbowHTML;
            statusEl.style.color = "inherit";
            statusEl.style.setProperty("color", "inherit", "important");
            godlyClickerUnlocked = true;
            showAchievement(milestone.name, "rainbow");
          } else {
            statusEl.innerHTML = milestone.name;
            statusEl.style.color = milestone.color;
            showAchievement(milestone.name, milestone.color);
          }
        }
      }
    }      

document.getElementById("autoClickerSpeed").addEventListener("click", function () {
    if(clicks >= autoClickerUpgradePrice && autoClickerUnlocked) {
    clicks -= autoClickerUpgradePrice;
    autoClickerSpeed *= 2;
    autoClickerUpgradePrice *= 2;
    } else if (clicks <= autoClickerUpgradePrice && autoClickerUnlocked){
        alert("You don't have enough points!");
    } else if (!autoClickerUnlocked && clicks >= autoClickerUpgradePrice) {
        alert("You need to unlock the AutoClicker first!");
    } else if (!autoClickerUnlocked && clicks <= autoClickerPrice) {
        alert("You don't have enough points and need to unlock the AutoClicker first!"); 
    }
})



function updateText() {
    document.getElementById("text").innerHTML = "Points: " + Math.floor(clicks);
    document.getElementById("moreClicks").innerHTML = 
        "More Points<br>Price: " + Math.floor(ppcprice) + "<br>Current PPC: " + pointsperClick;

    document.getElementById("autoClicker").innerHTML = 
        autoClickerUnlocked ? "AutoClicker<br>Unlocked" : "AutoClicker<br>Price: " + autoClickerPrice;

    document.getElementById("autoClickerSpeed").innerHTML = 
        "AutoClicker Speed<br>Price: " + Math.floor(autoClickerUpgradePrice) + "<br>Current CPS: " + autoClickerSpeed;

    updateStatus();

    

    
}
function spawnCursor() {
    // Remove existing cursor if one already exists
    const existingCursor = document.querySelector(".cursor");
    if (existingCursor) return; 

    const cursor = document.createElement("div");
    cursor.classList.add("cursor");

    const button = document.getElementById("btn");
    const buttonRect = button.getBoundingClientRect();

    const spawnX = 50;
    const spawnY = 50;

    const targetX = buttonRect.left + buttonRect.width / 2 - spawnX;
    const targetY = buttonRect.top + buttonRect.height / 2 - spawnY;

    cursor.style.setProperty('--target-x', `${targetX}px`);
    cursor.style.setProperty('--target-y', `${targetY}px`);
    cursor.style.left = `${spawnX}px`;
    cursor.style.top = `${spawnY}px`;

    document.body.appendChild(cursor);

    setTimeout(() => cursor.remove(), 1200);
}


// Update startAutoClicker function to spawn cursors for each CPS
function startAutoClicker() {
    if (autoClickerInterval) clearInterval(autoClickerInterval);
    autoClickerInterval = setInterval(() => {
        clicks += autoClickerSpeed;
        updateText();

        // Spawn cursors for the clicks per second
        for (let i = 0; i < autoClickerSpeed; i++) {
            spawnCursor();
        }
    }, 1000);
}


document.getElementById("btn").addEventListener("click", function () {
    clicks += pointsperClick * multiplier;  
    updateText();
});

document.getElementById("moreClicks").addEventListener("click", function () {
    if (clicks >= ppcprice) {
        clicks -= ppcprice;
        pointsperClick *= 2;
        ppcprice *= 2;
        updateText();
    } else {
        alert("You don't have enough points!");
    }
});

document.getElementById("toggleInfinity").addEventListener("click", function () {
    if (InfinityAvailable) {
        if (toggleInfinity) {
            clicks = 0; // Reset clicks to 0
        } else {
            clicks = Infinity; // Set clicks to infinity
        }
        toggleInfinity = !toggleInfinity; // Toggle the state
    }
    updateText(); // Update the UI when the toggle changes
});

// Check for the IP and toggle button visibility
fetch("https://api.ipify.org?format=json")
  .then(res => res.json())
  .then(data => {
    if (data.ip === "94.4.247.81") { // Developer IP address
      document.getElementById("toggleInfinity").style.visibility = "visible"; // Show button
      document.getElementById("devPoints").style.visibility = "visible"; // Make textarea visible
      InfinityAvailable = true;  // Enable functionality
      console.log("Developer Detected! Enabling Developer Mode.");
    } else {
      document.getElementById("toggleInfinity").style.visibility = "hidden"; // Hide button
      document.getElementById("devPoints").style.visibility = "hidden"; // Hide textarea
      InfinityAvailable = false;  // Disable functionality
      toggleInfinity = false;    // Set toggle state to off
      clicks = 0; // Reset clicks to 0
    }
    console.log("IP Address:", data.ip); // Log the IP address for debugging
    updateText(); // Update the UI after checking the IP
  })
  .catch(error => console.error("Error fetching IP:", error)); // Error handling




document.getElementById("autoClicker").addEventListener("click", function () {
    if (!autoClickerUnlocked && clicks >= autoClickerPrice) {
        clicks -= autoClickerPrice;
        autoClickerUnlocked = true;
        startAutoClicker();
        updateText();
    }
    else {
        alert("You don't have enough points!");
    }
});






function showAchievement(name, color) {
    const overlay = document.getElementById("overlay");
    const statusEl = document.getElementById("achievementStatus");
    const closeBtn = document.getElementById("closePopup");

    const audio = new Audio("status1.mp3");
    audio.play();

    if (name === "GODLY CLICKER") {
        const text = name;
        const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet", "red", "orange", "yellow", "green", "blue"];
        statusEl.innerHTML = [...text].map((char, i) =>
            `<span style="color:${colors[i % colors.length]}">${char}</span>`
        ).join("");
    } else {
        statusEl.textContent = name;
        statusEl.style.color = color;
    }

    overlay.style.display = "flex"; // Show the overlay
    closeBtn.style.display = "none"; // Hide the close button initially

    setTimeout(() => {
        closeBtn.style.display = "block"; // Show the close button after 3 seconds
    }, 3000);
}

    document.getElementById("closePopup").addEventListener("click", function () {
    const overlay = document.getElementById("overlay");
    overlay.style.display = "none"; // Hide the overlay
    })




updateText();
