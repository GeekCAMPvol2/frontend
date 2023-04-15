import { Styles } from '@/types/Styles';
import React from 'react';
import { motion } from 'framer-motion';

type Props = {
    delay: number
    color: string
    name: string
    disabled?: boolean;
    onClick: () => void
    onHoverStart: () => void
}

export const SigninButton = (props: Props) => {
    const { delay, color, name, onClick, onHoverStart, disabled = false,
    } = props

    return (
        <motion.button
            transition={{

            }}
            animate={{
                x: 0,
                scale: 1,
                opacity: 1,
                rotate: 0,
                transition: {
                    type: "spring",
                    stiffness: 150,
                    duration: 0.3,
                    delay: delay
                }
            }}
            initial={{
                scale: 0,
                rotate: 200,
            }}
            exit={{

            }}
            whileHover={{
                opacity: 1,
                scale: 1.1,
                backgroundColor: color,
                color: "rgb(0 0 0 /0.8)",
                border: `5px solid ${color}`,
                boxShadow: `0px 0px 15px ${color}`,
            }}
            onHoverStart={onHoverStart}
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
            disabled={disabled}
        >{name}
        </motion.button>
    )
}

const styles: Styles = {
    button: {
        height: 60,
        width: 200,
        color: "#fff",
        backgroundColor: "rgb(5 0 0/0)",
        border: "3px solid #fff",
        borderRadius: 400,
        // boxShadow: "0px 0px 30px #444",
        opacity: 0.8,
        marginLeft: 20,
        marginTop: 30,
        fontSize: 30,
    }
}