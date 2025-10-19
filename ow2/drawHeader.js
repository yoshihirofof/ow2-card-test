function drawHeader(ctx) {
  // ====== プレイヤー情報 ======
  ctx.fillStyle = "#fff";
  ctx.font = "bold 36px sans-serif";
  ctx.fillText("ヨシヒロ", 40, 80);

  ctx.font = "24px sans-serif";
  ctx.fillStyle = "#ccc";
  ctx.fillText("Battletag: yoshihiro#11132", 40, 120);

  // 区切り線
  ctx.strokeStyle = "#666";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(40, 150);
  ctx.lineTo(680, 150);
  ctx.stroke();
}
