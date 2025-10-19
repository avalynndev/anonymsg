// AI GENERATED
export function Bottle({
  topPercent,
  duration,
  delay,
  scale = 1,
  onBottleClick,
}: {
  topPercent: number;
  duration: number;
  delay: number;
  scale?: number;
  onBottleClick: () => void;
}) {
  const style: React.CSSProperties = {
    position: "absolute",
    top: `${topPercent}%`,
    transform: `scale(${scale})`,
    animation: `drift-left ${duration}s linear ${delay}s infinite`,
    zIndex: 100,
    willChange: "transform",
    cursor: "pointer",
    transition: "filter 0.2s ease",
  };
  return (
    <button
      style={style}
      className="select-none focus:outline-none rounded-lg"
      onClick={onBottleClick}
      aria-label="Click to open message in a bottle"
    >
      <svg
        width={120}
        height={72}
        viewBox="0 0 120 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: "drop-shadow(0 6px 20px rgba(59, 130, 246, 0.4))" }}
      >
        <path d="M8 28c-3 0-6 3-6 8s3 8 6 8h32V28H8z" fill="#CD853F" />
        <path d="M8 28c-2.5 0-5 3-5 8s2.5 8 5 8h15V28H8z" fill="#CD853F" />
        <defs>
          <linearGradient
            id={`neckGrad${delay.toFixed(3)}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#BAE6FD" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.92" />
          </linearGradient>
          <linearGradient
            id={`bottleGrad${delay.toFixed(3)}`}
            x1="0"
            y1="0"
            x2="1"
            y2="1"
          >
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.92" />
            <stop offset="25%" stopColor="#BAE6FD" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#7DD3FC" stopOpacity="0.80" />
            <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0.70" />
          </linearGradient>
          <radialGradient
            id={`glassShine${delay.toFixed(3)}`}
            cx="0.3"
            cy="0.3"
          >
            <stop offset="0%" stopColor="white" stopOpacity="0.9" />
            <stop offset="50%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <filter id={`innerShadow${delay.toFixed(3)}`}>
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="2" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.6" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id={`glassBlur${delay.toFixed(3)}`}>
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
          </filter>
        </defs>
        <path
          d="M36 28v16h8V28z"
          fill={`url(#neckGrad${delay.toFixed(3)})`}
          stroke="#93C5FD"
          strokeWidth="1"
        />
        <rect
          x="44"
          y="18"
          width="70"
          height="36"
          rx="12"
          fill={`url(#bottleGrad${delay.toFixed(3)})`}
          stroke="#60A5FA"
          strokeWidth="2"
        />
        <ellipse cx="54" cy="24" rx="8" ry="4" fill="white" opacity="0.7" />
        <ellipse cx="60" cy="28" rx="14" ry="7" fill="white" opacity="0.5" />
        <g>
          <rect
            x="78"
            y="24"
            width="24"
            height="24"
            rx="2"
            fill="#FEF3C7"
            opacity="0.95"
          />
          <rect
            x="79"
            y="25"
            width="22"
            height="22"
            rx="2"
            fill="#FEF9E7"
            opacity="0.9"
          />
          <line
            x1="83"
            y1="30"
            x2="97"
            y2="30"
            stroke="#92400E"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <line
            x1="83"
            y1="35"
            x2="97"
            y2="35"
            stroke="#92400E"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <line
            x1="83"
            y1="40"
            x2="94"
            y2="40"
            stroke="#92400E"
            strokeWidth="1.2"
            opacity="0.6"
          />
        </g>
      </svg>
    </button>
  );
}
