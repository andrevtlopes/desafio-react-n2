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
            { name: 'Galões',  symbol: 'gal lqd', ratio: 0.26417 },
    ]},
    meter: {
        unit: {
            name: 'Metro',
            symbol: 'm'
        },
        icon: FaRulerCombined,
        measures: [
            { name: 'Milhas', symbol: 'mi', ratio: 0.00062137 },
            { name: 'Pés', symbol: 'ft', ratio: 3.2808 },
        ]
    },
    kilo: {
        unit: {
            name: 'Quilo',
            symbol: 'kg'
        },
        icon: FaBalanceScale,
        measures: [
            { name: 'Libras', symbol: 'lb', ratio: 2.2046 },
            { name: 'Onças', symbol: 'oz', ratio: 35.274 },
        ]
    },
    celsius: {
        unit: {
            name: 'Graus Celcius',
            symbol: 'ºC'
        },
        icon: FaTemperatureHigh,
        measures: [
            { name: 'Kelvin', symbol: 'K', formula: (celsius: number) => celsius + 273.15 },
            { name: 'Fahrenheit', symbol: 'ºF', formula: (celsius: number) => (1.8 * celsius) + 32 },
        ]
    },
};

export default tabs;