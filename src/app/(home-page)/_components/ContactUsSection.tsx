"use client";

import React, { useState } from "react";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/components/ui/button/Button";
import ArrowIcon from "@/shared/components/icons/ArrowIcon";

export default function ContactUsSection() {
  const [message, setMessage] = useState("");
  const wordCount = message.trim() ? message.trim().split(/\s+/).length : 0;

  return (
    <div className="lg:min-h-screen w-full py-[64px] lg:py-[8.33vw] flex flex-col items-center justify-center">
      <LayoutWrapper className="w-full h-full flex flex-col items-center justify-center text-left">
        <div className="w-full lg:max-w-[63.33vw]">
          <p className="max-lg:hidden lg:text-[1.11vw] lg:max-w-[25.42vw] leading-[120%] lg:mb-[2.78vw] uppercase text-gray-800">
            One diagnosed variable, one honest conversation, one earned outcome
            at a time.
          </p>

          <p className="text-[32px] lg:text-[3.06vw] leading-[80%] tracking-[-2px] font-medium text-black">
            Contact Us
          </p>

          <p className="max-lg:hidden lg:mt-[1.67vw] font-haas lg:text-[1.25vw] text-[#000000A3]">
            Fill in the details below to start the conversation
          </p>

          <div className="mt-8 lg:mt-[2.78vw] w-full">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col gap-4 lg:gap-[1.11vw]"
            >
              {/* Top row: Name & Email */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-[1.39vw]">
                <input
                  type="text"
                  placeholder="Full name *"
                  required
                  className="w-full font-haas h-[52px] lg:h-[3.89vw] px-4 lg:px-[1.11vw] lg:rounded-[0.28vw] rounded-[4px] border border-[#D0D5DD] text-[15px] lg:text-[1.11vw] text-black placeholder:text-[#8F959B] focus:outline-none focus:border-[#0088CC] transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  className="w-full font-haas h-[52px] lg:h-[3.89vw] px-4 lg:px-[1.11vw] lg:rounded-[0.28vw] border border-[#D0D5DD] text-[15px] lg:text-[1.11vw] text-black placeholder:text-[#8F959B] focus:outline-none focus:border-[#0088CC] transition-colors"
                />
              </div>

              <input
                type="text"
                placeholder="Company or Brand *"
                required
                className="w-full font-haas h-[52px] lg:h-[3.89vw] px-4 lg:px-[1.11vw] lg:rounded-[0.28vw] border border-[#D0D5DD] text-[15px] lg:text-[1.11vw] text-black placeholder:text-[#8F959B] focus:outline-none focus:border-[#0088CC] transition-colors"
              />

              <div>
                <textarea
                  rows={6}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What's the growth problem you're trying to solve?"
                  className="w-full font-haas p-4 lg:p-[1.11vw] lg:rounded-[0.28vw] border border-[#D0D5DD] text-[15px] lg:text-[1.11vw] text-black placeholder:text-[#8F959B] resize-none focus:outline-none focus:border-[#0088CC] transition-colors"
                />
                <div className="text-right font-haas text-[13px] lg:text-[0.97vw] text-[#70757E] mt-1.5 lg:mt-[0.42vw]">
                  {wordCount}/200 (Words limit)
                </div>
              </div>

              <Button
                variant="secondary"
                className="max-md:w-full md:w-fit border-[#007DB0] text-[#007DB0] mt-10 lg:mt-[2.78vw]"
              >
                BOOK A DIAGNOSIS <ArrowIcon className="ml-2 lg:ml-[0.56vw]" />
              </Button>
            </form>
          </div>
        </div>
      </LayoutWrapper>
    </div>
  );
}
