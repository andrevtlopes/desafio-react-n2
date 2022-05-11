const irregular: { [key: string]: string } = {
    'Graus Celcius': 'Graus Celcius'
};

const plural = (value: number, name: string, inclusive: boolean = false) => {
    if (irregular[name]) {
        return `${inclusive ? value + ' ' : ''}${irregular[name]}`;
    }
    return `${inclusive ? value + ' ' : ''}${value !== 1 ? name + 's' : name}`;
};

export default plural;