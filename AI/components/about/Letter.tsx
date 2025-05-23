import React from "react";
import Image from "next/image";

export default function Letter() {
  return (
    <div className="relative px-5 lg:px-0">
      <h2 className="text-transparent">About</h2>
      <div className="relative">
        {/* Letter Bottom */}
        <div className="absolute left-0 top-0 z-10 h-full w-full -rotate-1 rounded-lg bg-letter-middle bg-[#292f69] lg:-rotate-2"></div>
        {/* Letter Middle */}
        <div className="absolute left-1 top-1 z-20 h-[98%] w-[98%] -rotate-1 rounded-lg bg-letter-bottom lg:left-3 lg:top-10 lg:h-[95%] lg:w-[98%] lg:rotate-3 bg-[#31398d]"></div>
        {/* Letter Top */}
        <div className="relative z-30 -rotate-1 rounded-lg bg-letter-top shadow-letter-top lg:rotate-2 lg:rounded-xl bg-[#080a25]">
          <article className="space-y-4 p-4 text-base text-white/80 lg:space-y-5 lg:p-5 lg:px-24 lg:py-14 lg:text-2xl">
            <p>Hello Everyone 👋,</p>
            <p>
              Welcome to <strong>BiteBD</strong> – a project born out of a desire
              to solve one of the biggest challenges in developing countries like
              <strong> Bangladesh</strong>: <strong>protein deficiency</strong>.
            </p>
            <p>
              Many people can’t afford expensive protein sources like meat and
              fish, which are crucial for their health. BiteBD steps in with
              smart solutions to provide <strong>affordable vegetarian alternatives</strong>
              that are rich in protein and nutrition.
            </p>
            <p>
              Our mission is simple but powerful: <strong>to fight malnutrition</strong>
              and support communities with budget-friendly, healthy food options.
              This initiative aligns with <strong>UN SDG Goal 2: Zero Hunger</strong>.
            </p>
            <p>
              Here’s what BiteBD does:
            </p>
            <ul className="list-disc pl-6">
              <li>
                Recommends <strong>protein-rich vegetarian foods</strong> that are
                affordable and accessible.
              </li>
              <li>
                Provides <strong>easy-to-follow recipes</strong> to help families
                prepare nutritious meals with locally available ingredients.
              </li>
              <li>
                Offers <strong>personalized meal plans</strong> based on age, weight,
                and budget to ensure everyone gets the nutrition they need.
              </li>
              <li>
                Supports <strong>health education</strong> through an AI-powered chatbot
                assistant that answers questions and guides users.
              </li>
            </ul>
            <p>
              By combining <strong>technology</strong>, <strong>data</strong>, and <strong>compassion</strong>,
              BiteBD empowers families to make healthier food choices, improving
              their lives and overall well-being.
            </p>
            <p>
              This is more than just a project. It’s a movement to make sure
              everyone, no matter where they live or what they earn, can access
              the nutrition they deserve.
            </p>
            <p>
              We are proud to contribute to a healthier, hunger-free future.
            </p>
            <p>Let’s build a better world, one meal at a time 🌍.</p>
            <div className="relative flex flex-col items-center gap-2">
              <div className="self-start">
                Wholeness & Balanced Vibrations 🙏
              </div>
            </div>
            <div className="mb-10 font-handwriting text-4xl lg:text-6xl">
              <div className="text-white">BiteBD Team</div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <Image src={"https://files.edgestore.dev/58ak0uq249vmf7cf/publicFiles/_public/8bfea0a4-8fa0-4623-8fed-eb262f79ab6d.ico"} alt="Arionys AI" width={60} height={60} />
              </div>
              <div className="lg:ml-4">
                <div className="text-xl font-semibold text-white lg:text-2xl">
                  BiteBD
                </div>
                <div className="text-[12px] lg:text-lg">
                  Affordable Nutrition for a Healthier Tomorrow
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
