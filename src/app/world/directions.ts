export enum Directions {
    North = 0,
    South,
    East,
    West
}

export const INVERSION_MAP: Directions[] =
    [Directions.South, Directions.North, Directions.West, Directions.East];
