import React from 'react'
import { motion } from "framer-motion"

export const Title = () => {
    return (
        <motion.h1
            style={{
                fontSize: 120,
                backgroundColor: "rgb(0 0 0 /0)"
            }}
            animate={{
                scale: [1.08, 1, 1, 1, 1, 1, 1],
                // y: [-10, 0, 0, 0, 0, 0],
                transition: {
                    repeat: Infinity,
                    duration: 0.5,
                }
            }}
        >
            <span style={{
                color: 'rgb(199,81,250)',
                textShadow: `0px 0px 15px rgb(199,81,250)`,

            }}>
                Price
            </span>
            <span
                style={{
                    color: 'rgb(0,255,250)',
                    textShadow: `0px 0px 15px rgb(0,255,250)`,
                }}
            >Quest</span>
        </motion.h1 >
    )
}
