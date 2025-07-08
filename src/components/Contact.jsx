import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Bikram",
          from_email: form.email,
          to_email: "your-email@example.com",
          subject: form.subject,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");

          setForm({
            name: "",
            email: "",
            subject: "",
            message: "",
          });
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="flex flex-col items-center mt-0">
      <div className="w-full text-center mb-4">
        <h3 className={styles.sectionHeadText}>Contact.</h3>
        <p className={`${styles.sectionSubText} mt-2`}>
          Want to collaborate or want to say hi? 
          Reach out — I'd love to hear from you. ❤️
        </p>
      </div>

      <div className="w-full flex flex-col-reverse gap-10 overflow-hidden lg:flex-row">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-[#0D1111] p-8 rounded-2xl"
        >
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="What's your name?"
                className="bg-[#212529] py-4 px-6 text-white rounded-lg outline-none border border-transparent focus:border-[#915EFF] font-medium placeholder-gray-400 transition-colors duration-300"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="What's your email?"
                className="bg-[#212529] py-4 px-6 text-white rounded-lg outline-none border border-transparent focus:border-[#915EFF] font-medium placeholder-gray-400 transition-colors duration-300"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="What's the subject?"
                className="bg-[#212529] py-4 px-6 text-white rounded-lg outline-none border border-transparent focus:border-[#915EFF] font-medium placeholder-gray-400 transition-colors duration-300"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Message</label>
              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="What do you want to say?"
                className="bg-[#212529] py-4 px-6 text-white rounded-lg outline-none border border-transparent focus:border-[#915EFF] font-medium resize-none placeholder-gray-400 transition-colors duration-300"
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#915EFF] hover:bg-[#7549d4] py-4 px-8 rounded-[30px] outline-none w-full text-white font-bold shadow-md shadow-primary transition-all duration-300 text-[16px]"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="flex-[0.75] h-[350px] lg:h-auto"
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
