import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import type { Card } from '@/components/Deck'
import { modify, optic } from 'optics-ts'
import {
    actsChapterLengths,
    colossiansChapterLengths,
    ephesiansChapterLengths,
    galatiansChapterLengths,
    jamesChapterLengths,
    philemonChapterLengths,
    philippiansChapterLengths,
    romansChapterLengths,
} from '@/contentConstants'

export type SelectedChapters = {
    galatians: number[]
    ephesians: number[]
    philippians: number[]
    colossians: number[]
    philemon: number[]

    romans: number[]
    james: number[]

    acts: number[]
}

export type State = {
    theme: string

    cardIndex: number
    cards: Card[]

    cachedDeckData: string
    deckData: {
        references: SelectedChapters
        quotes: SelectedChapters
        prejumps: SelectedChapters
        prejumpStyle: 'full' | 'combined'
        useAdvancedRanges: boolean
        advancedRanges: string
    }
}

const emptySelectedChapters: SelectedChapters = {
    galatians: [],
    ephesians: [],
    philippians: [],
    colossians: [],
    philemon: [],

    romans: [],
    james: [],

    acts: [],
}

const defaultDeckData: State['deckData'] = {
    references: structuredClone(emptySelectedChapters),
    quotes: structuredClone(emptySelectedChapters),
    prejumps: structuredClone(emptySelectedChapters),
    prejumpStyle: 'combined',
    useAdvancedRanges: false,
    advancedRanges: '',
}

export const useStore = create<State>()(
    persist(
        (_set, _get) => ({
            theme: 'sublime',
            cardIndex: 0,
            cards: [],
            cachedDeckData: JSON.stringify(defaultDeckData),
            deckData: defaultDeckData,
        }),
        {
            name: 'by-reference-cache',
            storage: createJSONStorage(() => localStorage),
            skipHydration: true,
        },
    ),
)

export const setTheme = (theme: string) => {
    useStore.setState({ theme })
}

// noinspection JSUnusedGlobalSymbols
export const setCardIndex = (index: number) => {
    useStore.setState({ cardIndex: index })
}

export const incrementCardIndex = () => {
    useStore.setState((state) => ({ cardIndex: state.cardIndex + 1 }))
}

// noinspection JSUnusedGlobalSymbols
export const decrementCardIndex = () => {
    useStore.setState((state) => ({ cardIndex: state.cardIndex - 1 }))
}

export const resetCardIndex = () => {
    useStore.setState({ cardIndex: 0 })
}

export const setCards = (cards: Card[]) => {
    useStore.setState({ cards })
}

// noinspection JSUnusedGlobalSymbols
export const setDeckData = (deckData: State['deckData']) => {
    useStore.setState({ deckData })
}

export const modifySelectedChapters = (
    type: keyof PickByType<State['deckData'], SelectedChapters>,
    book: keyof SelectedChapters,
    modification: (chapters: number[]) => number[],
) => {
    useStore.setState(
        modify(optic<State>().path(`deckData.${type}.${book}`))(modification),
    )
}

export const resetSelectedChapters = (
    type: keyof PickByType<State['deckData'], SelectedChapters>,
) => {
    useStore.setState(
        modify(optic<State>().path(`deckData.${type}`))(() =>
            structuredClone(emptySelectedChapters),
        ),
    )
}

export const setPrejumpStyle = (style: State['deckData']['prejumpStyle']) => {
    useStore.setState(
        modify(optic<State>().path(`deckData.prejumpStyle`))(() => style),
    )
}

export const saveDeckData = () => {
    useStore.setState({
        cachedDeckData: JSON.stringify(useStore.getState().deckData),
    })
}

export const hasDeckDataChanged = () => {
    return (
        useStore.getState().cachedDeckData !==
        JSON.stringify(useStore.getState().deckData)
    )
}

const getFullSelectedChapters = (
    chapterLengths: Map<number, number>,
): number[] => {
    return new Array(chapterLengths.size).fill(0).map((_, i) => i + 1)
}

export type PickByType<T, Value> = {
    [P in keyof T as T[P] extends Value | undefined ? P : never]: T[P]
}

export const turnOnAllChaptersForType = (
    type: keyof PickByType<State['deckData'], SelectedChapters>,
    currentChapters: (keyof SelectedChapters)[],
) => {
    const modified = {} as SelectedChapters

    for (const chapter of currentChapters) {
        switch (chapter) {
            case 'galatians':
                modified['galatians'] = getFullSelectedChapters(
                    galatiansChapterLengths,
                )
                break
            case 'ephesians':
                modified['ephesians'] = getFullSelectedChapters(
                    ephesiansChapterLengths,
                )
                break
            case 'philippians':
                modified['philippians'] = getFullSelectedChapters(
                    philippiansChapterLengths,
                )
                break
            case 'colossians':
                modified['colossians'] = getFullSelectedChapters(
                    colossiansChapterLengths,
                )
                break
            case 'philemon':
                modified['philemon'] = getFullSelectedChapters(
                    philemonChapterLengths,
                )
                break
            case 'romans':
                modified['romans'] =
                    getFullSelectedChapters(romansChapterLengths)
                break
            case 'james':
                modified['james'] = getFullSelectedChapters(jamesChapterLengths)
                break
            case 'acts':
                modified['acts'] = getFullSelectedChapters(actsChapterLengths)
                break
        }
    }

    useStore.setState(
        modify(optic<State>().path(`deckData.${type}`))(() => modified),
    )
}
