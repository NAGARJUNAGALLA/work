// ----------------------------
// USERS WITH REAL SHA256 HASH
// ----------------------------
const users = [
  { username: "user1",  passwordHash: "5c75c13fe5667b77bbda88e8994bc18a81a44fbffe0ccf271f20916db8a17f65" },
  { username: "user2",  passwordHash: "e205a75dc14d83fa2f37a5360ee0d6738a5c60e0d402ac339334eb3cc3fbf131" },
  { username: "user3",  passwordHash: "d6ced1b2af53c1ec9298e51a4a9f161153c439d5c10daeed3fa73950338d4e64" },
  { username: "user4",  passwordHash: "ab02c5a65b14fdb8658df96b7cf7c2826f2d687afa00fea326ac62d19b93ae8f" },
  { username: "user5",  passwordHash: "b3d066d6ab15f7d1864475cf6fa36375b50b7f66d67e5bc2e23c941a08a7bbdb" },
  { username: "user6",  passwordHash: "52fe9c96e9e64452fa81ea6dc84aaf88e63af1e7f056790ce511aaff62002801" },
  { username: "user7",  passwordHash: "d2ec85fc54d393fc8dfc98c7b5fba2ab30f3cb85d188a8e9ae2fc1876c112adb" },
  { username: "user8",  passwordHash: "a4ae29b5d88d84275d77ead51aa3858fa8bdff0841167e33765da743369a56e1" },
  { username: "user9",  passwordHash: "c5c3539af890e73549bd309a45736f20b36ce733f605b358c42f2b55c820bc14" },
  { username: "user10", passwordHash: "5de7ffa50e1399be986b1c7b27b167d1a0e03b5b3bd991bb5c50a0ca7c7cf4a9" }
];

// ----------------------------
// SHA-256 FUNCTION
// ----------------------------
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// ----------------------------
// LOGIN FUNCTION
// ----------------------------
async function login() {
  const u = document.getElementById("username").value.trim().toLowerCase();
  const p = document.getElementById("password").value.trim();
  const error = document.getElementById("login-error");

  const hash = await sha256(p);

  const user = users.find(x => x.username.toLowerCase() === u && x.passwordHash === hash);

  if (user) {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("quiz-area").style.display = "block";
    initQuiz();
  } else {
    error.textContent = "Invalid username or password!";
  }
}

// ----------------------------
// SIMPLE QUIZ SYSTEM
// ----------------------------
let current = 0;
const quiz = [
  { q: "2 + 2 = ?", options: ["3","4","5","6"], answer: 1 },
  { q: "3 × 3 = ?", options: ["6","9","12","3"], answer: 1 }
];

function initQuiz() {
  loadQuestion();
}

function loadQuestion() {
  const q = quiz[current];
  document.getElementById("question").innerHTML = q.q;

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => alert(i === q.answer ? "Correct!" : "Wrong!");
    optionsDiv.appendChild(btn);
  });
}

function nextQuestion() {
  current++;
  if (current < quiz.length) loadQuestion();
  else alert("Quiz Completed!");
}
