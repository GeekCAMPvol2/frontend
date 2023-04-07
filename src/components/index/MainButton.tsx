import React from 'react'

type Props = {
    name: string
}

export const MainButton = (props: Props) => {
    const { name } = props

    return (
        <button>{name}</button>
    )
}
