import {
    PickByType,
    resetSelectedChapters,
    SelectedChapters,
    State,
    turnOnAllChaptersForType,
    useStore,
} from '@/store'

export type TypeToggleButtonProps = {
    typeKey: keyof PickByType<State['deckData'], SelectedChapters>
}

export default function TypeToggleButton({ typeKey }: TypeToggleButtonProps) {
    const selectedChapters = useStore((state) => state.deckData)

    const target = selectedChapters[typeKey]

    const isAnySelected = Object.values(target).some(
        (value) => value.length > 0,
    )

    const toggleAll = () => {
        if (isAnySelected) {
            resetSelectedChapters(typeKey)
        } else {
            turnOnAllChaptersForType(typeKey, [
                'galatians',
                'ephesians',
                'philippians',
                'colossians',
                'philemon',
            ])
        }
    }

    return (
        <div
            onClick={toggleAll}
            className={`flex cursor-pointer select-none items-center justify-center rounded bg-lgray-700 p-[0.4em]`}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-5 w-5"
            >
                {!isAnySelected ? (
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
    )
}
