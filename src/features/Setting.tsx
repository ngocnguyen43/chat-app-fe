import React from 'react';

import useMousePosition from '../hooks/useMousePosition';

const MousePointer = () => {
    const arrowRef = React.useRef<SVGSVGElement>(null);
    const position = useMousePosition();


    return (
        <div
            style={{
                position: "absolute",
                top: position.y ?? 0,
                left: position.x ?? 0,
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: "red",
            }}
        >
            <svg
                viewBox="0 0 10 10"
                ref={arrowRef}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="black"
                stroke-width="2"
            >
                <polyline points="0,5 5,0 10,5" />
            </svg>
        </div>
    );
};


export default function Setting() {
    const position = useMousePosition();


    const main = document.querySelector<HTMLElement>('#root');
    const Y = main?.offsetHeight ? main.offsetHeight / 2 : 0;
    const X = main?.offsetWidth ? main.offsetWidth / 2 : 0;


    const rad = Math.atan2(position.y ? 2 * position.y - Y : 0, Math.abs(position.x ? 2 * position.x - X : 0));
    const stickRef = React.useRef<HTMLDivElement>(null);

    const imgRef = React.useRef<HTMLImageElement>(null);
    const isDragging = React.useRef<boolean>(false);

    const sensitivity = 0.5; // Adjust this value to control the rotation speed

    React.useEffect(() => {
        const img = imgRef.current;
        let prevMouseX = 0;

        const handleMouseDown = () => {
            isDragging.current = true;
        };

        const handleMouseUp = () => {
            isDragging.current = false;
        };

        const handleMouseMove = (evt: MouseEvent) => {
            if (isDragging.current && img) {
                const offset = img.getBoundingClientRect();
                const center_x = offset.left + img.offsetWidth / 2;
                const center_y = offset.top + img.offsetHeight / 2;
                const mouse_x = evt.pageX;
                const mouse_y = evt.pageY;
                const radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
                const degree = radians * (180 / Math.PI) * -1 + 90;

                img.style.transform = `rotate(${degree}deg)`;
            }
        };

        if (img) {
            img.addEventListener('mousedown', handleMouseDown);
            img.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('mousemove', handleMouseMove);

            return () => {
                img.removeEventListener('mousedown', handleMouseDown);
                img.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('mousemove', handleMouseMove);
            };
        }
    }, []);

    return <section className="flex items-center justify-center">
        {/* <div>{X}</div>
        <div>{Y}</div> */}
        <div className="w-[1000px] h-[700px] bg-red-50 flex items-center justify-center stick">
            {/* {JSON.stringify(position)} */}
            <div className="bg-black h-full w-1" ref={imgRef}></div>
        </div>
        {/* <MousePointer /> */}
    </section >
}