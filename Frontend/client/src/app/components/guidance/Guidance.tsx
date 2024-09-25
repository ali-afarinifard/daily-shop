'use client'

// ** React
import { useState } from "react"

// ** Accordion Tools
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel, AccordionItemState } from "react-accessible-accordion"

// ** Utils
import data from "@/utils/accordion"

// ** Components
import Heading from "../Heading"

// ** MUI
import { Box, Typography } from "@mui/material"

const Guidance = () => {

    const [className, setClassName] = useState("collapsed");

    return (
        <Box
            component="div"
            sx={{
                mt: '5rem'
            }}
        >
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Heading title="سوالات پرتکرار" center />
            </Box>

            <Box
                component="div"
                sx={{
                    mt: '2.5rem',
                    maxWidth: '70rem',
                    mx: 'auto'
                }}
            >

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
                                                <Typography
                                                variant="h3"
                                                sx={{
                                                    color: '#1f3e72',
                                                }}
                                                    className={`${expanded ? "expanded" : "collapsed"
                                                        }`}
                                                >
                                                    {item.heading}
                                                </Typography>
                                            )}
                                        </AccordionItemState>

                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <Typography variant="body1" sx={{ color: '#8c8b8b', lineHeight: '2.25REM' }} className='text-[#8c8b8b] text-[0.9rem] leading-9'>{item.details}</Typography>
                                </AccordionItemPanel>
                            </AccordionItem>
                        )
                    })}
                </Accordion>

            </Box>
        </Box>
    )
}

export default Guidance