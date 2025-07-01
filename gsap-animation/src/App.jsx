import gsap from "gsap";
import { ScrollTrigger, SplitText } from "gsap/all";
import CocktailPage from "./page/cocktail";
import RaftarPage from "./page/showdown";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function App() {
  return (
    <main className="">
      {/* <CocktailPage /> */}
      <RaftarPage />
    </main>
  );
}
