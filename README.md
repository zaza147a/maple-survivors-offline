# Maple Survivors Offline（暫名）
V0.0.3 — 2D 俯視角單機動作刷寶 Roguelite RPG。以永久裝備、天賦與隨機地城為核心；全新程式，暫用幾何圖形。

## 啟動
Node.js 22：
```sh
npm install
npm run dev
```
依 Vite 終端顯示的本機網址開啟。npm test 執行核心測試；npm run build 建置。初次安裝需網路，正式運行不應依賴外部遊戲服務。完全斷網遊玩仍待驗證。

## 原型操作
據點選職業、點天賦、裝備護符、進入地城；選擇路線，方向鍵或點擊移動，自動攻擊。清房選祝福；通關首領帶回戰利品。死亡不帶回戰利品。存檔為瀏覽器 localStorage。

## 文件
- docs/GAME_DESIGN.md：正式設計與範圍
- docs/HANDOFF.md：進度、驗證與下一步
- docs/CHANGELOG.md：版本紀錄
- docs/MODULE_API.md：模組 API 與素材工具

十二職業資料集中於 modules/maple/index.ts。四職戰鬥原型維持原功能，尚未加入正式素材。核心測試 14/14；完整 Phaser/Vite 建置待 CI 驗證。

公開專案只提交自製程式與具備使用權的素材，不包含第三方遊戲原始碼、私人存檔或 HAR。
