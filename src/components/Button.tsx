import { motion } from 'framer-motion'
import React from 'react'

export type ButtonProps = {
    children: React.ReactNode
    className?: string
    borderClassName?: string
    white?: boolean
    disabled?: boolean
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

export default function Button({
    children,
    className = '',
    borderClassName = '',
    white = false,
    disabled = false,
    onClick = () => {},
}: ButtonProps) {
    return (
        <motion.div
            whileHover={disabled ? {} : { scale: 0.9 }}
            transition={{ type: 'spring', bounce: 0.1, duration: 0.3 }}
            onClick={(e) => {
                console.log('button clicked')
                onClick(e)
            }}
            className={
                `${
                    white
                        ? 'gradient-background-white'
                        : disabled
                        ? 'gradient-background-gray'
                        : 'gradient-background'
                } cursor-pointer select-none rounded p-[0.2rem] transition-colors ` +
                borderClassName
            }
        >
            <div
                className={
                    'h-full w-full rounded-sm bg-lgray-750 text-white ' +
                    className
                }
            >
                {children}
            </div>
        </motion.div>
    )
}
