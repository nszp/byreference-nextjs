import { Card } from '@/components/Deck'
import { v4 as uuidv4 } from 'uuid'

function getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) // The maximum is inclusive and the minimum is inclusive
}

const reorder = (
    array: any[],
    sourceIndex: number,
    destinationIndex: number,
) => {
    const smallerIndex = Math.min(sourceIndex, destinationIndex)
    const largerIndex = Math.max(sourceIndex, destinationIndex)

    return [
        ...array.slice(0, smallerIndex),
        ...(sourceIndex < destinationIndex
            ? array.slice(smallerIndex + 1, largerIndex + 1)
            : []),
        { ...array[sourceIndex], uuid: uuidv4() },
        ...(sourceIndex > destinationIndex
            ? array.slice(smallerIndex, largerIndex)
            : []),
        ...array.slice(largerIndex + 1),
    ]
}

export default function reorderForMiss(cards: Card[], index: number): Card[] {
    return reorder(cards, index, index + getRandomIntInclusive(3, 8))
}
