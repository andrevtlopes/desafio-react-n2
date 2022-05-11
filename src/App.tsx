import Container from './components/Container';
import Convert from './components/Convert';
import Header from './components/Header';
import History from './components/History';
import useLocalStorage, { StorageContext } from './hooks/useLocalStorage';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import tabs from './types/tabs';

function App() {
    const storage = useLocalStorage('local');

    return (
        <div className='h-full min-h-screen bg-slate-500 align-center'>
            <Header title='Ferramenta de Conversão de Unidades de Medida' />
            <Container>
                <Tabs>
                    <TabList className='flex justify-center'>
                        {Object.values(tabs).map((tab, idx) => (
                            <Tab
                                key={idx}
                                className='tab'
                                selectedClassName='tab-active'
                            >
                                <tab.icon></tab.icon>
                                {tab.unit.name}
                            </Tab>
                        ))}
                    </TabList>
                    {Object.values(tabs).map((tab, idx) => (
                        <TabPanel key={idx}>
                            <StorageContext.Provider value={storage}>
                                <Convert
                                    unit={tab.unit}
                                    measures={tab.measures}
                                />
                                <History
                                    unit={tab.unit}
                                    measures={tab.measures}
                                />
                            </StorageContext.Provider>
                        </TabPanel>
                    ))}
                </Tabs>
            </Container>
        </div>
    );
}

export default App;
