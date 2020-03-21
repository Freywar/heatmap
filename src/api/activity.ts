export interface DayActivity {
    day: Date;
    actions: number;
}

const
    MIN_DATE = new Date('2000-01-00T00:00:00.000Z'),
    MAX_DATE = new Date();

export async function loadActivity(from: Date = MIN_DATE, to: Date = MAX_DATE): Promise<DayActivity[]> {
    return new Promise(resolve => {
        setTimeout(() => {
            const
                date = new Date(from.getFullYear(), from.getMonth(), from.getDate() - from.getDay()),
                result = [];
            while (date < to) {
                result.push({ day: new Date(date), actions: Math.round(Math.random() * 100) });
                date.setDate(date.getDate() + 1);
            }
            resolve(result);
        });
    });
}
