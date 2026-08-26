"use client";

import ArrowIcon from "@/shared/components/icons/ArrowIcon";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import { AnimatePresence, motion, Variants } from "framer-motion";
import React, { useState } from "react";

const faqData = [
  {
    id: 1,
    question: "Is uncover a marketing agency?",
    answer:
      "Yes. We help businesses diagnose, execute and optimize performance marketing. The difference is that we start by understanding what is actually limiting growth before putting more money behind campaigns.",
  },
  {
    id: 2,
    question: "What makes uncover different from a marketing agency?",
    answer:
      "We focus on end-to-end business growth engines rather than vanity metrics or isolated ad campaigns.",
  },
  {
    id: 3,
    question: "Do you handle execution as well?",
    answer:
      "Yes, we take full ownership of technical execution, creative strategy, and campaign management.",
  },
  {
    id: 4,
    question: "Who do you work with?",
    answer:
      "We work with ambitious founders and scaling companies looking for sustainable revenue growth.",
  },
  {
    id: 5,
    question: "What channels do you work with?",
    answer:
      "We work across paid social, search, programmatic, lifecycle email, and conversion rate optimization.",
  },
  {
    id: 6,
    question: "What do I get from the diagnosis?",
    answer:
      "You receive a comprehensive audit highlighting bottlenecks, actionable growth levers, and a clear execution roadmap.",
  },
];

// Main section entrance animation
const sectionReveal: Variants = {
  hidden: { y: "100%" },
  visible: {
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

// Text reveal when opening accordion item
const textRevealVariant: Variants = {
  hidden: { y: "-100%" },
  visible: {
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1],
    },
  },
};

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1); // Defaults to first item open

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="lg:py-[8.33vw] w-full py-[64px]">
      <LayoutWrapper className="flex flex-col lg:flex-row justify-between w-full gap-10 lg:gap-0">
        <div>
          <div className="">
            <p className="lg:text-[3.33vw] text-[32px] leading-[80%]  ">
              FAQs
            </p>
          </div>

          <div className=" mt-[24px] lg:block hidden lg:mt-[1.66vw] max-w-[325px] lg:max-w-[22.57vw]">
            <p className="text-[18px]  lg:text-[1.25vw] leading-[130%] text-[#000000A3] font-haas">
              Questions we get asked before first diagnosis, the things worth
              clarifying.
            </p>
          </div>
        </div>

        <div className="max-w-[732px] lg:max-w-[50.83vw] w-full border-t border-[#0000001F]">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="border-b border-[#0000001F] py-[24px] lg:py-[1.66vw]"
              >
                {/* Accordion Trigger Header */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="flex items-center w-full justify-between text-left focus:outline-none cursor-pointer"
                >
                  <p className="text-[20px] lg:text-[1.67vw]  leading-[120%]">
                    {item.question}
                  </p>
                  <motion.div
                    animate={{ rotate: isOpen ? 0 : 180 }}
                    transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <ArrowIcon className="w-[16px] h-[16px] -rotate-90 lg:w-[1.67vw] lg:h-[1.67vw]" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="mt-[20px] lg:mt-[1.11vw] max-w-[525px] lg:max-w-[36.45vw] overflow-hidden">
                        <motion.p
                          variants={textRevealVariant}
                          initial="hidden"
                          animate="visible"
                          className="leading-[120%]  lg:text-[1.11vw] text-[#000000B8] font-haas"
                        >
                          {item.answer}
                        </motion.p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </LayoutWrapper>
    </div>
  );
}