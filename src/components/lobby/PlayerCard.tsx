import { Styles } from '@/types/Styles'
import React from 'react'

type Props = {
    name: string
    playerImg: string
}

export const PlayerCard = (props: Props) => {
    const { name, playerImg } = props

    return (
        <div style={styles.container}>
            <img
                src={playerImg}
                style={styles.image}
            />
            <h2>{name}</h2>

        </div>
    )
}

const styles: Styles = {
    container: {
        textAlign: "center"
    },
    image: {
        width: 120,
        height: 120,
        objectFit: "cover",
        borderRadius: "50%",
        marginBottom: 10
    }
}
