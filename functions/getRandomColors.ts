

const getRandomColors = (): string[]=>{
    const colorValues: string[] = [];
    for(let i= 0; i < 3; i++) {
        const x: string = (Math.floor(Math.random() * 255)).toString();
        colorValues.push(x); 
    }
    
    const firstColor: string = `rgba(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]}, 0.8)`;
    const secondColor: string = `rgba(${colorValues[0]}, ${colorValues[1]}, ${colorValues[2]}, 0.4)`;
    const colors: string[] = [firstColor, secondColor];
    return colors;
}

export default getRandomColors;