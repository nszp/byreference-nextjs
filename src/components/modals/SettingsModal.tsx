import Button from '@/components/Button'
import Modal from '@/components/Modal'
import BookDropdown from '@/components/settings/BookDropdown'
import { bookLengths } from '@/contentConstants'
import TypeToggleButton from '@/components/settings/TypeToggleButton'
import PrejumpSettings from '@/components/settings/PrejumpSettings'
import ThemeIcon from '@/components/settings/ThemeIcon'

export type SettingsModalProps = {
    open: boolean
    setOpen: (open: boolean) => void
    onReset: () => void
}

export default function SettingsModal({
    open,
    setOpen,
    onReset,
}: SettingsModalProps) {
    return (
        <Modal open={open} setOpen={setOpen}>
            <h1 className="text-3xl font-bold">Settings</h1>
            <h3 className="mt-4 text-xl font-bold">References</h3>
            <div className="mt-2 flex w-full flex-wrap gap-2 rounded bg-lgray-900 p-2">
                <BookDropdown
                    bookName="Galatians"
                    chaptersLength={bookLengths.galatians}
                    typeKey="references"
                    bookKey="galatians"
                />
                <BookDropdown
                    bookName="Ephesians"
                    chaptersLength={bookLengths.ephesians}
                    typeKey="references"
                    bookKey="ephesians"
                />
                <BookDropdown
                    bookName="Philippians"
                    chaptersLength={bookLengths.philippians}
                    typeKey="references"
                    bookKey="philippians"
                />
                <BookDropdown
                    bookName="Colossians"
                    chaptersLength={bookLengths.colossians}
                    typeKey="references"
                    bookKey="colossians"
                />
                <BookDropdown
                    bookName="Philemon"
                    chaptersLength={bookLengths.philemon}
                    typeKey="references"
                    bookKey="philemon"
                />
                <TypeToggleButton typeKey="references" />
            </div>
            <h3 className="mt-2 text-xl font-bold">Quotes</h3>
            <div className="mt-2 flex w-full flex-wrap gap-2 rounded bg-lgray-900 p-2">
                <BookDropdown
                    bookName="Galatians"
                    chaptersLength={bookLengths.galatians}
                    typeKey="quotes"
                    bookKey="galatians"
                />
                <BookDropdown
                    bookName="Ephesians"
                    chaptersLength={bookLengths.ephesians}
                    typeKey="quotes"
                    bookKey="ephesians"
                />
                <BookDropdown
                    bookName="Philippians"
                    chaptersLength={bookLengths.philippians}
                    typeKey="quotes"
                    bookKey="philippians"
                />
                <BookDropdown
                    bookName="Colossians"
                    chaptersLength={bookLengths.colossians}
                    typeKey="quotes"
                    bookKey="colossians"
                />
                <BookDropdown
                    bookName="Philemon"
                    chaptersLength={bookLengths.philemon}
                    typeKey="quotes"
                    bookKey="philemon"
                />
                <TypeToggleButton typeKey="quotes" />
            </div>
            <h3 className="mt-2 text-xl font-bold">Prejumps</h3>
            <div className="mt-2 flex w-full flex-wrap gap-2 overflow-y-visible rounded bg-lgray-900 p-2">
                <BookDropdown
                    bookName="Galatians"
                    chaptersLength={bookLengths.galatians}
                    typeKey="prejumps"
                    bookKey="galatians"
                />
                <BookDropdown
                    bookName="Ephesians"
                    chaptersLength={bookLengths.ephesians}
                    typeKey="prejumps"
                    bookKey="ephesians"
                />
                <BookDropdown
                    bookName="Philippians"
                    chaptersLength={bookLengths.philippians}
                    typeKey="prejumps"
                    bookKey="philippians"
                />
                <BookDropdown
                    bookName="Colossians"
                    chaptersLength={bookLengths.colossians}
                    typeKey="prejumps"
                    bookKey="colossians"
                />
                <BookDropdown
                    bookName="Philemon"
                    chaptersLength={bookLengths.philemon}
                    typeKey="prejumps"
                    bookKey="philemon"
                />
                <TypeToggleButton typeKey="prejumps" />
            </div>
            <h3 className="my-2 text-xl font-bold">Prejump Settings</h3>
            <PrejumpSettings />
            <h3 className="mt-2 text-xl font-bold">Theme</h3>
            <div className="mt-2 flex w-full flex-wrap gap-2 rounded bg-lgray-900 p-2">
                <ThemeIcon theme="sublime" />
                <ThemeIcon theme="hyper" />
                <ThemeIcon theme="oceanic" />
                <ThemeIcon theme="cotton-candy" />
                <ThemeIcon theme="sunset" />
                <ThemeIcon theme="beachside" />
                <ThemeIcon theme="peachy" />
                <ThemeIcon theme="seafoam" />
                <ThemeIcon theme="pandora" />
                <ThemeIcon theme="bombpop" />
                <ThemeIcon theme="huckleberry" />
                <ThemeIcon theme="paradise" />
                <ThemeIcon theme="sierra-mist" />
                <ThemeIcon theme="strawberry" />
                <ThemeIcon theme="big-sur" />
                <ThemeIcon theme="island-waves" />
                <ThemeIcon theme="hunniepop" />
                <ThemeIcon theme="blue-coral" />
                <ThemeIcon theme="orange-coral" />
                <ThemeIcon theme="pink-neon" />
            </div>
            <div className="mt-4 grid grid-cols-2 grid-rows-1 gap-4">
                <Button
                    white={true}
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    <div className="flex h-full items-center justify-center px-4 py-2 text-center font-bold">
                        Close
                    </div>
                </Button>
                <Button
                    white={true}
                    onClick={() => {
                        onReset()
                        setOpen(false)
                    }}
                >
                    <div className="flex h-full items-center justify-center px-4 py-2 text-center font-bold">
                        Save & Restart
                    </div>
                </Button>
            </div>
        </Modal>
    )
}
