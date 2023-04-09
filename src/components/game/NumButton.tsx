import React from 'react'

type Props = {
    number: number
}

export const NumButton = (props: Props) => {
    const { number } = props

    return (
        <button>{number}</button>
    )
}
