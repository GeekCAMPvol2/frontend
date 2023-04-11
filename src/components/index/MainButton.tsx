import { Styles } from '@/types/Styles'
import React from 'react'
import { motion } from "framer-motion"

type Props = {
    name: string
    onClick: () => void
}

export const MainButton = (props: Props) => {
    const { name, onClick } = props

    return (
        <motion.button
            whileHover={{
                opacity: 1,
                scale: 1.1
            }}
            whileTap={{
                scale: 1
            }}
            initial={{ opacity: 0.5 }}
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