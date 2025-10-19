const canvas = document.getElementById("card");
const ctx = canvas.getContext("2d");

canvas.width = 720;
canvas.height = 1100;

// 背景
ctx.fillStyle = "#28313b";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ===== 各セクション描画 =====
drawHeader(ctx);
drawRoles(ctx);
drawCharacters(ctx);

// ===== 保存ボタン =====
document.getElementById("saveBtn").addEventListener("click", () => {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "ow2_card.png";
  link.href = image;
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
