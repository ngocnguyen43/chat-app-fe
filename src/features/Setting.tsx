import React from "react";
import useMousePosition from "../hooks/useMousePosition"

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

    const rad = Math.abs(Math.atan2(position.y ? position.y - Y : 0, position.x ? position.x - X : 0));
    const deg = rad * (180 / Math.PI)
    return <section className="flex items-center justify-center">
        {/* <div>{X}</div>
        <div>{Y}</div> */}
        <div>{deg}</div>
        <div className="w-[1000px] h-[700px] bg-red-50 flex items-center justify-center">
            {/* {JSON.stringify(position)} */}
            <div className="bg-black h-full w-1"></div>
        </div>
        {/* <MousePointer /> */}
    </section >
}