import { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { GoArrowUp } from 'react-icons/go';

const Members = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUSDTReceived, setTotalUSDTReceived] = useState(0);
  const [totalUSDTReceivedLast24Hours, setTotalUSDTReceivedLast24Hours] = useState(0);

  useEffect(() => {
    const fetchUSDTData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get24hrsUSDT'); // Replace with your actual API URL
        const data = response.data;

        setTotalUsers(data.totalUsers);
        setTotalUSDTReceived(data.totalUSDTReceivedAllTime);
        setTotalUSDTReceivedLast24Hours(data.totalUSDTReceivedLast24Hours);
      } catch (error) {
        console.error('Error fetching USDT data:', error);
      }
    };

    fetchUSDTData();
  }, []);

  return (
    <div className='w-full h-full mt-4 pb-3 flex justify-between gap-2'>
      {/* Total Members Section */}
      <div className='bg-Background shadow-xl shadow-[#00000079] px-2 py-3 w-1/2 rounded-lg h-1/2'>
        <h5 className='text-textColor2 flex items-center text-sm gap-1 '>
          Total Members
          <span className='relative group'>
            <BsFillQuestionCircleFill className='text-textColor3 text-xl cursor-pointer' />
            <div className='absolute left-[-15px] -translate-x-1/2 mt-2 w-[175px] bg-gray-800 text-white text-xs rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
              <h1 className='font-semibold'>Total Members</h1>
              <p>Total number of members in The Eagles.io BUSD and last 24 hours changes</p>
            </div>
          </span>
        </h5>
        <p className='text-[#a67912] text-lg mt-2'>{totalUsers}</p>
        <p className='text-white flex'>
          <GoArrowUp className='text-xl' />
          <span>{totalUSDTReceivedLast24Hours/1e18}</span>
        </p>
      </div>


      <div className='bg-Background w-1/2 rounded-lg shadow-xl shadow-[#00000079]'>
        <div className='px-2 py-3'>
          <h5 className='text-textColor2 flex items-center text-sm gap-1'>
            Members Received USDT
            <span className='relative group'>
              <BsFillQuestionCircleFill className='text-textColor3 text-xl cursor-pointer' />
              <div className='absolute -left-10 -translate-x-1/2 mt-2 w-[175px] bg-gray-800 text-white text-xs rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                <h1 className='font-semibold'>Members Received</h1>
                <p>Total amount received by all members of Eagles.io and last 24 hours change</p>
              </div>
            </span>
          </h5>
          <p className='text-[#a67912] text-lg mt-2'>{totalUSDTReceived/1e18} USDT</p>
          <p className='text-white flex'>
            <span>+{totalUSDTReceivedLast24Hours/1e18} USDT</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Members;
