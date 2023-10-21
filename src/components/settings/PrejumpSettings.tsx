import { setPrejumpStyle, State, useStore } from '@/store'
import { RadioGroup } from '@headlessui/react'

type Option = {
    prejumpStyle: State['deckData']['prejumpStyle']
    name: string
    description: string
}

const options: Option[] = [
    {
        prejumpStyle: 'combined',
        name: 'Combined',
        description:
            'Show one card for each unique starting word in your selected range of quotes. (like old By Reference)',
    },
    {
        prejumpStyle: 'full',
        name: 'Full',
        description:
            'Show one card with the unique prejump for each quote in your selected range.',
    },
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function PrejumpSettings() {
    const prejumpStyle = useStore((state) => state.deckData.prejumpStyle)

    const selected = options.find(
        (option) => option.prejumpStyle === prejumpStyle,
    )
    const setSelected = (option: Option) => {
        setPrejumpStyle(option.prejumpStyle)
    }

    return (
        <RadioGroup value={selected} onChange={setSelected}>
            <RadioGroup.Label className="sr-only">
                Prejump style
            </RadioGroup.Label>
            <div className="-space-y-px rounded-md bg-lgray-900">
                {options.map((option, settingIdx) => (
                    <RadioGroup.Option
                        key={option.name}
                        value={option}
                        className={({ checked }) =>
                            classNames(
                                settingIdx === 0
                                    ? 'rounded-tl-md rounded-tr-md'
                                    : '',
                                settingIdx === options.length - 1
                                    ? 'rounded-bl-md rounded-br-md'
                                    : '',
                                checked ? 'z-10 bg-lgray-700' : 'bg-lgray-900',
                                'relative flex cursor-pointer border p-4 transition-colors focus:outline-none',
                            )
                        }
                    >
                        {({ checked }) => (
                            <>
                                <span
                                    className={classNames(
                                        checked
                                            ? 'gradient-background'
                                            : 'bg-lgray-700',
                                        'mt-0.5 flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border transition-colors',
                                    )}
                                    aria-hidden="true"
                                >
                                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                </span>
                                <div className="ml-3 flex flex-col">
                                    <RadioGroup.Label
                                        as="span"
                                        className={classNames(
                                            // checked
                                            //     ? 'text-indigo-900'
                                            //     : 'text-gray-900',
                                            'block text-sm font-semibold text-white',
                                        )}
                                    >
                                        {option.name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                        as="span"
                                        className={classNames(
                                            'block text-sm text-gray-300',
                                        )}
                                    >
                                        {option.description}
                                    </RadioGroup.Description>
                                </div>
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    )
}
