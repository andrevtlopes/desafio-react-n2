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
        <table className='w-full border-collapse rounded table-auto'>
            <thead className='text-white bg-slate-400'>
                <tr>
                    <td></td>
                    <td>{unit.name} ({unit.symbol})</td>
                    {measures.map((measure, idx) => (
                        <td key={idx}>{measure.name}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {list?.map((item: any, idx) => (
                    <tr key={idx} className='odd:bg-white even:bg-slate-100'>
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
        </table>
    );
}
