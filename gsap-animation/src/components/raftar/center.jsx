import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import React, { useRef } from "react";

export default function Center() {
  const container = useRef();

  useGSAP(() => {
    // Set initial state
    gsap.set("#today, #start, .side #move", { opacity: 1 });
    gsap.set("#today", { x: 900 });
    gsap.set("#start", { y: 20 });
    gsap.set(".side", { y: 10 });
    gsap.set("#move", { x: 0 });

    // TODAY text animation - like a speeding car
    gsap.fromTo(
      "#today",
      {
        x: 900,
        opacity: 0,
        scale: 1.2,
      },
      {
        delay: 4.2,
        x: -5,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.4)",
      }
    );

    // Split text animations
    const start = new SplitText("#start", { type: "words" });
    const side = new SplitText(".side", { type: "lines,chars" });

    // START text - like checkered flag dropping
    gsap.from(start.words, {
      y: 40,
      opacity: 0,
      duration: 3,
      stagger: 0.1,
      delay: 1,
      ease: "elastic.out(1, 0.5)",
    });

    gsap.from(side.chars, {
      y: 15,
      opacity: 0,
      duration: 0.3,
      delay: 1.2,
      stagger: 0.02,
      ease: "circ.out",
    });

    gsap.from(".line", {
      xPercent: -100,
      opacity: 0,
      duration: 2,
      stagger: 0.5,
      ease: "bounce.in",
    });

    gsap.to("#move", {
      x: -40,
      delay: 4.2,
      duration: 0.4,
      //   ease: "bounce",
      yoyo: true,
      repeat: 1,
      //   reversed: 1,
    });
  });

  return (
    <div
      ref={container}
      className="h-[70vh] text-[#2f2f2f] mt-5 border-b border-gray-400/50 px-10 relative overflow-hidden transition-all"
    >
      <div className="absolute inset-0 pointer-events-none line " id="line">
        <div className="stripe absolute top-0 left-0 w-full h-1 bg-red-500 line"></div>
        <div className="stripe absolute top-10 left-0 w-full h-1 bg-blue-500 line"></div>
        <div className="stripe absolute top-20 left-0 w-full h-1 bg-yellow-500 line"></div>
      </div>

      <div className="flex items-center justify-between h-full">
        <h1
          className="text-6xl font-bold text-start tracking-tight leading-13 w-[20vw]"
          id="start"
        >
          START YOUR{" "}
          <span id="move" className=" inline-block">
            {" "}
            RACING JOURNEY
          </span>
        </h1>
        <div className="flex text-center leading-7 tracking-light flex-col w-[30vw] pb-5 text-2xl font-semibold justify-between pt-10 h-full">
          <p className="side">
            Step into the world of racing where speed, precision, and excitement
            come together. Whether you're a beginner or chasing the next big
            win, your journey starts here.
          </p>
          <p className="side">
            Discover new challenges, grow your skills, and feel the rush with
            every lap.
          </p>
        </div>
      </div>
      <p
        className="absolute z-10 top-70 left-80 text-9xl font-semibold text-red-500"
        id="today"
      >
        TODAY
      </p>
    </div>
  );
}
