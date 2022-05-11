import Container from './components/Container';
import Header from './components/Header';
import { Outlet } from 'react-router-dom';
import tabs from './types/tabs';
import Tab from './components/Tab';

function App() {
    return (
        <div className='h-full min-h-screen bg-slate-500 align-center'>
            <Header title='Ferramenta de Conversão de Unidades de Medida' />
            <Container>
                <div className='flex justify-center'>
                    {Object.entries(tabs).map(([key, value], idx) => (
                        <Tab to={key} key={idx}>
                            <value.icon />
                            {value.unit.name}
                        </Tab>
                    ))}
                </div>
                <Outlet />
            </Container>
        </div>
    );
}

export default App;
