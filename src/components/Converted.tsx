import React from 'react';
import plural from '../utils/plural';
import { Unit } from '../types/tabs';
import Measure from '../types/Measure';

type Props = {
    unit: Unit;
    measures: Measure[];
    value: number;
    converted: string[];
};

export default function Converted({ unit, measures, value, converted }: Props) {
  return (
    <div className='flex items-center justify-around w-full gap-6'>
                <span className='tag'>
                    {plural(
                        value,
                        unit.name,
                        true
                    )} {' '}
                    ({unit.symbol})
                </span>
                <span>≈</span>
                {converted
                    .map<React.ReactNode>((c, idx) => (
                        <span key={idx} className='tag'>
                            {c ?? 0} {measures?.[idx]?.name} {' '}
                            ({measures?.[idx]?.symbol})
                        </span>
                    ))
                    .reduce((prev, curr) => [prev, <span>≈</span>, curr])}
    </div>
  )
}