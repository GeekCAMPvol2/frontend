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
    const { delay, name, onClick } = props

    return (
        <motion.button
            animate={{
                x: 0,
                opacity: 1,
                rotate: 0,
                transition: {
                    duration: 0.3,
                    delay: delay
                }
            }}
            initial={{
                x: -1750,
                opacity: 0,
                rotate: 90,
            }}

            whileHover={{
                opacity: 1,
                scale: 1.1
            }}
            whileTap={{
                scale: 1
            }}
            style={styles.button}
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
        backgroundColor: "#000",
        border: "5px solid #fff",
        borderRadius: 20,
        boxShadow: "5px 5px 5px #000",
        opacity: 0.8,
        margin: "0 auto",
        marginTop: 50,
        fontSize: 50,
    }
}