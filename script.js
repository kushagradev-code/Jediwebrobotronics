// Screen Switching Controller
function showScreen(screenId) {
  const screens = document.querySelectorAll('.screen');
  screens.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) target.classList.add('active');
}

// -------------------------------------------------------------
// 1. DASHBOARD CONTROLLERS
// -------------------------------------------------------------
let passkeySeconds = 300;
const timerElement = document.getElementById('passkeyTimer');

function updatePasskeyTimer() {
  if (!timerElement) return;
  let mins = Math.floor(passkeySeconds / 60);
  let secs = passkeySeconds % 60;
  timerElement.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  
  if (passkeySeconds > 0) {
    passkeySeconds--;
  } else {
    timerElement.innerText = "EXPIRED - RENEW REQUIRED!";
  }
}
setInterval(updatePasskeyTimer, 1000);

function refreshPasskey() {
  passkeySeconds = 300;
  updatePasskeyTimer();
  alert("🔑 Rotary Passkey Re-authenticated! Identity confirmed for next 60 rotations.");
}

let currentTrustTier = 1;
function simulateTrustUpgrade() {
  const trustText = document.getElementById('trustLevelText');
  const progressBar = document.getElementById('trustProgressBar');

  if (currentTrustTier === 1) {
    currentTrustTier = 2;
    trustText.innerText = "Level 2 (Multi-Jedi Verified)";
    progressBar.style.width = "66%";
    alert("🟢 Trial Verification Passed! Granted Multi-Jedi Operational Access.");
  } else if (currentTrustTier === 2) {
    currentTrustTier = 3;
    trustText.innerText = "Level 3 (Strategic Council Access)";
    progressBar.style.width = "100%";
    alert("⭐ 60 Planetary Rotations Met! Strategic Planning Council Unlocked.");
  } else {
    currentTrustTier = 1;
    trustText.innerText = "Level 1 (Limited Access)";
    progressBar.style.width = "33%";
    alert("🔄 Demo reset back to Level 1 Recruit status.");
  }
}

function setNetworkStatus(status) {
  const badge = document.getElementById('networkStatusBadge');
  const desc = document.getElementById('statusDescription');
  const gauge = document.getElementById('riskGaugeFill');
  const riskTxt = document.getElementById('riskPercentage');

  badge.classList.remove('status-safe', 'status-warn', 'status-danger');
  gauge.classList.remove('safe-fill', 'warn-fill', 'danger-fill');

  if (status === 'safe') {
    badge.innerText = "STATUS: SECURE";
    badge.classList.add('status-safe');
    gauge.classList.add('safe-fill');
    riskTxt.innerText = "12%";
    desc.innerText = "All hidden safe nodes operating under standard stealth protocols.";
  } else if (status === 'warn') {
    badge.innerText = "STATUS: ALERT";
    badge.classList.add('status-warn');
    gauge.classList.add('warn-fill');
    riskTxt.innerText = "55%";
    desc.innerText = "Imperial sensor activity detected nearby. Encryption frequency shifted.";
  } else if (status === 'danger') {
    badge.innerText = "STATUS: LOCKDOWN";
    badge.classList.add('status-danger');
    gauge.classList.add('danger-fill');
    riskTxt.innerText = "95%";
    desc.innerText = "⚠️ LOCKDOWN ENFORCED! Safe nodes hidden. Dual-Jedi protocol mandatory!";
  }
}

function addLiveSignal() {
  const feed = document.getElementById('signalsFeed');
  const userIntel = prompt("Enter emergency signal/intel transmission for the Syndicate:");
  if (userIntel) {
    const li = document.createElement('li');
    li.innerHTML = `<span class="signal-tag warn-tag">[LIVE TRANSMISSION]</span> ${userIntel}`;
    feed.prepend(li);
  }
}

// -------------------------------------------------------------
// 2. GALAXY MAP CONTROLLERS (WITH VISUAL TELEMETRY METERS)
// -------------------------------------------------------------
function filterMap(category) {
  const nodes = document.querySelectorAll('.planet-node');
  nodes.forEach(node => {
    if (category === 'all' || node.classList.contains(category)) {
      node.style.display = 'flex';
    } else {
      node.style.display = 'none';
    }
  });
}

function inspectNode(name, status, sector, outposts, shield, signal, threat, beacon) {
  document.getElementById('planetTitle').innerText = name;
  document.getElementById('planetSector').innerText = sector;
  
  document.getElementById('planetDetails').style.display = 'block';

  const badge = document.getElementById('planetStatusBadge');
  badge.innerText = status.toUpperCase();

  if (status === 'Safe') badge.style.color = '#4eef90';
  else if (status === 'Uncertain') badge.style.color = '#f1c40f';
  else badge.style.color = '#ff4d4d';

  document.getElementById('planetOutposts').innerText = outposts;

  // Dynamically update visual telemetry graphic meters
  document.getElementById('shieldVal').innerText = shield + '%';
  document.getElementById('shieldBar').style.width = shield + '%';

  document.getElementById('signalVal').innerText = signal + '%';
  document.getElementById('signalBar').style.width = signal + '%';

  document.getElementById('threatVal').innerText = threat + '%';
  document.getElementById('threatBar').style.width = threat + '%';
}

function pingSystemBeacon() {
  const name = document.getElementById('planetTitle').innerText;
  alert(`📡 Encrypted pulse signal pinged to ${name}. Hidden beacon verified!`);
}

// -------------------------------------------------------------
// 3. ASTERION CODEX CIPHER ENGINE
// -------------------------------------------------------------
const GLYPHS = ['⟐', '☉', '◇', '△', '☾'];
const MATRIX = [
  ['A', 'B', 'C', 'D', 'E'],
  ['F', 'G', 'H', 'I', 'K'],
  ['L', 'M', 'N', 'O', 'P'],
  ['Q', 'R', 'S', 'T', 'U'],
  ['V', 'W', 'X', 'Y', 'Z']
];

function runEncoder() {
  let text = document.getElementById('plainInput').value.toUpperCase();
  let encodedTokens = [];

  for (let char of text) {
    if (char === ' ') {
      encodedTokens.push('·');
      continue;
    }
    if (char === 'J') char = 'I';

    let found = false;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (MATRIX[r][c] === char) {
          encodedTokens.push(GLYPHS[r] + GLYPHS[c]);
          found = true;
          break;
        }
      }
      if (found) break;
    }
  }

  document.getElementById('encodedOutput').innerText = encodedTokens.join(' ') || "---";
}

function runDecoder() {
  let input = document.getElementById('glyphInput').value.trim();
  let isDualForceActive = document.getElementById('dualForceCheck').checked;

  if (isDualForceActive) {
    let key2 = prompt("🔒 [DUAL FORCE PROTOCOL REQUIRED]\nSecond Jedi, enter your Shadow Key approval code:");
    if (!key2) {
      alert("❌ Authentication failed! Second Jedi approval required to decode this classified transmission.");
      return;
    }
  }

  let tokens = input.split(/\s+/);
  let decodedText = "";

  for (let token of tokens) {
    if (token === '·') {
      decodedText += " ";
      continue;
    }

    if (token.length === 2) {
      let rowGlyph = token[0];
      let colGlyph = token[1];

      let r = GLYPHS.indexOf(rowGlyph);
      let c = GLYPHS.indexOf(colGlyph);

      if (r !== -1 && c !== -1) {
        decodedText += MATRIX[r][c];
      } else {
        decodedText += "?";
      }
    }
  }

  let outputBox = document.getElementById('decodedOutput');
  outputBox.innerText = decodedText || "INVALID GLYPH INPUT";
  if (isDualForceActive) {
    outputBox.innerText += "  [🟢 TWO-JEDI AUTHENTICATED]";
  }
}
