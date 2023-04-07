import React from 'react'

type Props = {
    name: string
}

export const HomeButton = (props: Props) => {
    const { name } = props

    return (
        <button>{name}</button>
    )
}
