function drawCharacters(ctx) {
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

  const roleLabels = {
    "タンク": "Tank",
    "ダメージ": "Damage",
    "サポート": "Support"
  };

  const rolesForIcons = ["タンク", "ダメージ", "サポート"];
  const iconsPerRow = 8;
  const size = 60;
  const padding = 10;
  const startY = 450;

  let currentY = startY;

  rolesForIcons.forEach((role) => {
    ctx.fillStyle = "#ccc";
    ctx.font = "bold 28px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(roleLabels[role], 80, currentY - 20);

    const charList = characters[role];
    charList.forEach((file, i) => {
      const img = new Image();
      img.src = `${characterPaths[role]}/${file}`;

      const x = 80 + (i % iconsPerRow) * (size + padding);
      const y = currentY + Math.floor(i / iconsPerRow) * (size + 8);

      // ---- ステータス設定（仮） ----
      // ここでは例として i % 3 で切り替え（0:得意, 1:使える, 2:苦手）
      // const status = i % 3;
      // モックデータ
      const status = characterStatus[file.replace(".png", "")] ?? 1;

      img.onload = (() => {
        const drawX = x;
        const drawY = y;
        return () => {
          if (status === 2) {
            // 苦手（モノクロ＋暗め）
            ctx.filter = "grayscale(100%) brightness(50%)";
            ctx.drawImage(img, drawX, drawY, size, size);
            ctx.filter = "none";
          } else {
            // 通常 or 得意
            ctx.drawImage(img, drawX, drawY, size, size);
          }

          if (status === 0) {
            // 得意（赤い囲い＋ハート）
            ctx.strokeStyle = "rgba(255,102,136,0.8)"; // ピンクがかった赤
            ctx.lineWidth = 3;
            ctx.strokeRect(drawX - 1, drawY - 1, size + 2, size + 2); // 少し外側に広げて囲う

            ctx.fillStyle = "#ff6688";
            ctx.font = "bold 26px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("♥", drawX + size / 2 + 14, drawY + size / 2 - 14);
            ctx.textAlign = "left";
            ctx.textBaseline = "alphabetic";
          } else if (status === 1) {
            // 使える（白い薄い枠）
            ctx.strokeStyle = "rgba(255,255,255,0.25)";
            ctx.lineWidth = 2;
            ctx.strokeRect(drawX, drawY, size, size);
          }
        };
      })();
    });

    // === 次のロールの開始位置を動的にずらす ===
    const rowCount = Math.ceil(charList.length / iconsPerRow);
    currentY += rowCount * (size + 10) + 50;
  });
}
