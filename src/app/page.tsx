// import About from "./components/About";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import Game from "./components/Game";
import Wish from "./components/Wish";
import About from "./components/About";

export default function Home() {
  return (
    <div>
      <About />
      <Gallery />
      <Wish />
      <Game />
      <Footer />
    </div>
  );
}