import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="py-10 text-white bg-black">
      <div className="container grid grid-cols-1 gap-8 px-6 mx-auto md:px-12 md:grid-cols-4">
        
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold">Quick Links</h2>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Services</a></li>
          </ul>
        </div>

        {/* About Us */}
        <div>
          <h2 className="text-lg font-bold">About Us</h2>
          <p className="mt-3 text-sm text-gray-300">
            We are committed to helping you unlock your full potential with AI-powered tools.
            Our platform offers a wide range of resources to improve your interview skills and chances of success.
          </p>
        </div>

        {/* Services */}
        <div>
          <h2 className="text-lg font-bold">Services</h2>
          <ul className="mt-3 space-y-2">
            <li><a href="#" className="hover:underline">Interview Preparation</a></li>
            <li><a href="#" className="hover:underline">Career Coaching</a></li>
            <li><a href="#" className="hover:underline">Resume Building</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-bold">Contact Us</h2>
          <p className="mt-3 text-sm text-gray-300">123 AI Street, Tech City, 12345</p>

          {/* Social Icons */}
          <div className="flex mt-4 space-x-4">
            <a href="#" className="text-white hover:text-gray-400"><Facebook size={20} /></a>
            <a href="#" className="text-white hover:text-gray-400"><Twitter size={20} /></a>
            <a href="#" className="text-white hover:text-gray-400"><Instagram size={20} /></a>
            <a href="#" className="text-white hover:text-gray-400"><Linkedin size={20} /></a>
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="py-4 text-sm text-center text-gray-400 bg-black">
        <p>
          Made by <span className="font-semibold text-white">Anmol</span>
        </p>
        <div className="flex justify-center mt-2 space-x-4">
          <a
            href="https://github.com/optimus-prime-01"
            className="text-white hover:text-gray-400"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/anmol-sinha-b7b7a224b/"
            className="text-white hover:text-gray-400"
          >
            <Linkedin size={20} />
          </a>
        </div>
</div>

    </footer>
  );
};

export default Footer;
