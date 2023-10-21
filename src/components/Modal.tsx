import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useStore } from '@/store'

export type ModalProps = {
    children: React.ReactNode
    open: boolean
    setOpen: (open: boolean) => void
}

export default function Modal({ children, open, setOpen }: ModalProps) {
    const theme = useStore((state) => state.theme)

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-visible"
                onClose={setOpen}
            >
                <div
                    className={`flex h-screen items-center justify-center overflow-visible px-4 py-12 pt-4 text-center theme-${theme}`}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-lgray-800 bg-opacity-90 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:h-screen sm:align-middle"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="gradient-background relative inline-block max-h-[75%] w-full max-w-md transform overflow-y-auto overflow-x-hidden rounded p-[0.2rem] align-middle shadow-xl transition-all">
                            <div
                                className="absolute right-5 top-5 z-10 text-white"
                                onClick={() => setOpen(false)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="h-10 w-10"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </div>
                            <div className="relative h-full w-full overflow-y-auto overflow-x-hidden rounded-sm bg-lgray-750 px-4 pb-4 pt-5 text-left text-white">
                                {children}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
