import React, { useState } from 'react';
import './App.css';
import Container from './components/Container';
import Header from './components/Header';

function App() {
  const [value, setValue] = useState(0);
  const [ounces, setOunces] = useState(0);
  const [gallons, setGallons] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
  }

  const calculate = (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    setOunces(value * 33.814);
    setGallons(value / 3.785411784);
  }

  return (
    <div className="h-screen bg-slate-400">
      <Header title='Ferramenta de Conversão de Unidades de Medida' />
      <Container>
        <div className='flex flex-row justify-center'>
          <div className='tab tab-active'>Litro</div>
          <div className='tab'>Metro</div>
          <div className='tab'>Quilo</div>
          <div className='tab'>Graus Celcius</div>
        </div>
        <div className='flex items-center justify-between p-4 rounded-lg bg-slate-200'>
          <form className='flex gap-4'>
          <input type='number' name='value' placeholder='Litro' className='px-3 py-1 rounded' onChange={handleChange}></input>
          <button type="submit" onClick={calculate} className='px-2 py-1 bg-green-300 rounded hover:bg-green-400' >
            Submit
            </button>
          </form>
          <span className=''>{ounces?.toFixed(4) ?? ounces} Onças</span>
          <span className=''>{gallons?.toFixed(4) ?? gallons} Galões</span>
        </div>
      </Container>
    </div>
  );
}

export default App;
