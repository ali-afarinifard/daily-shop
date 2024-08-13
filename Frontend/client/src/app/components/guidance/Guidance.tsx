'use client'

import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel, AccordionItemState } from "react-accessible-accordion"
import Heading from "../Heading"
import data from "@/utils/accordion"
import { useState } from "react"

const Guidance = () => {

    const [className, setClassName] = useState("collapsed");

    return (
        <div className="mt-20">
            <div className="flex flex-col items-center justify-center">
                <Heading title="سوالات پرتکرار" center />
            </div>

            <div className="mt-10 max-w-[70rem] mx-auto">

                <Accordion
                    className="mt-7 border-none"
                    allowMultipleExpanded={false}
                    preExpanded={[0]}
                >
                    {data.map((item, i) => {
                        return (
                            <AccordionItem className={`${className} p-4 px-10 bg-slate-100 rounded-lg overflow-hidden mb-6`} uuid={i} key={i}>
                                <AccordionItemHeading>
                                    <AccordionItemButton className='flex items-center justify-center flex-wrap gap-8 bg-slate-100 p-4 w-full justify-self-center cursor-pointer'>

                                        <AccordionItemState>
                                            {({ expanded }) => (
                                                <span
                                                    className={`${expanded ? "expanded" : "collapsed"
                                                        } text-[#1f3e72] font-bold text-[1.2rem]`}
                                                >
                                                    {item.heading}
                                                </span>
                                            )}
                                        </AccordionItemState>

                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p className='text-[#8c8b8b] text-[0.9rem] leading-9'>{item.details}</p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        )
                    })}
                </Accordion>

            </div>
        </div>
    )
}

export default Guidance