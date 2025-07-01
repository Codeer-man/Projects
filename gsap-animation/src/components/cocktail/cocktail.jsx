import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cocktailLists, mockTailLists } from "../../constant";

export default function Cocktail() {
  useGSAP(() => {
    const parallelTimeLine = gsap.timeline({
      scrollTrigger: {
        trigger: "#cocktails",
        start: "top 30%",
        end: "bottom 80%",
        scrub: true,
      },
    });

    parallelTimeLine.from(
      "#c-left-leaf",
      {
        x: -100,
        y: 100,
      },
      0
    ); // <-- The 0 means "start at 0 seconds in the timeline"

    parallelTimeLine.from(
      "#c-right-leaf",
      {
        x: 100,
        y: 100,
      },
      0
    );
  });

  return (
    <section className="noisy" id="cocktails">
      <img
        src="/images/cocktail-left-leaf.png"
        alt="left-leaf"
        id="c-left-leaf"
      />
      <img
        src="/images/cocktail-right-leaf.png"
        alt="r-leaf"
        id="c-right-leaf"
      />
      <div className="list px-5">
        <div className="popular">
          <h2>Most Popular Cocktails</h2>
          <ul>
            {cocktailLists.map((drink) => (
              <li key={drink.name}>
                <div className="md:me-28">
                  <h3>{drink.name}</h3>
                  <p>
                    {drink.country} | {drink.detail}
                  </p>
                </div>
                {drink.price}
              </li>
            ))}
          </ul>
        </div>
        <div className="loved">
          <h2>Most Loved Mocktails</h2>
          <ul>
            {mockTailLists.map((drink) => (
              <li key={drink.name}>
                <div className="md:me-28">
                  <h3>{drink.name}</h3>
                  <p>
                    {drink.country} | {drink.detail}
                  </p>
                </div>
                {drink.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
