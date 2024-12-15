import { FaLocationArrow } from "react-icons/fa6";
import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full pt-20 pb-10 relative" id="contact">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/footer-grid.svg"
          alt="grid"
          layout="fill"
          objectFit="cover"
          className="opacity-50"
        />
      </div>

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw] text-center">
          <span className="text-purple">Join Us</span> in building a healthier world!
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Affordable Nutrition, One Plate at a Time.
        </p>
        <a href="mailto:contact.robosuperior@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-16">
        <p className="md:text-base text-sm font-light">
          Copyright &copy; 2024 BiteBD
        </p>

        <div className="flex items-center gap-6 md:gap-3">
          {socialMedia.map(({ id, url, img }) => (
            <Link key={id} href={url} target="_blank" passHref>
              <div
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
              >
                <Image
                  src={img}
                  alt={`${id} icon`}
                  width={20}
                  height={20}
                  className="rounded-lg"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
