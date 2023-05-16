

const useDaysFromDates = (firstDate: string, secondDate:string): number => {
    const date01 = new Date(firstDate);
    const date02 = new Date(secondDate);
    const diffTime = Math.abs(date02.getTime() - date01.getTime());
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return days;
};

export default useDaysFromDates;