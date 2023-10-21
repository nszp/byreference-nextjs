import { Popover, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {
    modifySelectedChapters,
    PickByType,
    SelectedChapters,
    State,
    useStore,
} from '@/store'

export type BookDropdownProps = {
    bookName: string
    chaptersLength: number
    typeKey: keyof PickByType<State['deckData'], SelectedChapters>
    bookKey: keyof PickByType<
        State['deckData'],
        SelectedChapters
    >[keyof PickByType<State['deckData'], SelectedChapters>]
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function BookDropdown({
    bookName,
    chaptersLength,
    typeKey,
    bookKey,
}: BookDropdownProps) {
    const selectedChapters = useStore(
        (state) => state.deckData[typeKey][bookKey],
    )

    const isAnyChapterSelected = () => {
        return selectedChapters.length !== 0
    }

    const isAllChaptersSelected = () => {
        return selectedChapters.length === chaptersLength
    }

    const toggleChapter = (chapter: number) => {
        modifySelectedChapters(typeKey, bookKey, (oldSelectedChapters) => {
            if (oldSelectedChapters.includes(chapter)) {
                return oldSelectedChapters.filter((c) => c !== chapter)
            } else {
                return [...oldSelectedChapters, chapter]
            }
        })
    }

    const toggleAllChapters = () => {
        modifySelectedChapters(typeKey, bookKey, (oldSelectedChapters) => {
            if (oldSelectedChapters.length > 0) {
                return []
            } else {
                return new Array(chaptersLength)
                    .fill(0)
                    .map((_, index) => index + 1)
            }
        })
    }

    return (
        <Popover
            as="div"
            className="relative inline-block overflow-visible text-left"
        >
            {({ open }) => (
                <>
                    <svg width="0" height="0">
                        <defs>
                            <linearGradient
                                id="gradient"
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="0%"
                            >
                                {/*<stop offset="0%" style={{ stopColor: '#fb7185', stopOpacity: 1 }} />*/}
                                {/*<stop offset="0%" style={{ stopColor: '#d946ef', stopOpacity: 1 }} />*/}
                                <stop
                                    offset="0%"
                                    style={{
                                        stopColor: '#6366f1',
                                        stopOpacity: 1,
                                    }}
                                />
                                {/*<stop offset="50%" style={{ stopColor: '#d946ef', stopOpacity: 1 }} />*/}
                                {/*<stop offset="1000%" style={{ stopColor: '#fb7185', stopOpacity: 1 }} />*/}
                                <stop
                                    offset="100%"
                                    style={{
                                        stopColor: '#4338ca',
                                        stopOpacity: 1,
                                    }}
                                />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div>
                        <Popover.Button
                            className={classNames(
                                'relative z-[10] inline-flex w-full justify-center gap-x-1.5 rounded bg-lgray-700 px-3 py-[0.5em] text-sm font-semibold text-white transition-all transition-colors',
                                open ? 'rounded-b-none' : '',
                                // open ? 'text-white' : 'text-gray-300'
                            )}
                        >
                            <span
                                className={`bg-clip-text text-transparent ${
                                    isAnyChapterSelected()
                                        ? 'gradient-text'
                                        : 'bg-white'
                                }`}
                            >
                                {bookName}
                            </span>
                            <span className={open ? 'white' : 'text-gray-400'}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke={
                                        // isAnyChapterSelected()
                                        //     ? 'url(#gradient)'
                                        //     : 'currentColor'
                                        'currentColor'
                                    }
                                    className="h-54 -mr-1 w-5 transition-colors"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </span>
                        </Popover.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <div className="relative z-[15] flex">
                            <Popover.Panel className="absolute left-0 z-[100] w-[11.2rem] origin-top-left overflow-hidden rounded rounded-tl-none bg-lgray-700 py-[1px] shadow-lg focus:outline-none">
                                <div className="gradient-background-opacity z-[105] flex h-full w-full flex-wrap rounded rounded-tl-none">
                                    {/* Actual chapters */}
                                    {Array.from(
                                        Array(chaptersLength).keys(),
                                    ).map((chapter) => (
                                        <div
                                            key={chapter + 1}
                                            onClick={() => {
                                                toggleChapter(chapter + 1)
                                            }}
                                            className={`relative z-[130] flex h-[2.8rem] w-[2.8rem] cursor-pointer
                                                select-none items-center justify-center text-sm font-semibold text-white transition-colors
                                                `}
                                        >
                                            <div
                                                className={`absolute inset-0 z-[120] transition-colors ${
                                                    selectedChapters.includes(
                                                        chapter + 1,
                                                    )
                                                        ? 'bg-transparent'
                                                        : 'bg-lgray-700'
                                                }`}
                                            />
                                            <div className="absolute inset-0 z-[140] flex items-center justify-center text-sm font-semibold text-white">
                                                {chapter + 1}
                                            </div>
                                        </div>
                                    ))}
                                    <div
                                        onClick={toggleAllChapters}
                                        className={`relative z-[130] flex h-[2.8rem] w-[2.8rem] cursor-pointer
                                                select-none items-center justify-center text-sm font-semibold text-white transition-colors
                                                `}
                                    >
                                        <div
                                            className={`absolute inset-0 z-[120] transition-colors ${
                                                isAllChaptersSelected()
                                                    ? 'bg-transparent'
                                                    : 'bg-lgray-700'
                                            }`}
                                        />
                                        <div className="absolute inset-0 z-[140] flex items-center justify-center text-sm font-semibold text-white">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="h-5 w-5"
                                            >
                                                {!isAnyChapterSelected() ? (
                                                    <>
                                                        {/* plus */}
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 4.5v15m7.5-7.5h-15"
                                                        />
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* x */}
                                                        {/*<path*/}
                                                        {/*    strokeLinecap="round"*/}
                                                        {/*    strokeLinejoin="round"*/}
                                                        {/*    d="M6 18L18 6M6 6l12 12"*/}
                                                        {/*/>*/}
                                                        {/* - */}
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M19.5 12h-15"
                                                        />
                                                    </>
                                                )}
                                            </svg>
                                        </div>
                                    </div>
                                    {/* Box to fill remaining row space */}
                                    <div className="flex-grow bg-lgray-700" />
                                </div>
                            </Popover.Panel>
                        </div>
                    </Transition>
                </>
            )}
        </Popover>
    )
}
