import { BrowserRouter } from "react-router-dom";
import { About, Cards, Contact, Hero, Navbar, Tech, Works, StarsCanvas, ChatWidget } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Tech />
        <Cards />
        <Works />
        <div className='relative z-0'>
          <Contact />
          <StarsCanvas />
        </div>
        <ChatWidget />
      </div>
    </BrowserRouter>
  );
}

export default App;
