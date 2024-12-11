"use client";
import React, { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { FloatingNav } from "@/components/ui/FloatingNavbar";
import { navItems } from "@/data";
import Footer from "@/components/Footer";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Link from "next/link";

const Page = () => {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the user is not signed in, redirect to the sign-in page
    if (!isSignedIn) {
      router.push("/signin");
    }
  }, [isSignedIn, router]);

  return (
    <>
      <div className="pb-20 pt-36">
        {/* Spotlight Effects */}
        <div>
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="purple"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
        </div>

        {/* Background and Main Content */}
        <div
          className="h-screen w-full dark:bg-black-100 bg-white dark:bg-grid-white/[0.03] bg-grid-black-100/[0.2]
       absolute top-0 left-0 flex items-center justify-center"
        >
          <div
            className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black-100
         bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
          />
        </div>

        {/* Main Section */}
        <div className="flex flex-col items-center relative my-20 z-10 px-4 md:px-8">
          <div className="max-w-7xl flex flex-col items-center justify-center">
            <TextGenerateEffect
              words="Our Products"
              className="text-center text-3xl md:text-5xl lg:text-6xl mb-8"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Product Card 1 */}
              <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 lg:p-8 bg-white dark:bg-zinc-900 flex flex-col items-center">
                <Link href="/ai/daily-diat">
                  <Image
                    src={`https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/6ff07b8f-fa78-4eb7-bac6-74f1de93859d.png`}
                    alt="Daily Plant-based diet plan"
                    height="300"
                    width="300"
                    className="object-contain cursor-pointer"
                  />
                </Link>
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
                  Personalized Meal Plannner
                </p>
                {/* <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                  The platform generates customized daily and weekly meal plans based on your-specific factors such as age, physical activity level, and the availability of local food items.
                </p> */}
              </BackgroundGradient>

              {/* Product Card 2 */}
              <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 lg:p-8 bg-white dark:bg-zinc-900 flex flex-col items-center">
                <Link href="/ai/nonveg-protein">
                  <Image
                    src={`https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/d529e42f-aaef-48df-aa76-7731ee58bf0c.webp`}
                    alt="Non-veg protein Replacement Tool"
                    height="300"
                    width="300"
                    className="object-contain cursor-pointer"
                  />
                </Link>
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
                  Affordable Alternative Food
                </p>
                {/* <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                  You can search for affordable vegetarian alternatives to non-vegetarian protein sources. Suggestions are tailored to provide equivalent nutritional value at reduced costs.
                </p> */}
              </BackgroundGradient>

              {/* Product Card 3 */}
              <BackgroundGradient className="rounded-[22px] p-4 sm:p-6 lg:p-8 bg-white dark:bg-zinc-900 flex flex-col items-center">
                <Link href="/ai/dveg-res-serach">
                  <Image
                    src={`https://files.edgestore.dev/iz2sept3369gmc0f/publicFiles/_public/c3d1364f-edc8-45f7-a2f3-e26a05383530.jpg`}
                    alt="Vegetarian Recipe Search"
                    height="300"
                    width="300"
                    className="object-contain cursor-pointer"
                  />
                </Link>
                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200 text-center">
                  Budget-Friendly Recipe Tutorials
                </p>
                {/* <p className="text-sm text-neutral-600 dark:text-neutral-400 text-center">
                  You can query recipes that replace non-vegetarian protein sources with plant-based alternatives. These recipes aim to replicate the protein content and nutritional value of traditional non-veg dishes.
                </p> */}
              </BackgroundGradient>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
