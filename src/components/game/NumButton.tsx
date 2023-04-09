import { Styles } from '@/types/Styles'
import React from 'react'
import { motion } from "framer-motion"

type Props = {
    number: number
    onClick: () => void
}

export const NumButton = (props: Props) => {
    const { number, onClick } = props

    return (
        <motion.div
            whileTap={{
                scale: 0.9
            }}
        >
            <button
                style={styles.button}
                onClick={onClick}
            >
                {number}
            </button>
        </motion.div>
    )
}

const styles: Styles = {
    button: {
        width: 55,
        height: 55,
        fontSize: 30,
        color: "#000",
        margin: "0 auto",
        marginBottom: 10,
        borderRadius: "50%"

    }

}