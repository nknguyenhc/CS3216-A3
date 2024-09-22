import React, { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGooglePlusG } from "react-icons/fa";
import emailjs, { EmailJSResponseStatus } from "emailjs-com";

const Footer: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
    };

    emailjs
      .send("service_kcou7ol", "template_9h98wr9", templateParams, "TtNGDN7OZ11CCvt63")
      .then((response: EmailJSResponseStatus) => {
        console.log("Success!", response.status, response.text);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((err: any) => {
        console.error("Unsuccessful...", err);
      });
  };

  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex flex-col items-center">
        {/* Contact Us Section */}
        <div className="w-full max-w-md mb-4 text-center">
        <h2 className="text-white text-3xl font-black uppercase text-slate-500 text-center mb-5">Contact Us</h2>
          <p className="mb-4">We’d love to hear from you! Reach out to us:</p>
          <form onSubmit={sendEmail}>
            <input
              type="text"
              placeholder="Your Name"
              className="text-black w-full p-2 mb-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="text-black w-full p-2 mb-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <textarea
              placeholder="Your Message"
              className="text-black w-full p-2 mb-2 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-dark-blue-custom hover:bg-blue-600 text-white py-2 rounded transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        <ul className="flex space-x-8 mb-4">
          <li>
            <a
              className="flex flex-col items-center hover:text-blue-500 transition duration-300"
              aria-label="Facebook"
            >
              <FaFacebook size={30} />
              <span className="text-xs">Facebook</span>
            </a>
          </li>
          <li>
            <a
              className="flex flex-col items-center hover:text-blue-400 transition duration-300"
              aria-label="Twitter"
            >
              <FaTwitter size={30} />
              <span className="text-xs">Twitter</span>
            </a>
          </li>
          <li>
            <a
              className="flex flex-col items-center hover:text-pink-500 transition duration-300"
              aria-label="Instagram"
            >
              <FaInstagram size={30} />
              <span className="text-xs">Instagram</span>
            </a>
          </li>
          <li>
            <a
              className="flex flex-col items-center hover:text-red-600 transition duration-300"
              aria-label="Google Plus"
            >
              <FaGooglePlusG size={30} />
              <span className="text-xs">Google+</span>
            </a>
          </li>
        </ul>

        <div className="text-center text-xs mt-4">
          &copy; {new Date().getFullYear()} Stellar. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
