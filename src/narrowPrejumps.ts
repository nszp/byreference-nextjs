export function shortenMapOfArrays(
    arrays: Map<string, [string[], string, string]>,
): Map<string, [string, string, string[]]> {
    const output = new Map<string, [string, string, string[]]>()
    arrLabel: for (const [
        quote,
        [array, , rawContentWithVerseNumbers],
    ] of arrays) {
        outer: for (let i = 1; i < array.length; i++) {
            for (const [, [target]] of arrays) {
                if (target[0] !== array[0]) continue
                if (target == array) continue
                // if (JSON.stringify(target) === JSON.stringify(array)) continue
                if (
                    JSON.stringify(target.slice(0, i)) ===
                    JSON.stringify(array.slice(0, i))
                ) {
                    continue outer
                }
            }
            output.set(quote, [
                array.slice(0, i).join(' '),
                rawContentWithVerseNumbers,
                array,
            ])
            continue arrLabel
        }
        output.set(quote, [array.join(' '), rawContentWithVerseNumbers, array])
    }
    return output
}
