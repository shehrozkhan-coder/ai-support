(function () {
  const api_Url = new URL(
  "https://ai-support-mauve.vercel.app"
)
  const scriptTag = document.currentScript
  const ownerId = scriptTag.getAttribute("data-owner-id")

  if (!ownerId) {
    console.log("owner ID not found")
    return
  }

  /* ===== BRAND CONFIG ===== */
  const brandColor = "#000" // ✅ BLACK (icon + button + user msgs)
  const isMobile = window.innerWidth < 480

  /* ---------- FLOATING BUTTON ---------- */
  const button = document.createElement("div")
  button.innerHTML = "🗨️"

  const badge = document.createElement("div")
  badge.innerHTML = "1"

  Object.assign(badge.style, {
    position: "absolute",
    top: "-2px",
    right: "-2px",
    background: "#ef4444",
    color: "#fff",
    fontSize: "11px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600"
  })

  Object.assign(button.style, {
    position: "fixed",
    bottom: isMobile ? "16px" : "24px",
    right: isMobile ? "16px" : "24px",
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    background: brandColor,
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    cursor: "pointer",
    boxShadow: "0 18px 40px rgba(0,0,0,.25)",
    zIndex: "999999",
    transition: "transform .2s ease",
  })

  button.appendChild(badge)
  document.body.appendChild(button)

  /* ---------- CHAT BOX ---------- */
  const box = document.createElement("div")
  Object.assign(box.style, {
    position: "fixed",
    bottom: isMobile ? "78px" : "92px",
    right: isMobile ? "16px" : "24px",
    width: isMobile ? "calc(100vw - 32px)" : "320px",
    height: "360px",
    background: "#fff",
    color: "#111",
    fontSize: "14px",
    borderRadius: "18px",
    boxShadow: "0 30px 70px rgba(0,0,0,.25)",
    zIndex: "999999",
    overflow: "hidden",
    display: "none",
    flexDirection: "column",
    border: "1px solid #e5e7eb",
    transformOrigin: "bottom right",
  })

  box.innerHTML = `
    <div style="
      padding:14px 16px;
      display:flex;
      justify-content:space-between;
      align-items:center;
      border-bottom:1px solid #e5e7eb;
      font-weight:600;
      background:#fff;
    ">
      <span>Support</span>
      <span id="chat-close" style="cursor:pointer;color:#9ca3af">✕</span>
    </div>

    <div id="chat-messages" style="
      flex:1;
      padding:14px;
      overflow-y:auto;
      background:#f9fafb;
      display:flex;
      flex-direction:column;
    "></div>

    <div style="
      display:flex;
      border-top:1px solid #e5e7eb;
      padding:10px;
      gap:8px;
      background:#fff;
    ">
      <input id="chat-input" type="text" style="
        flex:1;
        padding:9px 12px;
        border-radius:10px;
        border:1px solid #d1d5db;
        background:#fff;
        color:#111;
        font-size:13px;
        outline:none;
      " placeholder="Type a message"/>

      <button id="chat-send" style="
        padding:9px 14px;
        border:none;
        background:${brandColor};
        color:#fff;
        border-radius:10px;
        cursor:pointer;
        font-size:13px;
      ">Send</button>
    </div>
  `

  document.body.appendChild(box)

  /* ---------- TOGGLE (FIXED) ---------- */
  button.onclick = () => {
    const open = box.style.display === "none"

    if (open) {
      box.style.animation = "openBox .25s ease" // ✅ reset animation
      box.style.display = "flex"
      badge.style.display = "none"
    } else {
      box.style.display = "none"
    }
  }

  document.querySelector("#chat-close").onclick = () => {
    box.style.animation = "closeBox .2s ease forwards"
    setTimeout(() => (box.style.display = "none"), 180)
  }

  const input = document.querySelector("#chat-input")
  const sendBtn = document.querySelector("#chat-send")
  const messageArea = document.querySelector("#chat-messages")

  /* ---------- MESSAGE ---------- */
  function addMessage(text, from) {
    const bubble = document.createElement("div")
    bubble.innerHTML = text

    Object.assign(bubble.style, {
      maxWidth: "78%",
      padding: "9px 13px",
      borderRadius: "16px",
      fontSize: "13px",
      marginBottom: "10px",
      lineHeight: "1.45",
      alignSelf: from === "user" ? "flex-end" : "flex-start",
      background: from === "user" ? brandColor : "#e5e7eb",
      color: from === "user" ? "#fff" : "#111",
      animation: "msgIn .25s ease"
    })

    messageArea.appendChild(bubble)
    messageArea.scrollTop = messageArea.scrollHeight
  }

  /* ---------- WELCOME MESSAGE ---------- */
  setTimeout(() => {
    addMessage("Hi! How can I help you today?", "bot")
  }, 700)

  /* ---------- SEND ---------- */
  sendBtn.onclick = async () => {
    const text = input.value.trim()
    if (!text) return

    addMessage(text, "user")
    input.value = ""

    const typing = document.createElement("div")
    typing.innerHTML = `<span class="dot"></span><span class="dot"></span><span class="dot"></span>`
    typing.className = "typing"

    messageArea.appendChild(typing)
    messageArea.scrollTop = messageArea.scrollHeight

    try {
  console.log("FINAL API URL USED BY FETCH:", api_Url)

  const response = await fetch(api_Url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ownerId, message: text })
  })


      const data = await response.json()
      messageArea.removeChild(typing)
      addMessage(data?.reply || "Something went wrong", "bot")
    } catch {
      messageArea.removeChild(typing)
      addMessage("Something went wrong", "bot")
    }
  }

  /* ---------- STYLES ---------- */
  const style = document.createElement("style")
  style.innerHTML = `
    @keyframes msgIn {
      from {opacity:0;transform:translateY(6px)}
      to {opacity:1;transform:none}
    }
    @keyframes openBox {
      from {opacity:0;transform:scale(.95)}
      to {opacity:1;transform:none}
    }
    @keyframes closeBox {
      to {opacity:0;transform:scale(.95)}
    }
    .typing {
      display:flex;
      gap:4px;
      margin-bottom:8px;
      align-self:flex-start;
    }
    .typing .dot {
      width:6px;
      height:6px;
      background:#9ca3af;
      border-radius:50%;
      animation: bounce 1.4s infinite ease-in-out both;
    }
    .typing .dot:nth-child(2){animation-delay:.2s}
    .typing .dot:nth-child(3){animation-delay:.4s}
    @keyframes bounce {
      0%,80%,100%{transform:scale(0)}
      40%{transform:scale(1)}
    }
  `
  document.head.appendChild(style)
})()
