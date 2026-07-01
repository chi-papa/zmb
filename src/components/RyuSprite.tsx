import React from 'react';

interface RyuSpriteProps {
  action: 'idle' | 'punch' | 'kick' | 'hurt' | 'dead' | 'victory';
  comboCount?: number;
  character?: 'RYU' | 'KEN' | 'CHUN_LI' | 'AKUMA';
}

export default function RyuSprite({ action, comboCount = 0, character = 'RYU' }: RyuSpriteProps) {
  // アクションに応じたCSSエフェクト
  const getActionStyles = () => {
    switch (action) {
      case 'idle':
        return 'animate-rhythm-bob';
      case 'punch':
        return 'translate-x-[110px] scale-x-110 md:translate-x-[160px] transition-all duration-150 ease-out';
      case 'kick':
        return 'translate-x-[140px] -translate-y-[40px] rotate-[-15deg] md:translate-x-[190px] md:-translate-y-[60px] transition-all duration-150 ease-out';
      case 'hurt':
        return 'animate-screen-shake -translate-x-4 skew-y-3 brightness-125 saturate-200 duration-100';
      case 'dead':
        return 'rotate-[90deg] translate-y-[80px] -translate-x-[20px] opacity-70 transition-all duration-500';
      case 'victory':
        return 'animate-bounce duration-500 scale-105';
      default:
        return 'animate-rhythm-bob';
    }
  };

  // キャラクターの種類による配色を設定
  const getCharacterColors = () => {
    switch (character) {
      case 'KEN':
        return {
          gi: '#dc2626',       // 赤の道着
          giStroke: '#991b1b',
          hood: '#111827',     // 黒のインナー/フード
          headband: '#facc15', // 金髪（鉢巻の代わりに髪色っぽく）
          headbandHighlight: '#fef08a',
          glove: '#ca8a04',    // 黄色いグローブ
          gloveStroke: '#854d0e',
          pants: '#b91c1c',
          pantsStroke: '#7f1d1d',
          skin: '#fca5a5'
        };
      case 'CHUN_LI':
        return {
          gi: '#2563eb',       // 青のチャイナ服
          giStroke: '#1d4ed8',
          hood: '#ffffff',     // 白のお団子カバー
          headband: '#ffffff', // 白いリボン
          headbandHighlight: '#f1f5f9',
          glove: '#262626',    // 黒のトゲトゲバンド
          gloveStroke: '#0a0a0a',
          pants: '#1e3a8a',
          pantsStroke: '#172554',
          skin: '#fed7aa'
        };
      case 'AKUMA':
        return {
          gi: '#1e1b4b',       // 濃い紫/黒の道着
          giStroke: '#0f172a',
          hood: '#ef4444',     // 赤い豪鬼の炎・目
          headband: '#dc2626', // 赤い髪の毛
          headbandHighlight: '#fca5a5',
          glove: '#7c2d12',    // 茶色い縄の拳巻
          gloveStroke: '#431407',
          pants: '#1e1b4b',
          pantsStroke: '#0f172a',
          skin: '#b45309'      // 日焼け・浅黒い肌
        };
      default: // RYU
        return {
          gi: '#f3f4f6',       // 白の道着
          giStroke: '#9ca3af',
          hood: '#374151',     // 濃いグレーのフード/インナー
          headband: '#ef4444', // 赤い鉢巻
          headbandHighlight: '#fca5a5',
          glove: '#ef4444',    // 赤いグローブ
          gloveStroke: '#991b1b',
          pants: '#d1d5db',
          pantsStroke: '#4b5563',
          skin: '#fca5a5'
        };
    }
  };

  const colors = getCharacterColors();

  return (
    <div className={`relative w-36 h-48 md:w-44 md:h-56 flex items-end justify-center select-none ${getActionStyles()}`}>
      
      {/* 攻撃時のスピードライン（エフェクト） */}
      {(action === 'punch' || action === 'kick') && (
        <div className="absolute -left-12 top-10 flex flex-col gap-2 pointer-events-none opacity-80 animate-pulse">
          <div className="h-1 bg-yellow-400 rounded w-16 animate-pulse" />
          <div className="h-1 bg-orange-500 rounded w-24 ml-2" />
          <div className="h-1 bg-red-500 rounded w-12 ml-4" />
        </div>
      )}

      {/* コンボオーラ効果 */}
      {comboCount >= 5 && action !== 'dead' && (
        <div className="absolute inset-0 bg-red-600/10 rounded-full blur-2xl animate-ping opacity-60 pointer-events-none" />
      )}

      {/* 16ビットドット絵風SVG */}
      <svg
        viewBox="0 0 100 120"
        className="w-full h-full pixel-art filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)]"
      >
        {/* レトロなビジュアル陰影用のシャドウ */}
        <ellipse cx="50" cy="112" rx="25" ry="6" fill="rgba(0,0,0,0.4)" />

        <g id="ryu-character">
          {/* 流れるハチマキ（たなびくリボン） */}
          {action !== 'dead' && (
            <path
              d="M 28 32 C 15 32, 10 42, 5 36 C 8 46, 18 42, 28 38"
              fill={colors.headband}
              stroke={colors.gloveStroke}
              strokeWidth="1.5"
              className={action === 'idle' ? 'origin-right animate-pulse' : ''}
            />
          )}

          {/* 後頭部のハチマキ結び目 */}
          {action !== 'dead' && (
            <path d="M 27 34 L 20 40 L 25 45 Z" fill={colors.gloveStroke} />
          )}

          {/* 体・腕（奥） */}
          {action === 'idle' && (
            <rect x="25" y="55" width="12" height="20" rx="3" fill={colors.hood} stroke="#1f2937" strokeWidth="2" />
          )}

          {/* 両脚（がに股スタンス） */}
          <g id="legs" fill={colors.pants} stroke={colors.pantsStroke} strokeWidth="2">
            {action === 'kick' ? (
              <>
                {/* キック脚（右脚が真横に突き出ている） */}
                <rect x="50" y="55" width="38" height="12" rx="3" fill={colors.pants} stroke={colors.pantsStroke} strokeWidth="2" />
                {/* キック足先・サポーター */}
                <rect x="88" y="53" width="8" height="15" rx="2" fill={colors.glove} stroke={colors.gloveStroke} strokeWidth="2" />
                {/* 曲げているほうの左脚 */}
                <rect x="30" y="58" width="14" height="24" rx="2" transform="rotate(35 30 58)" />
              </>
            ) : action === 'dead' ? (
              <>
                <rect x="35" y="75" width="22" height="10" rx="2" fill={colors.pantsStroke} />
                <rect x="55" y="75" width="22" height="10" rx="2" fill={colors.pantsStroke} />
              </>
            ) : (
              <>
                {/* 左脚（奥） */}
                <path d="M 32 75 L 20 105 L 14 105 L 18 112 L 28 112 L 36 82 Z" />
                {/* 右脚（手前） */}
                <path d="M 48 75 L 60 105 L 53 105 L 56 112 L 68 112 L 54 82 Z" />
                {/* 足のサポーター/バンテージ */}
                <rect x="18" y="106" width="10" height="5" fill={colors.glove} />
                <rect x="56" y="106" width="11" height="5" fill={colors.glove} />
              </>
            )}
          </g>

          {/* 胴体（道着） */}
          <g id="torso">
            {action === 'dead' ? (
              <rect x="33" y="48" width="28" height="30" rx="4" fill={colors.gi} stroke={colors.giStroke} strokeWidth="2" />
            ) : (
              <path
                d="M 28 50 L 58 50 L 52 82 L 26 82 Z"
                fill={colors.gi}
                stroke={colors.giStroke}
                strokeWidth="2"
              />
            )}
            
            {/* パーカー/道着の赤い返り血（ドット、AKUMAやCHUN_LIはより控えめに） */}
            <circle cx="36" cy="58" r="3" fill="#991b1b" />
            <circle cx="44" cy="65" r="2.5" fill="#ef4444" />
            <circle cx="48" cy="56" r="1.5" fill="#7f1d1d" />
            <path d="M 32 70 L 35 74 L 38 71 Z" fill="#991b1b" />

            {/* はだけた胸元 */}
            <path d="M 40 50 L 46 50 L 43 60 Z" fill={colors.skin} />
            <path d="M 40 50 L 43 62 L 46 50" stroke={colors.giStroke} strokeWidth="1" />
          </g>

          {/* 頭部（髪、鉢巻、目元） */}
          <g id="head" className={action === 'hurt' ? 'translate-y-[-4px] rotate-[-5deg]' : ''}>
            {/* 頭部を包むフード/お団子カバー */}
            <circle cx="38" cy="30" r="14" fill={colors.hood} stroke="#1f2937" strokeWidth="2" />
            
            {/* チュンリー用の追加のお団子カバー */}
            {character === 'CHUN_LI' && (
              <>
                <circle cx="26" cy="22" r="6" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2" />
                <circle cx="50" cy="22" r="6" fill="#ffffff" stroke="#1d4ed8" strokeWidth="2" />
              </>
            )}

            {/* 顔の肌 */}
            <rect x="31" y="22" width="15" height="15" rx="2" fill={colors.skin} />
            {/* 傷口 */}
            <line x1="33" y1="25" x2="38" y2="28" stroke="#991b1b" strokeWidth="1.5" />
            
            {/* 目元 */}
            {action === 'dead' ? (
              <>
                <line x1="38" y1="24" x2="42" y2="28" stroke="#000" strokeWidth="1.5" />
                <line x1="42" y1="24" x2="38" y2="28" stroke="#000" strokeWidth="1.5" />
              </>
            ) : action === 'hurt' ? (
              <rect x="39" y="24" width="5" height="2" fill="#7f1d1d" />
            ) : action === 'victory' ? (
              <>
                <path d="M 37 25 Q 40 23 43 25" stroke="#000" strokeWidth="1.8" fill="none" />
                <path d="M 41 24 Q 44 22 47 24" stroke="#000" strokeWidth="1.8" fill="none" />
              </>
            ) : (
              <>
                <rect x="39" y="23" width="7" height="1.5" fill="#000" />
                <rect x="42" y="24" width="3" height="1.5" fill={character === 'AKUMA' ? '#ff0000' : '#ef4444'} />
              </>
            )}

            {/* 鉢巻/リボン */}
            <rect x="29" y="20" width="19" height="4.5" fill={colors.headband} />
            <rect x="29" y="20" width="19" height="1.5" fill={colors.headbandHighlight} />

            {/* 口元 / ひげ */}
            {character !== 'CHUN_LI' && (
              <path d="M 35 33 L 45 33 L 42 37 Z" fill="#4b5563" opacity="0.5" />
            )}
            {action === 'hurt' ? (
              <rect x="38" y="32" width="5" height="3" fill="#000" rx="1" />
            ) : action === 'victory' ? (
              <path d="M 37 32 Q 41 36 45 32" stroke="#000" strokeWidth="1.8" fill="none" />
            ) : (
              <line x1="38" y1="33" x2="43" y2="33" stroke="#000" strokeWidth="1" />
            )}
          </g>

          {/* 腕・拳（手前） */}
          <g id="arms">
            {action === 'punch' ? (
              <>
                <rect x="42" y="50" width="40" height="12" rx="3" fill={colors.gi} stroke={colors.giStroke} strokeWidth="2.5" />
                <circle cx="65" cy="56" r="2.5" fill="#991b1b" />
                <rect x="80" y="47" width="10" height="16" rx="3" fill={colors.glove} stroke={colors.gloveStroke} strokeWidth="2.5" />
                {character !== 'CHUN_LI' && <rect x="82" y="52" width="2" height="6" fill="#fff" />}
              </>
            ) : action === 'kick' ? (
              <>
                <path d="M 34 52 Q 46 45 42 35" fill="none" stroke={colors.gi} strokeWidth="10" strokeLinecap="round" />
                <circle cx="42" cy="35" r="5" fill={colors.glove} />
              </>
            ) : action === 'hurt' ? (
              <>
                <path d="M 32 55 Q 18 42 22 30" fill="none" stroke={colors.gi} strokeWidth="9" strokeLinecap="round" />
                <circle cx="22" cy="30" r="5" fill={colors.glove} />
              </>
            ) : action === 'dead' ? (
              <path d="M 33 55 L 20 60" stroke={colors.giStroke} strokeWidth="8" strokeLinecap="round" />
            ) : action === 'victory' ? (
              <>
                <path
                  d="M 35 55 Q 46 25 45 10"
                  fill="none"
                  stroke={colors.gi}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <circle cx="45" cy="10" r="7.5" fill={colors.glove} stroke={colors.gloveStroke} strokeWidth="2.5" />
                {character !== 'CHUN_LI' && <rect x="42" y="7" width="5" height="4" fill="#fff" />}
              </>
            ) : (
              <>
                <path
                  d="M 35 53 C 48 53, 52 46, 48 38"
                  fill="none"
                  stroke={colors.gi}
                  strokeWidth="10"
                  strokeLinecap="round"
                />
                <circle cx="48" cy="38" r="6" fill={colors.glove} stroke={colors.gloveStroke} strokeWidth="1.5" />
                {character !== 'CHUN_LI' && <rect x="44" y="34" width="7" height="3" fill="#fff" />}
              </>
            )}
          </g>
        </g>
      </svg>
    </div>
  );
}
