import Button from '@/components/Button'
import Modal from '@/components/Modal'

export type ResetModalProps = {
    open: boolean
    setOpen: (open: boolean) => void
    onReset: () => void
}

export default function ResetModal({
    open,
    setOpen,
    onReset,
}: ResetModalProps) {
    return (
        <Modal open={open} setOpen={setOpen}>
            <h1 className="text-3xl font-bold">Are you sure?</h1>
            <p className="mt-4">
                You're more than 10% done with the current deck. Do you want to
                reset your progress?
            </p>
            <div className="mt-4 grid grid-cols-2 grid-rows-1 gap-4">
                <Button
                    white={true}
                    onClick={() => {
                        setOpen(false)
                    }}
                >
                    <div className="flex h-full items-center justify-center px-4 py-2 text-center font-bold">
                        No, Close
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
                        Yes, Reset
                    </div>
                </Button>
            </div>
        </Modal>
    )
}
