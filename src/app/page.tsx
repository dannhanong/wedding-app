import Hero from "./components/Hero";
// import About from "./components/About";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import FlowerEffect from "./components/FlowerEffect";
import "./styles/globals.css";

export default function Home() {
  return (
    <div>
      <FlowerEffect />
      {/* <Header /> */}
      <Hero />
      <Gallery />
      <Footer />
    </div>
  );
}