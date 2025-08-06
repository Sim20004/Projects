function saveInput() {
    toEncrypt = document.getElementById("tbe").value;
    encryptionPassword = document.getElementById("psw").value;
    console.log("User has submitted text to be encrypted: " + toEncrypt + ", with the Encryption Key: " + encryptionPassword);
    console.log("Encrypting...");

    let encrypted = "";
    for (let i = 0; i < toEncrypt.length; i++) {
        const textChar = toEncrypt.charCodeAt(i);
        const keyChar = encryptionPassword.charCodeAt(i % encryptionPassword.length);
        encrypted += String.fromCharCode(textChar ^ keyChar);
    }

    encryptedText = btoa(encrypted);
    console.log("Encrypted Text (Base64): " + encryptedText);
    

    document.getElementById("encText").textContent = encryptedText;
}

function decrypt() {
    const toDecrypt = document.getElementById("tbd").value;
    const decryptionPassword = document.getElementById("psw2").value;

    if (!toDecrypt || !decryptionPassword) {
        alert("Please enter text and password to decrypt.");
        return;
    }

    let encrypted;
    try {
        encrypted = atob(toDecrypt);
    } catch (e) {
        alert("Invalid Base64 string.");
        return;
    }

    let decrypted = "";
    for (let i = 0; i < encrypted.length; i++) {
        const encChar = encrypted.charCodeAt(i);
        const keyChar = decryptionPassword.charCodeAt(i % decryptionPassword.length);
        decrypted += String.fromCharCode(encChar ^ keyChar);
    }

    document.getElementById("decText").textContent = decrypted;
}

function copyText(elementId) {
  const text = document.getElementById(elementId).textContent;
  if (!text) {
    console.log("Nothing to copy!");
    return;
  }
  navigator.clipboard.writeText(text).then(() => {
    console.log("Copied to clipboard!");
  }).catch(() => {
    console.log("Failed to copy.");
  });
}

