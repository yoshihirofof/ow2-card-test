const canvas = document.getElementById("card");
const ctx = canvas.getContext("2d");

canvas.width = 720;
canvas.height = 1900;

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
  { name: "タンク", rank: "P1", pos: 0, color: "#4DA6FF" },
  { name: "ダメージ", rank: "D5", pos: 1, color: "#FF6666" },
  { name: "サポート", rank: "GM1", pos: 2, color: "#66FFAA" },
];

// SVGソース定義
const svgIcons = {
  "タンク": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
    <path d="M29.9106 14.02C29.9568 12.1907 28.5026 11.9133 27.2643 11.605C25.3688 11.1712 23.4277 10.9693 21.4836 11.0038V11.0038C19.5395 10.9693 17.5984 11.1712 15.703 11.605C14.4646 11.9133 13.0105 12.1907 13.0568 14.02C13.1236 16.548 13.0568 19.0761 13.0568 21.6042C13.0439 22.0212 13.1414 22.4342 13.3394 22.8014C15.1845 26.1776 17.7876 29.0797 20.9441 31.2797C21.0905 31.398 21.27 31.4681 21.4579 31.4801V31.4801C21.6458 31.4681 21.8253 31.398 21.9717 31.2797C25.1282 29.0797 27.7314 26.1776 29.5765 22.8014C29.7745 22.4342 29.872 22.0212 29.8591 21.6042C29.8951 19.0761 29.8438 16.548 29.9106 14.02Z" fill="COLOR"/>
  </svg>`,

  "ダメージ": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
    <path d="M12.0996 29.0399V30.9638C12.0996 31.1202 12.1618 31.2701 12.2723 31.3807C12.3829 31.4912 12.5328 31.5533 12.6892 31.5533H16.0547C16.211 31.5533 16.361 31.4912 16.4715 31.3807C16.5821 31.2701 16.6441 31.1202 16.6441 30.9638V29.0399H12.0996Z" fill="COLOR"/>
    <path d="M14.5429 11.028C14.4482 10.9907 14.3428 10.9907 14.2481 11.028C12.1527 11.9444 12.1045 14.983 12.1045 14.983V27.2768H16.649V14.983C16.649 14.983 16.6169 11.9551 14.5429 11.028Z" fill="COLOR"/>
    <path d="M18.7881 29.0399V30.9638C18.7881 31.1202 18.8502 31.2701 18.9608 31.3807C19.0713 31.4912 19.2213 31.5533 19.3776 31.5533H22.7485C22.9044 31.5519 23.0536 31.4894 23.1638 31.3791C23.2741 31.2689 23.3366 31.1197 23.338 30.9638V29.0399H18.7881Z" fill="COLOR"/>
    <path d="M21.2099 11.028C21.1152 10.9907 21.0098 10.9907 20.9151 11.028C18.8197 11.9444 18.7715 14.983 18.7715 14.983V27.2768H23.3214V14.983C23.3214 14.983 23.3053 11.9551 21.2099 11.028Z" fill="COLOR"/>
    <path d="M25.4756 29.0399V30.9638C25.4756 31.1202 25.5377 31.2701 25.6483 31.3807C25.7588 31.4912 25.9088 31.5533 26.0651 31.5533H29.436C29.5924 31.5533 29.7423 31.4912 29.8529 31.3807C29.9634 31.2701 30.0255 31.1202 30.0255 30.9638V29.0399H25.4756Z" fill="COLOR"/>
    <path d="M27.8982 11.028C27.8035 10.9907 27.6983 10.9907 27.6036 11.028C25.5082 11.9444 25.46 14.983 25.46 14.983V27.2768H30.0098V14.983C30.0098 14.983 29.9937 11.9551 27.8982 11.028Z" fill="COLOR"/>
  </svg>`,

  "サポート": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 42">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M31.0114 17.5325H25.2376C25.1797 17.5312 25.1245 17.5073 25.084 17.4659C25.0435 17.4245 25.0207 17.3688 25.0207 17.3108V11.5419C25.0207 11.3982 24.9637 11.2603 24.8621 11.1587C24.7605 11.0571 24.6226 11 24.4789 11H18.0745C17.9308 11 17.7929 11.0571 17.6913 11.1587C17.5897 11.2603 17.5325 11.3982 17.5325 11.5419V17.3108C17.5325 17.3696 17.5091 17.426 17.4676 17.4676C17.426 17.5092 17.3696 17.5325 17.3109 17.5325H11.542C11.3982 17.5325 11.2604 17.5896 11.1588 17.6913C11.0571 17.7929 11 17.9307 11 18.0745V24.4789C11 24.6226 11.0571 24.7605 11.1588 24.8621C11.2604 24.9637 11.3982 25.0208 11.542 25.0208H17.3109C17.3696 25.0208 17.426 25.0442 17.4676 25.0857C17.5091 25.1273 17.5325 25.1837 17.5325 25.2425V31.0114C17.5325 31.1552 17.5897 31.293 17.6913 31.3946C17.7929 31.4963 17.9308 31.5534 18.0745 31.5534H24.4789C24.6226 31.5534 24.7605 31.4963 24.8621 31.3946C24.9637 31.293 25.0207 31.1552 25.0207 31.0114V25.2524C25.0207 25.1944 25.0435 25.1388 25.084 25.0973C25.1245 25.0559 25.1797 25.032 25.2376 25.0307H31.0114C31.1552 25.0307 31.293 24.9736 31.3946 24.8719C31.4963 24.7703 31.5533 24.6325 31.5533 24.4888V18.0843C31.5546 18.0123 31.5415 17.9408 31.5149 17.8739C31.4883 17.807 31.4486 17.7461 31.3981 17.6947C31.3477 17.6434 31.2875 17.6026 31.2211 17.5747C31.1547 17.5469 31.0834 17.5325 31.0114 17.5325V17.5325Z" fill="COLOR"/>
  </svg>`
};

// SVG描画関数
function drawSVGtoCanvas(svgString, x, y, size, color) {
  let svg = svgString
    .replace(/fill="COLOR"/g, `fill="${color}"`)
    .replace(/stroke="COLOR"/g, `stroke="${color}"`);
  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const img = new Image();
  img.src = url;
  img.onload = () => {
    ctx.drawImage(img, x, y, size, size);
    URL.revokeObjectURL(url);
  };
}

// ====== ロール描画 ======
roles.forEach((r, i) => {
  const baseY = 250 + i * 80;  // 行間
  const iconSize = 70;
  const iconX = 60;
  const iconY = baseY - iconSize / 2 - 2;

  // --- ◯で囲む ---
  const circleX = iconX + iconSize / 2;
  const circleY = iconY + iconSize / 2;
  const circleRadius = iconSize / 2-8; // 外側に少し余裕

  ctx.beginPath();
  ctx.arc(circleX, circleY, circleRadius, 0, Math.PI * 2);
  ctx.strokeStyle = r.color;
  ctx.lineWidth = 3;
  ctx.stroke();

  // アイコン描画
  drawSVGtoCanvas(svgIcons[r.name], iconX, iconY, iconSize, r.color);

  // --- ロール名とランク ---
  ctx.font = "24px sans-serif";
  ctx.fillStyle = "#fff";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";

  // 「タンク」と「P1」の間を広げたい → スペースを人工的に追加
  const labelText = `${r.name}    ${r.rank}`; // ← 半角スペースを複数入れる
  ctx.fillText(labelText, iconX + iconSize + 22, baseY);

  // --- 棒線 ---
  const barX = 380;
  const barY = baseY;
  const barW = 200;
  const sections = 2;
  ctx.strokeStyle = "#aaa";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(barX, barY);
  ctx.lineTo(barX + barW, barY);
  ctx.stroke();

  // --- 好き・苦手ラベル ---
  const labels = ["好き", "", "苦手"];
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "#ccc";
  ctx.textAlign = "center";
  labels.forEach((label, j) => {
    const x = barX + (barW / sections) * j;
    ctx.beginPath();
    ctx.moveTo(x, barY - 5);
    ctx.lineTo(x, barY + 5);
    ctx.stroke();
    ctx.fillText(label, x, barY + 26);
  });

  // --- インジケータ ---
  const index = r.pos;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(barX + (barW / sections) * index, barY - 10, 6, 0, Math.PI * 2);
  ctx.fill();
});




// ====== キャラアイコン群（実アイコン） ======
const characterPaths = {
  "タンク": "assets/character/tank",
  "ダメージ": "assets/character/damage",
  "サポート": "assets/character/support"
};

const characters = {
  "タンク": [
    "D.Va.png", "ウィンストン.png", "オリーサ.png", "ザリア.png", "シグマ.png",
    "ジャンカー・クイーン.png", "ドゥームフィスト.png", "ハザード.png", "マウガ.png",
    "ラインハルト.png", "ラマットラ.png", "レッキング・ボール.png", "ロードホッグ.png"
  ],

  "ダメージ": [
    "リーパー.png", "アッシュ.png", "ウィドウメイカー.png", "エコー.png", "キャスディ.png",
    "ゲンジ.png", "ジャンクラット.png", "シンメトラ.png", "ソジョーン.png", "ソルジャー76.png",
    "ソンブラ.png", "トールビョーン.png", "トレーサー.png", "バスティオン.png", "ハンゾー.png",
    "ファラ.png", "フレイヤ.png", "ベンチャー.png", "メイ.png"
  ],

  "サポート": [
    "ルシオ.png", "アナ.png", "イラリー.png", "ウーヤン.png", "キリコ.png",
    "ジュノ.png", "ゼニヤッタ.png", "バティスト.png", "ブリギッテ.png", "マーシー.png",
    "モイラ.png", "ライフウィーバー.png"
  ]
};

const rolesForIcons = ["タンク", "ダメージ", "サポート"];
const iconsPerRow = 5;
const size = 64;
const padding = 24;
const startY = 560;

rolesForIcons.forEach((role, ri) => {
  const baseY = startY + ri * (size * 2 + 140); // ← 行間を少し広く（120→140）
  ctx.fillStyle = "#ccc";
  ctx.font = "bold 28px sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(role, 80, baseY - 20);

  characters[role].forEach((file, i) => {
    const img = new Image();
    img.src = `${characterPaths[role]}/${file}`;
    img.onload = () => {
      const x = 80 + (i % iconsPerRow) * (size + padding);
      const y = baseY + Math.floor(i / iconsPerRow) * (size + 20);
      ctx.drawImage(img, x, y, size, size);

      // 状態表示（仮: ♥ or 暗転）
      const status = i % 5; // 5パターンで散らす
      if (status === 4) {
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(x, y, size, size);
      } else if (status === 0) {
        ctx.fillStyle = "#ff6688";
        ctx.font = "bold 26px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("♥", x + size / 2 + 14, y + size / 2 - 14);
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
      }
    };
  });
});






// ====== 保存ボタン ======
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
