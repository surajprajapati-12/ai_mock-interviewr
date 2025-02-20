// import Container from "@/components/container";
// import { MarqueImg } from "@/components/marquee-img";
// import { Button } from "@/components/ui/button";
// import { Sparkles } from "lucide-react";
// import Marquee from "react-fast-marquee";
// // import { Link } from "react-router-dom";

// function HomePage() {
//   return (
//     <div className="flex flex-col w-full pb-24">
//       <Container>
//         <div className="my-8">
//           <h2 className="text-3xl text-center md:text-left md:text-6xl">
//             <span className="font-extrabold text-outline md:text-8xl">
//               AI Boost
//             </span>
//             <span className="font-extrabold text-gray-500">
//               - Leverage AI to ace interviews.
//             </span>
//             <br />
//             Enhance your chances of securing the job.
//           </h2>

//           <p className="mt-4 text-sm text-muted-foreground">
//             Boost your interview skills and increase your success rate with
//             AI-driven insights. Discover a smarter way to prepare, practice, and
//             stand out.
//           </p>
//         </div>

//         {/* Statistics Section */}
//         <div className="flex items-center w-full gap-12 justify-evenly md:px-12 md:py-16 md:items-center md:justify-end">
//           <p className="text-3xl font-semibold text-center text-gray-900">
//             250k+
//             <span className="block text-xl font-normal text-muted-foreground">
//               Offers Received
//             </span>
//           </p>
//           <p className="text-3xl font-semibold text-center text-gray-900">
//             1.2M+
//             <span className="block text-xl font-normal text-muted-foreground">
//               Interviews Aced
//             </span>
//           </p>
//         </div>

//         {/* Image Section */}
//         <div className="w-full mt-4 rounded-xl bg-gray-100 h-[420px] drop-shadow-md overflow-hidden relative">
//           <img
//             src="hero.jpg"
//             alt="Hero"
//             className="object-cover w-full h-full"
//           />

//           {/* Floating Text */}
//           <div className="absolute px-4 py-2 rounded-md top-4 left-4 bg-white/40 backdrop-blur-md">
//             Interviews Copilot&copy;
//           </div>

//           {/* Floating Box with Button */}
//           <div className="absolute hidden px-4 py-2 rounded-md md:block w-80 bottom-4 right-4 bg-white/60 backdrop-blur-md">
//             <h2 className="font-semibold text-neutral-800">Developer</h2>
//             <p className="text-sm text-neutral-500">
//               Enhance your interview skills with AI-driven insights and smart
//               recommendations.
//             </p>

//             <Button className="flex items-center gap-2 mt-3">
//               Generate <Sparkles />
//             </Button>
//           </div>
//         </div>
//       </Container>

//       {/* marquee section -->> For moving logos,we have imported the package react-fast-marquee*/}   
//       <div className="w-full my-12">
//         <Marquee pauseOnHover>
//           <MarqueImg img="firebase.png"/>
//           <MarqueImg img="meet.png"/>
//           <MarqueImg img="zoom.png"/>
//           <MarqueImg img="firebase.png"/>
//           <MarqueImg img="microsoft.png"/>
//           <MarqueImg img="meet.png"/>
//           <MarqueImg img="tailwindcss.png"/>
//           <MarqueImg img="microsoft.png"/>
//         </Marquee>
//       </div>

//       {/* <Container className="py-8 space-y-8">
//         <h2 className="text-xl font-semibold tracking-wide text-gray-800">
//           Unleash your potential with personalized AI insights and targeted
//           interview practice.
//         </h2>

//         <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
//           <div className="col-span-1 md:col-span-3">
//             <img
//               src="office.jpg"
//               alt=""
//               className="object-cover w-full rounded-md max-h-96"
//             />
//           </div>

//           <div className="flex flex-col items-center justify-center w-full col-span-1 gap-8 text-center md:col-span-2 max-h-96 min-h-96">
//             <p className="text-center text-muted-foreground">
//               Transform the way you prepare, gain confidence, and boost your
//               chances of landing your dream job. Let AI be your edge in
//               today&apos;s competitive job market.
//             </p>

//             <Link to={"/generate"} className="w-full">
//               <Button className="w-3/4">
//                 Generate <Sparkles className="ml-2" />
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </Container> */}

//     </div>
//   );
// }

// export default HomePage;

"use client";

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-react";

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-gray-800/[0.08]",
}: {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border-2 border-black/[0.15]",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.1),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export default function AIBoostHero() {
  const { userId } = useAuth();
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    }),
  };

  return (
    <div className="relative flex items-center justify-center w-full min-h-screen overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-100/[0.05] via-transparent to-gray-200/[0.05] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-gray-200/[0.15]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-gray-300/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-gray-100/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-gray-400/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto md:px-6 mt-[-80px]">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div custom={0} variants={fadeUpVariants} initial="hidden" animate="visible">
            <motion.h1
              style={{
                fontSize: "6rem",
                fontWeight: "bold",
                fontFamily: "sans-serif",
                background: "linear-gradient(to bottom, #1a1a1a, #333)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              AI Boost
            </motion.h1>

            <motion.h2
              style={{
                fontSize: "5rem",
                fontWeight: "bold",
                background: "linear-gradient(to right, #444, #666, #888)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginTop: "10px",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            >
              Leverage AI to ace interviews
            </motion.h2>
          </motion.div>

          <motion.div custom={1} variants={fadeUpVariants} initial="hidden" animate="visible">
            <p className="max-w-xl px-4 mx-auto mb-8 text-lg font-light leading-relaxed tracking-wide text-gray-600 sm:text-xl md:text-2xl">
              Boost your interview skills with AI-driven insights. Prepare smarter, practice better, and stand out!
            </p>
          </motion.div>

          <motion.div custom={2} variants={fadeUpVariants} initial="hidden" animate="visible">
            <Link to={userId ? "/generate" : "/signin"}>
              <Button
                className="relative px-6 py-3 text-lg font-semibold text-white transition-all duration-300 bg-gray-800 rounded-full hover:bg-gray-700"
                style={{
                  boxShadow: "0 0 15px #00ff00, 0 0 30px #00ff00",
                  border: "2px solid #00ff00",
                }}
              >
                {userId ? "Take Interview" : "Get Started"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white via-transparent to-white/80" />
    </div>
  );
}

