import { useState } from 'react';
import Globe from 'react-globe.gl';
import Button from './Button.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Import the correct grid images from assets
import grid1 from '../assets/grid1.png';
import grid2 from '../assets/grid2.png';
import grid3 from '../assets/grid3.png';
import grid4 from '../assets/grid4.png';

const Cards = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('codesnippets45@gmail.com');
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="c-space mt-34" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-7 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-2 xl:pb-1">
          <div className="grid-container flex flex-col h-full">
            <div className="flex-grow">
              <img src={grid1} alt="grid-1" className="w-full sm:h-[276px] h-fit object-contain" />
            </div>
            <div className="mt-4">
              <p className="grid-headtext">Hi, I&apos;m Bikram Mondal 👋</p>
              <p className="grid-subtext">
               I love to explore new technologies to refine my skills and build user-friendly solutions that solve real-world problems.
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-2 xl:pb-1">
          <div className="grid-container flex flex-col h-full">
            <div className="flex-grow">
              <img src={grid2} alt="grid-2" className="w-full sm:h-[276px] h-fit object-contain" />
            </div>
            <div className="mt-4">
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                I specialize in a variety of languages, frameworks, and tools that allow me to build robust and scalable
                applications
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3 xl:pb-1">
          <div className="grid-container flex flex-col h-full">
            <div className="flex-grow flex justify-center items-center rounded-3xl">
              <Globe
                height={400}
                width={400}
                backgroundColor="rgba(0, 0, 0, 0)"
                backgroundImageOpacity={0.5}
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[{ lat: 22.5726, lng: 88.3639, text: 'Kolkata, India', color: 'white', size: 15 }]}
              />
            </div>
            <div className="mt-4">
              <p className="grid-headtext">Lets Connect!</p>
              <p className="grid-subtext">I&apos;m lived in Kolkata, India and open to remote work worldwide.</p>
              <Button name="Contact Me" isBeam containerClass="w-full mt-6" onClick={scrollToContact} />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <div className="w-full h-[300px] overflow-hidden rounded-t-3xl">
              <img
                src={grid3}
                alt="grid-3"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pt-6 pb-3">
              <p className="grid-headtext">My Passion for Coding</p>
              <p className="grid-subtext">
                I love solving problems and building things through code. Programming isn&apos;t just my
                profession—it&apos;s my passion. I enjoy exploring new technologies, and enhancing my skills.
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src={grid4}
              alt="grid-4"
              className="w-full md:h-[165px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contact me</p>
              <div className="copy-container" onClick={handleCopy}>
                <span className="text-white">{hasCopied ? '✓' : <FontAwesomeIcon icon="copy" />}</span>
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  codesnippets45@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cards;
