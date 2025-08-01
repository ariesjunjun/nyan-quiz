import React from 'react'
import Image from 'next/image'

export const Topillust = () => {
  return (
    <div
      style={{
        display: "flex",               // 横並び（フレックスボックス）
        justifyContent: "center",     // 横方向中央揃え
        alignItems: "center",         // 縦方向中央揃え
        marginTop: "2rem",            // 上の余白
        marginBottom: "2rem",         // 下の余白
        paddingLeft: "1rem",          // 左の内側余白
        paddingRight: "1rem",         // 右の内側余白
      }}
    >
      <div
        style={{
          width: "80vw",              // ビューポート幅の80%、レスポンシブ対応
          maxWidth: "300px",          // 最大幅は300pxに制限
          aspectRatio: "1 / 1",       // 正方形を維持（幅と高さの比率1:1）
          borderRadius: "50%",        // 円形に丸める
          backgroundColor: "white",   // 背景は白色
          overflow: "hidden",         // コンテンツが枠を超えた部分は隠す
          display: "flex",            // 中の画像を中央配置するためフレックスボックス
          justifyContent: "center",   // 横中央揃え
          alignItems: "center",       // 縦中央揃え
        }}
      >
        <Image
          src="/hogoneko_top.jpg"     // 画像ファイルのパス
          alt="クイズのメイン画像"     // 画像の説明（アクセシビリティ用）
          width={300}                 // 画像の元サイズ 幅(px)
          height={300}                // 画像の元サイズ 高さ(px)
          style={{
            objectFit: "contain",     // 画像全体を切らずに収める
            transform: "scale(0.75)",// 画像自体を75%の大きさに縮小
          }}
        />
      </div>
    </div>
  )
}
