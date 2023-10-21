'use client'

import Deck from '@/components/Deck'
import Button from '@/components/Button'
import { Cog8ToothIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { flushSync } from 'react-dom'
import {
    hasDeckDataChanged,
    incrementCardIndex,
    resetCardIndex,
    saveDeckData,
    setCards,
    useStore,
} from '@/store'
import ResetModal from '@/components/modals/ResetModal'
import SettingsModal from '@/components/modals/SettingsModal'
import { compileDeck, randomizeDeck } from '@/compileDeck'
import reorderForMiss from '@/reorderForMiss'

export default function Home() {
    useEffect(() => {
        useStore.persist.rehydrate()
    }, [])

    const cards = useStore((state) => state.cards)

    const cardIndex = useStore((state) => state.cardIndex)

    const selectedChapters = useStore((state) => state.deckData)

    const [cardFlipped, setCardFlipped] = useState('')

    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [isResetModalOpen, setIsResetModalOpen] = useState(false)

    function resetDeck() {
        const topUUIDs = cards
            .slice(cardIndex, Math.min(cards.length, cardIndex + 3))
            .map((card) => card.uuid)

        let newCards = hasDeckDataChanged()
            ? compileDeck(selectedChapters)
            : randomizeDeck(cards)

        newCards = newCards.map((card, index) => {
            return {
                ...card,
                uuid: topUUIDs[index] || uuidv4(),
            }
        })

        flushSync(() => {
            setCards(newCards)
            resetCardIndex()
            setCardFlipped('')
            saveDeckData()
        })
    }

    function reorderCurrentCard() {
        setCards(reorderForMiss(cards, cardIndex))
    }

    const theme = useStore((state) => state.theme)

    return (
        <main
            suppressHydrationWarning
            className={`flex h-screen w-screen flex-col items-center justify-center overflow-x-hidden bg-lgray-800 theme-${theme}`}
        >
            <div className="grid">
                <Deck
                    cards={cards.slice(
                        cardIndex,
                        Math.min(cards.length, cardIndex + 3),
                    )}
                    cardFlipped={cardFlipped}
                    setCardFlipped={setCardFlipped}
                />
            </div>

            <div
                suppressHydrationWarning
                className="card-w mt-3 text-center font-bold text-white"
            >
                <span suppressHydrationWarning>
                    {cardIndex >= cards.length && 'Done'}
                    {cardIndex < cards.length && (
                        <>
                            {cardIndex + 1}/{cards.length}
                        </>
                    )}
                </span>
            </div>

            <div className="card-w mt-3 grid grid-cols-10 grid-rows-2 gap-4">
                <Button
                    borderClassName="col-span-10"
                    disabled={cardIndex >= cards.length}
                    onClick={() => {
                        incrementCardIndex()
                    }}
                >
                    <div
                        suppressHydrationWarning
                        className={`px-4 py-2 text-center font-bold ${
                            cardIndex >= cards.length
                                ? 'text-gray-400'
                                : 'text-white'
                        }`}
                    >
                        Next
                    </div>
                </Button>
                <Button
                    borderClassName="col-span-4 row-start-2"
                    onClick={() => {
                        // reset if less than 20% of the way through
                        if (
                            cardIndex < cards.length * 0.1 ||
                            cardIndex >= cards.length
                        ) {
                            resetDeck()
                        } else {
                            setIsResetModalOpen(true)
                        }
                    }}
                >
                    <div className="px-4 py-2 text-center font-bold">
                        Restart
                    </div>
                </Button>
                <Button
                    borderClassName="col-start-5 col-span-2 row-start-2"
                    className="flex items-center justify-center"
                    onClick={() => setIsSettingsOpen(true)}
                >
                    <Cog8ToothIcon className="h-6 w-6" />
                </Button>
                <Button
                    borderClassName="col-span-4 col-start-7 row-start-2"
                    onClick={() => {
                        // resetDeck()
                        reorderCurrentCard()
                    }}
                >
                    <div className="px-4 py-2 text-center font-bold">Miss</div>
                </Button>
            </div>

            <SettingsModal
                open={isSettingsOpen}
                setOpen={setIsSettingsOpen}
                onReset={resetDeck}
            />
            <ResetModal
                open={isResetModalOpen}
                setOpen={setIsResetModalOpen}
                onReset={resetDeck}
            />
        </main>
    )
}
