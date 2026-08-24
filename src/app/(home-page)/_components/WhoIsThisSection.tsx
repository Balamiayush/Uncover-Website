import ArrowIcon from "@/shared/components/icons/ArrowIcon";
import LayoutWrapper from "@/shared/components/layouts/wrapper/LayoutWrapper";
import Button from "@/shared/components/ui/button/Button";

export default function WhoIsThisSection() {
  return (
    <div className="py-[120px] w-full relative">
      <LayoutWrapper>
        <div className=" flex items-end justify-between w-full">

        <div className="">
          <p className="text-[3.33vw] leading-[80%] tracking-[-2px]">
            Who is this for
          </p>
          <p className=" mt-[32px] max-w-[457px] text-[18px] font-haas text-[#000000A3] leading-[120%]">
            A marketing agency diagnosing stalled growth, aligning on issues,
            and driving outcomes.
          </p>
        </div>
        <Button variant="secondary" className="border-[#007DB0] text-[#007DB0]">
          Visit the link here <ArrowIcon className="ml-2 lg:ml-[0.56vw]" />
        </Button>
        </div>
      </LayoutWrapper>
    </div>
  );
}
