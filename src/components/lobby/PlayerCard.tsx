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
        width: 150,
        height: 150,
        objectFit: "cover",
        borderRadius: "50%",
        margin:"0 60px",
        marginBottom: 20,
    }
}
