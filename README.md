<div className="absolute bottom-40 w-full">
<LayoutWrapper className="flex items-center justify-between w-full">
  <Button
    variant="secondary"
    isIconOnly
    direction="down"
    className="w-[2.778vw] h-[2.778vw]"
  >
    <ArrowIcon className="rotate-90" />
  </Button>

  <p className="lg:max-w-[26.6vw] max-w-[20.208vw] text-center lg:text-[1.25vw] text-[0.972vw] text-white leading-[110%] font-normal">
    Do you know which one's working against you? Most people find out only after the budget's gone.
  </p>

  <div className="flex h-[115px] lg:h-[7.986vw] items-center">
    {/* Image Container */}
    <div className="w-[115px] lg:w-[7.986vw] h-full bg-blue-500 rounded-sm overflow-hidden flex-shrink-0">
      {/* Place your case study image component here */}
    </div>


    <div className="w-[238px] lg:w-[16.528vw] h-full bg-white text-black p-[1.111vw] flex flex-col justify-between flex-shrink-0">
      <div className="flex items-center justify-between">
        <p className="text-[18px] lg:text-[1.25vw] font-medium leading-[80%]">
          New Case Study
        </p>
        <TextSlide>
          <ArrowIcon className="rotate-180 w-4 h-4 lg:w-[1.111vw] lg:h-[1.111vw]" />
        </TextSlide>
      </div>

      <div className="flex flex-col gap-[0.278vw]">
        <p className="text-[16px] lg:text-[1.111vw] font-medium leading-[100%]">
          Marketing
        </p>
        <p className="text-[16px] lg:text-[1.111vw] leading-[100%] text-black/70">
          Web Design, 3D & Development
        </p>
      </div>
    </div>
  </div>
</LayoutWrapper>
   
      </div>