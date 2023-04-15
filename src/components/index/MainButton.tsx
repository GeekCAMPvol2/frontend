import { Styles } from '@/types/Styles'
import React from 'react'
import { motion } from "framer-motion"

type Props = {
    delay: number
    color: string
    name: string
    onClick: () => void
}

export const MainButton = (props: Props) => {
    const { delay, color, name, onClick } = props

    return (
        <motion.button
        transition={{
            
        }}
            animate={{
                x: 0,
                opacity: 1,
                rotate: 0,
                transition: {
                    type: "spring",
                    stiffness: 100,
                    duration: 0.3,
                    delay: delay
                }
            }}
            initial={{
                x: -750,
                // size:1,
                opacity: 0,
                rotate: 90,
            }}

            whileHover={{
                opacity: 1,
                scale: 1.1,
                backgroundColor: color,
                color:"#fff",
                border:`5px solid ${color}`,
                boxShadow:`0px 0px 15px ${color}`,
          
            }}
            whileTap={{
                scale: 1,
                transition: {
                    type: "spring",
                    stiffness: 500,
                    duration: 0.3,
                    delay: delay
                }
            }}
            style={{
                ...styles.button,
            }}
            onClick={onClick}
        >{name}
        </motion.button>
    )
}

const styles: Styles = {
    button: {
        height: 100,
        width: 500,
        color: "#fff",
        backgroundColor: "rgb(5 0 0/0)",
        border: "5px solid #fff",
        borderRadius: 400,
        // boxShadow: "0px 0px 30px #444",
        opacity: 0.8,
        margin: "0 auto",
        marginTop: 50,
        fontSize: 50,
    }
}