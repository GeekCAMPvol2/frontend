import { Styles } from '@/types/Styles'
import React from 'react'

type Props = {
    name: string
}

export const MainButton = (props: Props) => {
    const { name } = props

    return (
        <button
            style={styles.button}
        >{name}
        </button>
    )
}

const styles: Styles = {
    button: {
        height: 100,
        width: 500,
        color: "#fff",
        backgroundColor: "#000",
        border: "3px solid #fff",
        borderRadius: 20,
        boxShadow: "5px 5px 5px #000",
        opacity: 0.8,
        margin: "0 auto",
        marginTop: 50
    }
}