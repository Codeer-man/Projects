import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Body() {
  useGSAP(() => {
    gsap.to("#cock", {
      transform: "translateX(-47%)",
      scrollTrigger: {
        trigger: "#cock",
        scroller: "body",
        start: "top 0%  ",
        end: "top -120%",
        markers: true,
        scrub: 2,
        pin: true,
      },
    });
  });

  return (
    <div className="h-full mt-10 w-full flex items-center overflow-hidden ">
      <div>
        <h1 className="text-[35vw] font-semibold bg-green-500 px-10 " id="cock">
          COCKTAIL
        </h1>
      </div>
    </div>
  );
}
