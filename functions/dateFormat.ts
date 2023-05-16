

const useDateFormat = (timestemp: string | number = ""): string => {

    if(timestemp) {
        const date: string = new Date(timestemp).toISOString().split("T")[0];
        return date;
    } else {
        const date: string = new Date().toISOString().split("T")[0];
        return date;
    }
}

export default useDateFormat;