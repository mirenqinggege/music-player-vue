export type PlayerControl = {
    play: (index: number) => Promise<void>
    play1: (index: number) => Promise<void>
    stop: () => void
}