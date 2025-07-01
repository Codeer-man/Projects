import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Fragment } from "react";

export default function RaftarNav() {
  useGSAP(() => {
    gsap.from("#logo,#nav", {
      y: -200,
      duration: 1,
      delay: 0.4,
      ease: "back",
      stagger: 0.3,
    });
  });

  return (
    <Fragment>
      <div className="w-full h-3xl py-6 px-5 flex items-center justify-between ">
        <img
          src="/raftar.png"
          alt="raftar"
          height={150}
          width={200}
          id="logo"
        />
        <div
          className="flex items-center justify-between gap-4  text-gray-600 font-semibold text-lg"
          id="nav"
        >
          <h3 className="nav-btn">
            <a href="#">Work</a>{" "}
          </h3>
          <h3 className="nav-btn">
            <a href="#">content</a>
          </h3>
          <h3 className="nav-btn">
            <a href="#">speed</a>{" "}
          </h3>
        </div>
      </div>
      <style>{`
        .nav-btn {
          border: 2px solid #0000003c; 
          padding: 0.5rem 0.75rem;  
          border-radius: 50px;
          position: relative;
          overflow:hidden;
        }

        .nav-btn::after {
          content: "";
          position: absolute;
          height: 100%;
          width: 100%;
          background-color: black;
          left: 0;
          bottom: -100%;
          border-radius: 50%;
          transition: all ease 0.4s;
        }

        .nav-btn:hover::after {
        
            bottom:0;
            border-radius:0;
        }

        .nav-btn:hover::after {
          opacity: 1;
        }

        .nav-btn:hover {
          color: white; 

          cursor: pointer;
        }

        .nav-btn a {
            text-decoration: none;
            position:relative ;
            z-index: 9;
        }

         .nav-btn a:hover{
            color:white;
         }

      `}</style>
    </Fragment>
  );
}
