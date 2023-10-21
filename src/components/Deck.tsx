import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

export type DeckProps = {
    children?: React.ReactNode
    cards: Card[]
    cardFlipped: string
    setCardFlipped: (isFlipped: string) => void
}

export type Card = {
    uuid: string
    verse: string
    content: string
}

// function getRandomNumber(min: number, max: number) {
//     return Math.random() * (max - min) + min
// }


export default function Deck({
    cards,
    cardFlipped,
    setCardFlipped,
}: DeckProps) {
    // const { width, height } = useWindowDimensions()

    const getRealIndex = (card: Card) => {
        return cards.findIndex((c) => c.uuid === card.uuid)
    }

    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <>
            {mounted && (
                <AnimatePresence>
                    {[...cards].reverse().map((card, index) => {
                        // console.log(card, index)
                        return (
                            <motion.div
                                key={card.uuid}
                                initial={{ zIndex: 1 }} // initial z-index
                                animate={{ zIndex: 1 }} // animate z-index
                                exit={{
                                    x: 1000,
                                    opacity: 0,
                                    zIndex: 9999,
                                    transition: {
                                        type: 'spring',
                                        duration: 2,
                                        opacity: { delay: 0.3 },
                                        zIndex: { duration: 0 },
                                    },
                                }}
                                onClick={() =>
                                    setCardFlipped(
                                        card.uuid === cardFlipped
                                            ? ''
                                            : card.uuid,
                                    )
                                }
                                suppressHydrationWarning
                                className={`gradient-background card-h card-w relative cursor-pointer overflow-y-auto overflow-x-hidden rounded p-[0.2rem] ${
                                    getRealIndex(card) === 0 ? 'shadow-lg' : ''
                                }`}
                                style={{
                                    bottom: `${index * 5}px`,
                                    // transform: `scale(${1 - ((cards.length - 1 - index) * 0.005)})`,
                                    gridColumn: '1/2',
                                    gridRow: '1/2',
                                }}
                            >
                                <div className="card flex h-full w-full items-center justify-center rounded-sm bg-lgray-700 text-center">
                                    <motion.p
                                        suppressHydrationWarning
                                        layout="position"
                                        transition={{
                                            type: 'spring',
                                            bounce: 0.1,
                                            duration: 0.5,
                                        }}
                                        className={`card-text${
                                            cardFlipped === card.uuid
                                                ? '-sm'
                                                : ''
                                        } m-auto select-none text-white`}
                                    >
                                        <span
                                            suppressHydrationWarning
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    cardFlipped === card.uuid
                                                        ? card.content
                                                        : // + `<br /><strong>${card.verse.replace(
                                                          //       'Quote ',
                                                          //       '',
                                                          //   )}</strong>`
                                                          card.verse,
                                            }}
                                        ></span>
                                    </motion.p>
                                </div>
                            </motion.div>
                        )
                    })}
                </AnimatePresence>
            )}
            <div
                className="card card-h card-w flex items-center justify-center rounded-sm bg-lgray-800"
                style={{
                    gridColumn: '1/2',
                    gridRow: '1/2',
                    bottom: `10px`,
                }}
            >
                <span className="card-text m-auto select-none text-white">
                    Finished!
                </span>
            </div>
        </>
    )
}
