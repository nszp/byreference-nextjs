import { SelectedChapters } from '@/store'
import { Card } from '@/components/Deck'
import {
    actsQuotesRaw,
    actsReferences,
    bookLengths,
    colossiansQuotesRaw,
    colossiansReferences,
    ephesiansQuotesRaw,
    ephesiansReferences,
    galatiansQuotesRaw,
    galatiansReferences,
    jamesQuotesRaw,
    jamesReferences,
    philemonQuotesRaw,
    philemonReferences,
    philippiansQuotesRaw,
    philippiansReferences,
    romansQuotesRaw,
    romansReferences,
} from '@/contentConstants'
import { v4 as uuidv4 } from 'uuid'
import NIV from '@/content'
import { shortenMapOfArrays } from '@/narrowPrejumps'

function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

let bookMap = compileChapterReferences()

export function randomizeDeck(deck: Card[]): Card[] {
    const output = [...deck].map((card) => ({ ...card, uuid: uuidv4() }))

    // Durstenfeld shuffle
    for (let i = output.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[output[i], output[j]] = [output[j], output[i]]
    }

    return output
}

export function compileDeck(selectedChapters: {
    references: SelectedChapters
    quotes: SelectedChapters
    prejumps: SelectedChapters
    prejumpStyle: 'full' | 'combined'
}): Card[] {
    let output: Card[] = []

    for (const [book, selectedBookChapters] of Object.entries(
        selectedChapters.references,
    )) {
        for (const chapter of selectedBookChapters) {
            const chapterReferences = bookMap.get(book)?.get(chapter)
                ?.references

            if (chapterReferences) {
                for (const reference of chapterReferences) {
                    output.push({
                        uuid: '',
                        verse: `${capitalize(book)} ${reference}`,
                        content:
                            NIV[capitalize(book)]?.[chapter.toString()]?.[
                                reference.split(':')[1]
                            ] +
                                `<br/><strong>${capitalize(
                                    book,
                                )} ${reference}</strong>` ??
                            'Content not found',
                    })
                }
            }
        }
    }

    for (const [book, selectedBookChapters] of Object.entries(
        selectedChapters.quotes,
    )) {
        for (const chapter of selectedBookChapters) {
            const chapterQuotes = bookMap.get(book)?.get(chapter)?.quotes

            if (chapterQuotes) {
                for (const quote of chapterQuotes) {
                    let content =
                        NIV[capitalize(book)]?.[chapter.toString()]?.[
                            quote.split(':')[1]
                        ] +
                            `<br/><strong>${capitalize(
                                book,
                            )} ${quote}</strong>` ?? 'Content not found'

                    if (quote.includes('-')) {
                        const [start, end] = quote.split(':')[1].split('-')

                        const startVerse = parseInt(start)
                        const endVerse = parseInt(end)

                        let verses = []
                        for (let i = startVerse; i <= endVerse; i++) {
                            verses.push(i)
                        }
                        content =
                            verses
                                .map(
                                    (verse) =>
                                        ` <b>${verse}</b> ` +
                                        (NIV[capitalize(book)]?.[
                                            chapter.toString()
                                        ]?.[verse.toString()].trim() ??
                                            'Content not found'),
                                )
                                .join(' ')
                                .trim() +
                            `<br/><strong>${capitalize(book)} ${quote}</strong>`
                    }

                    output.push({
                        uuid: '',
                        verse: `Quote ${capitalize(book)} ${quote}`,
                        content,
                    })
                }
            }
        }
    }

    // quote reference to [words, rawContent, contentWithVerseNumbers]
    const wordMap = new Map<string, [string[], string, string]>()

    for (const [book, selectedBookChapters] of Object.entries(
        selectedChapters.prejumps,
    )) {
        // quote reference to [rawContent, contentWithVerseNumbers]
        const contents: Map<string, [string, string]> = new Map()

        for (const chapter of selectedBookChapters) {
            const chapterQuotes = bookMap.get(book)?.get(chapter)?.quotes ?? []

            if (chapterQuotes) {
                for (const quote of chapterQuotes) {
                    let content =
                        NIV[capitalize(book)]?.[chapter.toString()]?.[
                            quote.split(':')[1]
                        ] +
                            `<br/><strong>${capitalize(
                                book,
                            )} ${quote}</strong>` ?? 'Content not found'

                    let contentWithVerseNumbers = content

                    if (quote.includes('-')) {
                        const [start, end] = quote.split(':')[1].split('-')

                        const startVerse = parseInt(start)
                        const endVerse = parseInt(end)

                        let verses = []
                        for (let i = startVerse; i <= endVerse; i++) {
                            verses.push(i)
                        }

                        content =
                            verses
                                .map(
                                    (verse) =>
                                        NIV[capitalize(book)]?.[
                                            chapter.toString()
                                        ]?.[verse.toString()].trim() ??
                                        'Content not found',
                                )
                                .join(' ')
                                .trim() +
                            `<br/><strong>${capitalize(book)} ${quote}</strong>`

                        contentWithVerseNumbers =
                            verses
                                .map(
                                    (verse) =>
                                        ` <b>${verse}</b> ` +
                                        (NIV[capitalize(book)]?.[
                                            chapter.toString()
                                        ]?.[verse.toString()].trim() ??
                                            'Content not found'),
                                )
                                .join(' ')
                                .trim() +
                            `<br/><strong>${capitalize(book)} ${quote}</strong>`
                    }

                    contents.set(quote, [content, contentWithVerseNumbers])
                }
            }
        }

        for (const [quote, [rawContent, contentWithVerseNumbers]] of contents) {
            const words = rawContent
                .split('<br/>')[0]
                .match(/\b(\w+)['’]?(\w+)?\b/g)
                ?.slice(0)
            if (!words) {
                console.log(rawContent, quote, 'no words error')
                continue
            }
            wordMap.set(quote, [words, rawContent, contentWithVerseNumbers])
        }
    }

    if (wordMap.size !== 0) {

        // Map<quote, [prejump: string, content: string, words: string[]]>
        const singlePrejumps = shortenMapOfArrays(
            new Map([...wordMap].filter(([key]) => !key.includes('-'))),
        )
        // Map<quote, [prejump: string, content: string, words: string[]]>
        const multiplePrejumps = shortenMapOfArrays(
            new Map([...wordMap].filter(([key]) => key.includes('-'))),
        )

        if (selectedChapters.prejumpStyle === 'full') {
            for (const [prejump, content] of singlePrejumps.values()) {
                output.push({
                    uuid: '',
                    verse: `Finish this verse:<br/> ${prejump}`,
                    content: content,
                })
            }

            for (const [prejump, content] of multiplePrejumps.values()) {
                output.push({
                    uuid: '',
                    verse: `Finish these verses:<br/> ${prejump}`,
                    content: content,
                })
            }
        } else if (selectedChapters.prejumpStyle === 'combined') {
            // Map<firstWord, [quote: string, prejump: string, content: string, words: string[]]>
            const groupedSinglePrejumps = new Map<
                string,
                [string, string, string, string[]][]
            >()
            for (const [quote, [prejump, content, words]] of singlePrejumps) {
                const list = [
                    ...(groupedSinglePrejumps.get(words[0]) ?? []),
                    [quote, prejump, content, words],
                ]
                // @ts-ignore
                groupedSinglePrejumps.set(words[0], list)
            }

            // Map<firstWord, [quote: string, prejump: string, content: string, words: string[]]>
            const groupedMultiplePrejumps = new Map<
                string,
                [string, string, string, string[]][]
            >()
            for (const [quote, [prejump, content, words]] of multiplePrejumps) {
                const list = [
                    ...(groupedMultiplePrejumps.get(words[0]) ?? []),
                    [quote, prejump, content, words],
                ]
                // @ts-ignore
                groupedMultiplePrejumps.set(words[0], list)
            }

            for (const [firstWord, singleVerses] of groupedSinglePrejumps) {
                let cardContent = ''
                for (const [, prejump, verseContent] of singleVerses) {
                    cardContent += `${prejump} ${
                        verseContent.split('<br/>')[1]
                    }<br/>`
                }

                // remove last <br/>
                cardContent = cardContent.slice(0, -5)

                output.push({
                    uuid: '',
                    verse: `Finish this verse:<br/> ${firstWord}`,
                    content: cardContent,
                })
            }

            for (const [firstWord, multipleVerses] of groupedMultiplePrejumps) {
                let cardContent = ''
                for (const [, prejump, verseContent] of multipleVerses) {
                    cardContent += `${prejump} ${
                        verseContent.split('<br/>')[1]
                    }<br/>`
                }

                // remove last <br/>
                cardContent = cardContent.slice(0, -5)

                output.push({
                    uuid: '',
                    verse: `Finish these verses:<br/> ${firstWord}`,
                    content: cardContent,
                })
            }
        }
    }

    // console.log('prejumps', prejumps)

    return randomizeDeck(output)
}

function compileChapterReferences(): Map<
    string,
    Map<number, { references: string[]; quotes: string[] }>
> {
    const bookMap = new Map<
        string,
        Map<number, { references: string[]; quotes: string[] }>
    >()

    for (const [book, chapterLength] of Object.entries(bookLengths)) {
        const chapterMap = new Map<
            number,
            { references: string[]; quotes: string[] }
        >()

        let references: string[] = []
        let quotes: string[] = []

        if (book === 'romans') {
            references = romansReferences
            quotes = romansQuotesRaw
        } else if (book === 'james') {
            references = jamesReferences
            quotes = jamesQuotesRaw
        } else if (book === 'acts') {
            references = actsReferences
            quotes = actsQuotesRaw
        } else if (book === 'galatians') {
            references = galatiansReferences
            quotes = galatiansQuotesRaw
        } else if (book === 'ephesians') {
            references = ephesiansReferences
            quotes = ephesiansQuotesRaw
        } else if (book === 'philippians') {
            references = philippiansReferences
            quotes = philippiansQuotesRaw
        } else if (book === 'colossians') {
            references = colossiansReferences
            quotes = colossiansQuotesRaw
        } else if (book === 'philemon') {
            references = philemonReferences
            quotes = philemonQuotesRaw
        } else {
            references = []
        }

        for (let i = 1; i <= chapterLength; i++) {
            const chapterReferences = references.filter((reference) =>
                reference.startsWith(`${i}:`),
            )
            const chapterQuotes = quotes
                .filter((quote) => quote.startsWith(`${i}:`))
                .map((quote) => quote.replace('q', ''))
            chapterMap.set(i, {
                references: chapterReferences,
                quotes: chapterQuotes,
            })
        }

        bookMap.set(book, chapterMap)
    }

    return bookMap
}
