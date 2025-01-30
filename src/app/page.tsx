import Hero from "./components/Hero";
// import About from "./components/About";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import FlowerEffect from "./components/FlowerEffect";
import "./styles/globals.css";
import Game from "./components/Game";

export default function Home() {
  return (
    <div>
      <FlowerEffect />
      {/* <Header /> */}
      <Hero />
      <Gallery />
      <Game />
      <Footer />
    </div>
  );
}