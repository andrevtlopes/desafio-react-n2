import React, { useContext, useEffect, useState } from 'react';
import { StorageContext } from '../hooks/useLocalStorage';
import Measure from '../types/Measure';
import { Unit } from '../types/tabs';
import HistoryTable from './HistoryTable';

type Props = {
    unit: Unit;
    measures: Measure[];
};

function History({ unit, measures }: Props) {
    const storage = useContext(StorageContext);
    const [list, setList] = useState([]);

    useEffect(() => {
        const list = storage.get(unit.name);
        setList(list || []);

        const setCallback = (key: string) => {
            if (key !== unit.name) return;
            const list = storage.get(unit.name);
            setList(list || []);
        };

        storage.on('set', setCallback);

        return () => {
            storage.off('set', setCallback);
        };
    }, [storage, unit.name]);

    return (
        <div className='flex flex-col items-center justify-between w-full gap-2 p-4 pt-2 text-center rounded-lg shadow-md bg-slate-300'>
            <h2 className='w-full'>Histórico</h2>
            <HistoryTable unit={unit} list={list} measures={measures} />
        </div>
    );
}

export default History;
