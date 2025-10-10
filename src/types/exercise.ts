
/* Exercise (singular) */
export interface Exercise {
    id: number,
    name: string,
    targets: string[],
    intensity: string,
    expertise: string,
    image: string,
    demo: string,
    recommendedCount: number,
    recommendedSets: number,
    recommendedDuration: number,
    custom: boolean
};