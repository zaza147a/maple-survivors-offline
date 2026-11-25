# 交接 v0.0.3（2026-11-25）
方向：POE 局外裝備/天賦 + Roguelite 局內地城 + Maple 內容模組。沿用 v0.0.2 局內外核心、v2 存檔。modules/maple/index.ts 是職業資料唯一來源；src/module-loader 有型別、registry 及 active adapter；tools/sprite_atlas.py 可轉換授權 PNG。詳見 MODULE_API.md。
驗證：本次重新執行 npm test 14/14。先前核心 TypeScript strict 檢查及兩張 PNG 的 atlas smoke test 通過。完整 Phaser 建置與瀏覽器未驗證。本版未匯入第三方素材，仍為幾何圖形。
GitHub：zaza147a/maple-survivors-offline，main，使用者已同意公開。每個功能階段需測試、更新版本與 CHANGELOG/HANDOFF、提交並確認遠端成功。不要提交 HAR、存檔、憑證或未授權素材。不要修改其他專案。
下一步 V0.0.4：建立可授權角色/怪物動畫樣本，接入 Phaser preload/atlas/animation；加入方向、移動、攻擊、受傷、死亡動畫與資源驗證；其後補裝備、卷軸、地圖契約與職業技能。先確認 CI 完整建置結果；不宣稱未完成的內容已完成。
