import React, { useContext, useEffect, useRef, useState } from 'react';
import { StorageContext } from '../hooks/useLocalStorage';
import Measure from '../types/Measure';
import { Unit } from '../types/tabs';
import convert from '../utils/convert';
import Converted from './Converted';

type Props = {
    unit: Unit;
    measures: Measure[];
};

function Convert({ unit, measures }: Props) {
    const input = useRef<HTMLInputElement>(null);
    const [converted, setConverted] = useState<string[] | []>([]);

    const storage = useContext(StorageContext);

    const calculate = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const { current } = input;

        if (!current?.value) return;

        const fValue = parseFloat(input.current?.value || '') || 0;
        const list = storage.get(unit.name);

        list.push({
            value: fValue,
            timestamp: Date.now(),
        });

        storage.set(unit.name, list);

        const values = [];
        for (const measure of measures) {
            values.push(convert(fValue, measure));
        }
        setConverted(values);
    };

    useEffect(() => {
        const list = storage.get(unit.name);
        if (list) return;

        storage.init(unit.name, []);
    }, [storage, unit.name]);

    return (
        <div className='flex flex-col items-end gap-3'>
            <form className='form'>
                <label className='form-input'>
                    <span>
                        {unit.name} ({unit.symbol})
                    </span>
                    <input type='number' ref={input} />
                </label>
                <button type='submit' onClick={calculate} className='btn'>
                    Converter
                </button>
            </form>
            {input.current?.value && (
                <Converted
                    unit={unit}
                    measures={measures}
                    value={parseFloat(input.current?.value || '') || 0}
                    converted={converted}
                />
            )}
        </div>
    );
}

export default Convert;
