import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  KrishiMitra,
  jobit,
  tripguide,
  threejs,
  Edubyte,
  Trinoyon,
  MagicFill,
  GithubReadmeGenerator,
  YouTubeSummarizer,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "Content Creator",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "figma",
    icon: figma,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Tesla",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Shopify",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "🕉️🔱 Project-Trinoyon",
    description:
      "A small initiative to make this Durga Puja truly a celebration for all! This project dedicated to bringing smiles to the lives of homeless community during Durga Puja.",
    tags: [
      {
        name: "Team Work",
        color: "blue-text-gradient",
      }
    ],
    image: Trinoyon,
    source_code_link: "https://github.com/BikramMondal5/Project-Trinoyon",
  },
  {
    name: "🌾🚜 KrishiMitra",
    description:
      "An AI-powered agricultural platform that empowers farmers with real-time insights, crop recommendations, weather updates and sustainable farming support.",
    tags: [
      {
        name: "Team Work",
        color: "blue-text-gradient",
      }
    ],
    image: KrishiMitra,
    source_code_link: "https://github.com/BikramMondal5/KrishiMitra",
  },
  {
    name: "🤖🧠 Edubyte V1.0",
    description:
      "An AI-powered flask application where user can interact with different generative AI including advanced LLMs GPT-40, DeepSeek, Gemini 2.0 Flash, Mistral AI and many more",
    tags: [
      {
        name: "Team Work",
        color: "blue-text-gradient",
      }
    ],
    image: Edubyte,
    source_code_link: "https://github.com/BikramMondal5/Edubyte",
  },
  {
    name: "🪄📄 MagicFill",
    description:
      "MagicFill is an AI-powered platform that auto-fills application forms and helps people especially in rural and underserved communities in India — by removing barriers of complex form-based processes.",
    tags: [
      {
        name: "Team Work",
        color: "blue-text-gradient",
      }
    ],
    image: MagicFill,
    source_code_link: "https://github.com/BikramMondal5/MagicFill",
  },
  {
    name: "📝✨ Github Readme Generator",
    description:
      "📝✨ A simple, light-weight, client side tool that allows users to generate the professional readme file for Github using Gemini API key",
    tags: [
      {
        name: "Solo Project",
        color: "blue-text-gradient",
      }
    ],
    image: GithubReadmeGenerator,
    source_code_link: "https://github.com/BikramMondal5/Github-readme-generator",
  },
  {
    name: "🎬📄 YouTube Video Summarizer",
    description:
      "A lightweight web app that uses OpenAI's GPT‑4o to generate concise, well‑structured summaries of YouTube videos from a URL.",
    tags: [
      {
        name: "Solo Project",
        color: "blue-text-gradient",
      }
    ],
    image: YouTubeSummarizer,
    source_code_link: "https://github.com/BikramMondal5/YouTube-Video-Summarizer",
  },
];

export { services, technologies, experiences, testimonials, projects };
