import { useState, useEffect } from 'react';
import Loading from './loading';
import Tours from './all-tours';
// import {data} from './data';

function App() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [tours, setTours] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const [tours, setTours] = useState<{data} | null | any>(null);
  const url='https://course-api.com/react-tours-project';
  const [tours, setTours] = useState([]);
  
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id);
    setTours(newTours);
  };

  const fetchTours = async () => {

    setLoading(true);
    try {
      const response = await fetch(url);
      const tours = await response.json();
      setLoading(false);
      setTours(tours);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTours();
  }, []);
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button
            className='btn'
            style={{ marginTop: '2rem' }}
            onClick={() => fetchTours()}
          >
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
}

export default App;
