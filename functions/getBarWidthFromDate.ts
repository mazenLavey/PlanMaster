

export const getBarWidthFromDate = (startDate: string, endDate: string): number => {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    const now = new Date().getTime() - start;

    if(end - start > 0) {
        const barWidth = (now / Math.abs(end - start))*100;
        return barWidth;
    } else if(end - start === 0) {
        return 100;
    } else {
        return 0;
    }
};
