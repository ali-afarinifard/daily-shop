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
                    style={{
                        marginTop: '1.75rem',
                        border: 'none'
                    }}
                    allowMultipleExpanded={false}
                    preExpanded={[0]}
                >
                    {data.map((item, i) => {
                        return (
                            <AccordionItem
                                style={{
                                    padding: '1rem',
                                    paddingBlock: '2.5rem',
                                    background: '#f1f5f9',
                                    borderRadius: '0.5rem',
                                    overflow: 'hidden',
                                    marginBottom: '1.5rem'
                                }}
                                className={`${className}`} uuid={i} key={i}>
                                <AccordionItemHeading>
                                    <AccordionItemButton
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'flex-start',
                                            flexWrap: 'wrap',
                                            gap: '2rem',
                                            background: '#f1f5f9',
                                            padding: '1rem',
                                            width: '100%',
                                            justifySelf: 'center',
                                            cursor: 'pointer'
                                        }}
                                    >

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
                                    <Typography variant="body1" sx={{ color: '#8c8b8b', lineHeight: '2.25rem' }}>
                                        {item.details}
                                    </Typography>
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