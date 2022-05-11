import useLocalStorage, { StorageContext } from '../hooks/useLocalStorage';
import { MeasureTab } from '../types/tabs';
import Convert from './Convert';
import History from './History';

type Props = {
    value: MeasureTab;
};

export default function TabPanel({ value }: Props) {
    const storage = useLocalStorage('local');

    return (
        <StorageContext.Provider value={storage}>
            <div className='tab-panel'>
                <Convert unit={value.unit} measures={value.measures} />
                <History unit={value.unit} measures={value.measures} />
            </div>
        </StorageContext.Provider>
    );
}
