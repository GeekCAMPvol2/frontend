import { Styles } from '@/types/Styles'
import React from 'react'

type Props = {
    name: string
    playerImg: string
}

export const PlayerCard = (props: Props) => {
    const { name, playerImg } = props

    return (
        <div>
            <img
                src={playerImg}
                style={styles.image}
            />
            <h2>{name}</h2>

        </div>
    )
}

const styles: Styles = {
    image: {
        width: 50,
        height: 50,
        objectFit: "cover",
        borderRadius: "50%"
    }
}
