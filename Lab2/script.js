const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");
const generateKeyBtn = document.getElementById("keyBtn");
const keyText = document.getElementById("keyText");

const crackBtn = document.getElementById("crackBtn");

encryptBtn.addEventListener("click", () => {
  const key = keyText.value;
  const text = inputText.value;
  outputText.value = vigenereEncrypt(text, key);
});

decryptBtn.addEventListener("click", () => {
  const key = keyText.value;
  const text = outputText.value;
  inputText.value = vigenereDecrypt(text, key);
});

function vigenereEncrypt(plainText, key) {
  let encryptedText = '';
  key = key.toLowerCase();
  let keyIndex = 0;

  for (let i = 0; i < plainText.length; i++) {
      const char = plainText[i];

      if (char.match(/[a-z]/i)) {
          const isUpperCase = char === char.toUpperCase();
          const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
          const keyChar = key[keyIndex % key.length];
          const keyShift = keyChar.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
          const encryptedChar = String.fromCharCode(((char.charCodeAt(0) - base + keyShift) % 26) + base);
          encryptedText += encryptedChar;
          keyIndex++;
      } else {
          encryptedText += char;
      }
  }

  return encryptedText;
}

function vigenereDecrypt(encryptedText, key) {
  let decryptedText = '';
  key = key.toLowerCase();
  let keyIndex = 0;

  for (let i = 0; i < encryptedText.length; i++) {
      const char = encryptedText[i];

      if (char.match(/[a-z]/i)) {
          const isUpperCase = char === char.toUpperCase();
          const base = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
          const keyChar = key[keyIndex % key.length];
          const keyShift = keyChar.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
          const decryptedChar = String.fromCharCode(((char.charCodeAt(0) - base - keyShift + 26) % 26) + base);
          decryptedText += decryptedChar;
          keyIndex++;
      } else {
          decryptedText += char;
      }
  }

  return decryptedText;
}
