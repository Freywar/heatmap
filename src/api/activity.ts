export interface DayActivity {
    day: Day;
    actions: number;
}

const
    NOW = new Date(),
    MIN_DAY: Day = new Date('2000-01-00T00:00:00.000Z'),
    MAX_DAY: Day = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate()),
    cache: {[k: number]: number} = {};

export async function loadActivity(from: Day = MIN_DAY, to: Day = MAX_DAY): Promise<DayActivity[]> {
    return new Promise((resolve) => {
        setTimeout(() => {
            const
                current = new Date(from.getFullYear(), from.getMonth(), from.getDay() - from.getDay()),
                result = [];
            while (current < to) {
                const actions = cache[+current] !== undefined ?
                    cache[+current] :
                    (cache[+current] = Math.round(Math.random() * Math.random() * Math.random() * 100));
                result.push({ day: new Date(current), actions });
                current.setDate(current.getDate() + 1);
            }
            resolve(result);
        });
    });
}
