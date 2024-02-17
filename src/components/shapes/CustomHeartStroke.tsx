export default function CustomHeartStroke() {
  return (
    <div
      // className="-bottom-0 -right-0"
      style={{
        position: 'absolute',
        width: '24px',
        height: '24px',
        marginLeft: '-12px',
        marginTop: '-12px',
        opacity: 1,
        transform: 'translate(0px, 0px) rotate(0deg) scale(0.7,0.7)',
        transformOrigin: '50% 50%',
        zIndex: -2,
      }}
    >
      <svg
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={{ display: 'block', width: ' 100%', height: '100%', left: '0px', top: '0px' }}
      >
        <g
          id="js-mojs-shape-el"
          transform="translate(1, 1) scale(0.22, 0.22)"
          strokeWidth="12"
          fillOpacity="1"
          strokeLinecap={undefined}
          strokeDashoffset=""
          fill="none"
          strokeDasharray=""
          strokeOpacity="1"
          stroke="#a1a1a1"
        >
          <path d="M73.6170213,0 C64.4680851,0 56.5957447,5.53191489 51.7021277,13.8297872 C50.8510638,15.3191489 48.9361702,15.3191489 48.0851064,13.8297872 C43.4042553,5.53191489 35.3191489,0 26.1702128,0 C11.9148936,0 0,14.0425532 0,31.2765957 C0,48.0851064 14.893617,77.8723404 47.6595745,99.3617021 C49.1489362,100.212766 50.8510638,100.212766 52.1276596,99.3617021 C83.8297872,78.5106383 99.787234,48.2978723 99.787234,31.2765957 C100,14.0425532 88.0851064,0 73.6170213,0 L73.6170213,0 Z"></path>
        </g>
      </svg>
    </div>
  );
}
