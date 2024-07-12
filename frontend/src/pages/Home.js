import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Beef from '../components/Beef';

const Home = () => {
  const [beefs, setBeefs] = useState(null); 

  useEffect(() => {
    const fetchBeefs = async () => {
      const response = await fetch("http://localhost:4000/api/beef/");
      const beefData = await response.json();
      if (response.ok) {
        setBeefs(beefData); 
      }
      else {
        console.error("Error:", beefData); 
      }
    }

    fetchBeefs();
  }, []);
  return (
    <div className='home'>
      <div className='beefs'>
        {beefs && beefs.map((beef) => (
          <Beef key={beef._id} beef_info={beef}/>
        ))}
      </div>
    </div>
  )
}

export default Home