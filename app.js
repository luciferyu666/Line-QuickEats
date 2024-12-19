// 1️⃣ LIFF 初始化
window.onload = function () {
  liff
    .init({
      liffId: "2006691726-aGlQ9R4R", // 替換為您從 LINE Developers 取得的 LIFF ID
    })
    .then(() => {
      console.log("✅ LIFF 初始化成功");

      // 2️⃣ 如果用戶尚未登錄，請求用戶登錄
      if (!liff.isLoggedIn()) {
        document
          .getElementById("startOrderButton")
          .addEventListener("click", () => {
            liff.login();
          });
      } else {
        getUserProfile();
      }
    })
    .catch((err) => {
      console.error("❌ LIFF 初始化失敗:", err);
    });
};

// 3️⃣ 獲取用戶個人信息
function getUserProfile() {
  liff
    .getProfile()
    .then((profile) => {
      const name = profile.displayName;
      const pictureUrl = profile.pictureUrl;
      document.getElementById("profileInfo").innerHTML = `
        <p>👤 歡迎, ${name}</p>
        <img src="${pictureUrl}"  width="100">
      `;
    })
    .catch((err) => {
      console.error("❌ 無法獲取用戶個人信息:", err);
    });
}

// 4️⃣ 點擊“開始點餐”按鈕時的行為
document.getElementById("startOrderButton").addEventListener("click", () => {
  if (!liff.isLoggedIn()) {
    liff.login();
  } else {
    // 5️⃣ 重定向到 QuickEats首頁
    liff.openWindow({
      url: "https://quick-eats-two.vercel.app/", // QuickEats 的首頁
      external: true, // 在新的視窗中開啟
    });
  }
});
