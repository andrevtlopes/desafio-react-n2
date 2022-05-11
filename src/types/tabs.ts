import Measure from './Measure';
import { FaBalanceScale, FaGlassWhiskey, FaRulerCombined, FaTemperatureHigh } from 'react-icons/fa';

export type Unit = {
    name: string;
    symbol: string;
}

export type MeasureTab = {
    unit: Unit;
    icon: any;
    measures: Measure[];
}

export interface ITabs {
    liter: MeasureTab;
    meter: MeasureTab;
    kilo: MeasureTab;
    celsius: MeasureTab;
}

const tabs: ITabs = {
    liter: {
        unit: {
            name: 'Litro',
            symbol: 'L'
        },
        icon: FaGlassWhiskey,
        measures: [
            { name: 'Onças', symbol: 'fl oz', ratio: 33.814 },
            { name: 'Galões',  symbol: 'fl oz', ratio: 0.264 },
    ]},
    meter: {
        unit: {
            name: 'Metro',
            symbol: 'm'
        },
        icon: FaRulerCombined,
        measures: [
            { name: 'Milhas', symbol: 'fl oz', ratio: 0.00062137 },
            { name: 'Pés', symbol: 'fl oz', ratio: 3.2808 },
        ]
    },
    kilo: {
        unit: {
            name: 'Quilo',
            symbol: 'Kg'
        },
        icon: FaBalanceScale,
        measures: [
            { name: 'Libras', symbol: 'fl oz', ratio: 2.2046 },
            { name: 'Onças', symbol: 'fl oz', ratio: 35.274 },
        ]
    },
    celsius: {
        unit: {
            name: 'Graus Celcius',
            symbol: 'ºC'
        },
        icon: FaTemperatureHigh,
        measures: [
            { name: 'Kelvin', symbol: 'fl oz', formula: (celsius: number) => celsius + 273 },
            { name: 'Fahrenheit', symbol: 'fl oz', formula: (celsius: number) => (1.8 * celsius) + 32 },
        ]
    },
};

export default tabs;