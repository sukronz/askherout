import React, { useEffect, useState } from 'react';

const ICONS = ['❤️', '🌹', '💖', '💐', '💘', '🌸', '💑', '🥰'];

interface FloatingItem {
  id: number;
  icon: string;
  left: string;
  animationDuration: string;
  animationDelay: string;
  fontSize: string;
}

export const FloatingHearts: React.FC = () => {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const newItems: FloatingItem[] = [];
    for (let i = 0; i < 50; i++) {
      newItems.push({
        id: i,
        icon: ICONS[Math.floor(Math.random() * ICONS.length)],
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 4}s`, // 4-7 seconds
        animationDelay: `${Math.random() * 5}s`,
        fontSize: `${Math.random() * 2 + 1.5}rem`,
      });
    }
    setItems(newItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {items.map((item) => (
        <div
          key={item.id}
          className="floating-heart"
          style={{
            left: item.left,
            animationDuration: item.animationDuration,
            animationDelay: item.animationDelay,
            fontSize: item.fontSize,
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  );
};