export interface DayActivity {
    day: Day;
    actions: number;
}

const
    NOW = new Date(),
    MIN_DAY: Day = new Date('2000-01-00T00:00:00.000Z') ,
    MAX_DAY: Day = new Date(NOW.getFullYear(), NOW.getMonth(), NOW.getDate());

export async function loadActivity(from: Day = MIN_DAY, to: Day = MAX_DAY): Promise<DayActivity[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            const
                day = new Date(from.getFullYear(), from.getMonth(), from.getDay() - from.getDay()),
                result = [];
            while (day < to) {
                result.push({ day: new Date(day), actions: Math.round(Math.random() * 100) });
                day.setDate(day.getDate() + 1);
            }
            resolve(result);
        });
    });
}
