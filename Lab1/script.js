const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");

const encryptBtn = document.getElementById("encryptBtn");
const decryptBtn = document.getElementById("decryptBtn");

const generateKeyBtn = document.getElementById("keyBtn");
const keyText = document.getElementById("keyText");

const crackBtn = document.getElementById("crackBtn");

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

encryptBtn.addEventListener('click', () => {
  let text = inputText.value;
  let key = keyText.value;
  outputText.value = encrypt(text, key);
});

decryptBtn.addEventListener('click', () => {
  let text = inputText.value;
  let key = keyText.value;
  outputText.value = decrypt(text, key);
});

generateKeyBtn.addEventListener('click', () => {
  const key = generateKey();
  keyText.textContent = key;
});


crackBtn.addEventListener('click', () => {
  outputText.value = crackCipher(inputText.value);
});

function generateKey() {

  const shuffled = alphabet.split('').sort(() => Math.random() - 0.5).join('');
  return shuffled;
}

function encrypt(text, key) {
  let encryptedText = '';

  for (let char of text.toUpperCase()) {
      const index = alphabet.indexOf(char);
      if (index !== -1) {
          encryptedText += key[index];
      } else {
          encryptedText += char; // Не шифруем символы, не входящие в алфавит
      }
  }
  return encryptedText;
}

function decrypt(encryptedText, key) {
  let decryptedText = '';

  for (let char of encryptedText.toUpperCase()) {
      const index = key.indexOf(char);
      if (index !== -1) {
          decryptedText += alphabet[index];
      } else {
          decryptedText += char; // Не расшифровываем символы, не входящие в ключ
      }
  }
  return decryptedText;
}

function frequencyAnalysis(encryptedText) {
  const frequency = {};

  // Подсчет частоты букв в зашифрованном тексте
  for (let char of encryptedText.toUpperCase()) {
      if (alphabet.includes(char)) {
          frequency[char] = (frequency[char] || 0) + 1;
      }
  }

  // Сортировка букв по частоте
  const sortedFrequency = Object.entries(frequency).sort((a, b) => b[1] - a[1]);
  return sortedFrequency.map(entry => entry[0]);
}

function crackCipher(encryptedText, key) {
  const commonLetters = 'ETAOINSHRDLCUMWFGYPBVKJXQZ'; // Частотный порядок букв в английском языке
  const frequency = frequencyAnalysis(encryptedText);
  
  // Создание предполагаемого ключа на основе частоты
  let guessedKey = '';
  for (let i = 0; i < commonLetters.length; i++) {
      guessedKey += frequency[i] || '?'; // Используем '?' для недостающих букв
  }

  keyText.value = guessedKey;

  // Декодирование текста с использованием предполагаемого ключа
  return decrypt(encryptedText, guessedKey);
}