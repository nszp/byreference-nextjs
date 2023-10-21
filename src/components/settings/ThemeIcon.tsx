import { setTheme, useStore } from '@/store'

export type ThemeIconProps = {
    theme: string
}

export default function ThemeIcon({ theme }: ThemeIconProps) {
    const currentTheme = useStore((state) => state.theme)
    const isCurrentTheme = currentTheme === theme

    const onClick = () => {
        setTheme(theme)
    }

    return (
        <div
            onClick={onClick}
            className={`h-8 w-8 cursor-pointer select-none rounded ${
                isCurrentTheme
                    ? 'border-2 border-white'
                    : 'border border-gray-300'
            } gradient-background-${theme} flex items-center justify-center bg-lgray-700`}
        ></div>
    )
}
