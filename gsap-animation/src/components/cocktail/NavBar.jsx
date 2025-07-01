import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { navLinks } from "../../constant";

export default function NavBar() {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      { backgroundColor: "#00000050", duration: 1, ease: "power1.inOut" }
    );
  });
  return (
    <nav className="w-full  ">
      <div className="flex items-center justify-between max-w-7xl">
        <a href="#home" className="flex items-center justify-center gap-2">
          <img src="/images/logo.png" alt="" /> <p>Velvet Pour</p>
        </a>
        <ul>
          {navLinks &&
            navLinks.map((n) => (
              <li key={n.id}>
                <a href="">{n.title}</a>
              </li>
            ))}
        </ul>
      </div>
    </nav>
  );
}
