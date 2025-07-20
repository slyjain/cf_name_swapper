
# CP Name Mapper

A lightweight Chrome extension to remap usernames on competitive programming websites (e.g., Codeforces). It allows you to define custom name mappings like `taro → samyak`, and automatically replaces visible names on supported pages.

---

## 🔧 Features

- Define custom mappings in the extension popup (`key:value`, one per line)
- Stores mappings in `localStorage`
- Automatically replaces names on Codeforces problem pages or standings

---

## 🧪 How to Use

1. **Clone or download** this repo.
2. **Go to** `chrome://extensions/` in your browser.
3. **Enable** “Developer Mode” (top-right toggle).
4. **Click** “Load unpacked” and select the project folder.
5. **Click** the extension icon in the toolbar.
6. **Enter mappings** in the format:
   ```
   taro:samyak
   jiro:omkar
   ```
7. Click **Save Mappings**. You’ll see a “Saved!” alert.
8. **Refresh any Codeforces page** — mapped names should appear automatically.

---

## 📁 File Structure

```
cp-name-mapper/
├── manifest.json           # Extension metadata + permissions
├── popup.html              # UI for entering name mappings
├── content.js              # Logic to replace names on pages
└── icons/                  # (optional) extension icon files
```

---

## 📦 Tech Stack

- HTML + JavaScript
- `localStorage` for persistence
- DOM manipulation via `content.js`

---

## ✅ Example Use Case

You’re coaching a team for a contest and want to view usernames as their real names. Just set:

```
Alice:Samyak
Bob:Omkar
```

And the names will be auto-replaced when you open Codeforces.

---

## ⚠️ Permissions

- `activeTab`: to run scripts on the current page
- `storage`: to persist mappings

---

## 🧩 To-Do (Optional Improvements)

- Site-specific enable/disable toggle
- Sync settings across devices using `chrome.storage.sync`
- Support for other CP platforms (AtCoder, LeetCode)

---

## 📜 License

MIT — feel free to fork and modify.
