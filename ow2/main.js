const canvas = document.getElementById("card");
const ctx = canvas.getContext("2d");

// 背景
ctx.fillStyle = "#28313b";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// ====== プレイヤー情報 ======
ctx.fillStyle = "#fff";
ctx.font = "bold 36px sans-serif";
ctx.fillText("よっしー", 40, 80);

ctx.font = "24px sans-serif";
ctx.fillStyle = "#ccc";
ctx.fillText("Battletag: YOSHI#1234", 40, 120);

// 区切り線
ctx.strokeStyle = "#666";
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(40, 150);
ctx.lineTo(680, 150);
ctx.stroke();

// ====== ロール情報 ======
const roles = [
  { name: "タンク", rank: "P1", pos: 0 },
  { name: "ダメージ", rank: "D5", pos: 1 },
  { name: "サポート", rank: "GM1", pos: 2 },
];

ctx.font = "24px sans-serif";
roles.forEach((r, i) => {
  const y = 230 + i * 100;
  ctx.fillStyle = "#fff";
  ctx.fillText(`${r.name} ${r.rank}`, 60, y);

  const barX = 250, barY = y - 10, barW = 300;
  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(barX, barY);
  ctx.lineTo(barX + barW, barY);
  ctx.stroke();

  // 区切り線3本
  for (let j = 0; j <= 3; j++) {
    const x = barX + (barW / 3) * j;
    ctx.beginPath();
    ctx.moveTo(x, barY - 5);
    ctx.lineTo(x, barY + 5);
    ctx.stroke();
  }

  // インジケータ（0=得意,1=普通,2=苦手）
  const index = r.pos; 
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(barX + (barW / 3) * index, barY - 10, 6, 0, Math.PI * 2);
  ctx.fill();
});

// ====== キャラアイコン群 ======
const icons = {
  "タンク": "assets/tank.png",
  "ダメージ": "assets/damage.png",
  "サポート": "assets/support.png"
};

const rolesForIcons = ["タンク", "ダメージ", "サポート"];
const iconsPerRow = 3;
const size = 100;
const padding = 40;
const startY = 550;

rolesForIcons.forEach((role, ri) => {
  const img = new Image();
  img.src = icons[role];

  img.onload = () => {
    const baseY = startY + ri * (size * 2 + 140);
    ctx.fillStyle = "#ccc";
    ctx.font = "28px sans-serif";
    ctx.fillText(role, 60, baseY - 20);

    for (let i = 0; i < 6; i++) {
      const x = 60 + (i % iconsPerRow) * (size + padding);
      const y = baseY + Math.floor(i / iconsPerRow) * (size + 20);
      ctx.drawImage(img, x, y, size, size);

      const status = i % 3; 
      if (status === 2) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(x, y, size, size);
      } else if (status === 0) {
        ctx.fillStyle = "#ff6688";
        ctx.font = "bold 32px sans-serif";
        ctx.fillText("♥", x + size - 28, y + 32);
      }
    }
  };
});

// ====== 保存ボタン ======
document.getElementById("saveBtn").addEventListener("click", () => {
  // PNGデータを生成
  const image = canvas.toDataURL("image/png");

  // ダウンロードリンクを一時的に作成
  const link = document.createElement("a");
  link.download = "ow2_card.png";
  link.href = image;
  link.style.display = "none";

  // DOMに追加 → 実際にクリック → 削除
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
