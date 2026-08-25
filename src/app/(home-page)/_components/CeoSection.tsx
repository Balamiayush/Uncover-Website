import LayoutWrapper from '@/shared/components/layouts/wrapper/LayoutWrapper'
import Image from 'next/image'
import React from 'react'

export default function CeoSection() {
  return (
    <div className=' lg:py-[8.33vw] bg-[#F6FAFC]'>
        <LayoutWrapper className=' flex justify-between'>
            <div className="">
                <div className=" relative w-[32.92vw] h-[30.83vw] rounded-[0.56vw] overflow-hidden">
                    <Image
                    fill
                    src={'https://i.pinimg.com/1200x/35/16/9f/35169f77d14878a39f31ec1ffac3e115.jpg'}
                    alt=''
                    />
                </div>
                <div className=" mt-[1.39vw]">

                <p className=' text-[1.94vw] leading-[80%] tracking-[-0.07vw]'>Yogita Agrawal</p>
                <p className=' mt-[1.11vw] text-[1.11vw] leading-[120%] text-[#000000B8] font-haas'>CEO, Uncover</p>
                </div>
            </div>
            <div className=" w-[48.19vw] h-[30.83vw] flex flex-col justify-between">

            <div className=" ">
                <p className='text-[3.33vw] leading-[80%] tracking-[-0.21vw]'>We've sat on the other side of this</p>
                <p className=' font-haas text-[1.25vw] leading-[120%] mt-[1.67vw] text-[#000000B8]'>Uncover was built by someone who's read the reports that meant nothing.</p>
            </div>
            <div className=" flex gap-[1.39vw] flex-col">

            <p className='text-[1.11vw] text-[#000000B8] font-haas leading-[120%]'>I'm Yogita Agrawal. Before Uncover, I scaled huge restaurant chains at Zomato, worked CXO-level revenue-protection mandates at Velocity, and led international expansion at Karobar. </p>
            <p className='text-[1.11vw] text-[#000000B8] font-haas leading-[120%]'>In each of those seats, I sat across the table from agencies presenting dashboards full of numbers that looked good and explained nothing, reach that didn't convert, ROAS that didn't touch the bank account, reports built to survive a review meeting rather than answer the only question that mattered: is this working, and how do you know? </p>
            <p className='text-[1.11vw] text-[#000000B8] font-haas leading-[120%]'>I'm Yogita Agrawal. Before Uncover, I scaled huge restaurant chains at Zomato, worked CXO-level revenue-protection mandates at Velocity, and led international expansion at Karobar. </p>
            </div>
            </div>
        </LayoutWrapper>
    </div>
  )
}