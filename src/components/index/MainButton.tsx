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
        color: "#000"
    }
}