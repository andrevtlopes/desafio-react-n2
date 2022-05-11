import Measure from '../types/Measure';
import { Unit } from '../types/tabs';
import convert from '../utils/convert';

type Props = {
    unit: Unit;
    list: any[];
    measures: Measure[];
};

export default function HistoryTable({ unit, list, measures }: Props) {
    return (
        list.length ? <table className='history-table'>
            <thead>
                <tr>
                    <td></td>
                    <td>{unit.name} ({unit.symbol})</td>
                    {measures.map((measure, idx) => (
                        <td key={idx}>{measure.name} ({measure.symbol})</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {list?.map((item: any, idx) => (
                    <tr key={idx}>
                        <td className='w-52'>
                            {new Date(item.timestamp).toLocaleString()}
                        </td>
                        <td>{item.value}</td>
                        {measures.map((measure, idx) => (
                            <td key={idx}>
                                {convert(item.value, measure)}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table> : <span className='p-1 text-sm rounded bg-slate-100'>Não há histórico ainda...</span>
    );
}
