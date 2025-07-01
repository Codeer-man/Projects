import Hero from "../components/cocktail/hero";
import Body from "../components/cocktail/body";
import Cocktail from "../components/cocktail/cocktail";
import NavBar from "../components/cocktail/NavBar";

export default function CocktailPage() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Cocktail />
      <Body />
    </div>
  );
}
