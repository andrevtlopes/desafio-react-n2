import Measure from '../types/Measure';

const convert = (value: number, measure: Measure, fixed: number = 4) => {
    if (measure.ratio) {
        return (value * measure.ratio).toFixed(fixed);
    }
    if (measure.formula) {
        return parseFloat(measure.formula(value)).toFixed(fixed);
    }
    return 'Error';
};

export default convert;