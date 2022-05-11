import React, { useContext, useEffect, useRef, useState } from 'react';
import { StorageContext } from '../hooks/useLocalStorage';
import Measure from '../types/Measure';
import { Unit } from '../types/tabs';
import convert from '../utils/convert';
import plural from '../utils/plural';

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
    }, []);

    return (
        <div className='flex items-end gap-3'>
            <form className='flex items-end gap-4'>
                <label className='form'>
                    <span>{unit.name} ({unit.symbol})</span>
                    <input type='number' ref={input} />
                </label>
                <button type='submit' onClick={calculate} className='btn'>
                    Converter
                </button>
            </form>
            <div className='flex justify-around w-full'>
                {input.current?.value && (
                    <>
                        <span>
                            {plural(
                                parseFloat(input.current?.value || '0'),
                                unit.name,
                                true
                            )} {' '}
                            ({unit.symbol})
                        </span>
                        <span>≈</span>
                        {converted
                            .map<React.ReactNode>((c, idx) => (
                                <span key={idx}>
                                    {c ?? 0} {measures?.[idx]?.name} {' '}
                                    ({measures?.[idx]?.symbol})
                                </span>
                            ))
                            .reduce((prev, curr) => [prev, '≈', curr])}
                    </>
                )}
            </div>
        </div>
    );
}

export default Convert;
