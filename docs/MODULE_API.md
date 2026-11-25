# 模組 API v1
`modules/maple/index.ts` 為第一個內建內容模組；`src/module-loader/types.ts` 定義契約；registry 檢查 ID、API、數值及引用。active.ts 設定現行模組並轉換四個原型職業，既有 v2 存檔保留。這是編譯期內建模組，不是外部動態插件系統。
職業資料含主屬性及武器類型；其餘八職尚未實作戰鬥。Sprite 定義含 texture、frames、fps、anchor（0～1）；monster 引用 sprite ID，skill 引用 job ID。尚未將 sprite/monster/skill 接入 Phaser 場景，裝備/卷軸/地圖等契約下一階段補齊。
素材：僅匯入自製或已獲授權 PNG。Python 3 + Pillow：`python tools/sprite_atlas.py input_frames output/character --columns 8`，輸出 PNG 及 Phaser JSON atlas。檔名依字典排序，建議補零，底部中心對齊，保留透明度，pivot=(0.5,1)。不會下載或解包第三方素材。角色紙娃娃、逐幀原點、技能特效、方向動畫仍待實作。
