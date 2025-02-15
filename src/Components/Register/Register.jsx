import { FaRegCheckCircle } from 'react-icons/fa';
import { RiCheckboxBlankCircleLine } from 'react-icons/ri';
import { MdInfo } from 'react-icons/md';
import { AiOutlineMessage } from 'react-icons/ai';
import { MdOutlineErrorOutline } from 'react-icons/md';
import { useEffect, useState } from 'react';
import { useConnect, useAccount, useSwitchChain } from 'wagmi';
import chainConfig from '../../Config/chainConfig';
import { HiMiniXMark } from 'react-icons/hi2';
import { BsFillQuestionCircleFill } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';

import React from 'react';
import {
  idToAddress,
  USDTapprove,
  getTxn,
} from '../../Config/Contract-Methods';

const Register = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { connectors, connect } = useConnect();
  const { isConnected, address, chain } = useAccount();
  const { switchChain } = useSwitchChain();
  const [upline, setUpline] = useState('1');
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState('')

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const route = queryParams.get('route');
  const modifiedRoute = route ? route.substring(1) : '';

  const routePattern = /\d/;
  React.useEffect(() => {
    if (routePattern.test(location.pathname)) {
      navigate(`/redirect?route=${encodeURIComponent(location.pathname)}`);
    }
  }, [location, navigate, routePattern]);

  const handleInputChange = (e) => {
    setUpline(e.target.value);
  };

  useEffect(() => {
    if (isConnected && chain?.id) {
      const targetChainId = chainConfig[11155111]?.id;
      if (chain.id !== targetChainId) {
        switchChain({ chainId: targetChainId });
      }
    }
  }, [chain, isConnected]);

  const handleConnectClick = () => {
    setShowSidebar(true);
  };

  // const getAddress = async () => {
  //   const uplineaddress = await idToAddress(upline);
  //   console.log('✅ Wallet Address:', uplineaddress);

  //   if (uplineaddress) {
  //     try {
  //       console.log('hello');
  //       const approvetx = await USDTapprove('5000000000000000000');
  //       const receipt = await getTxn(approvetx);
  //       setReceipt(receipt)
  //       if (!receipt) {
  //         console.log('Approve failed');

  //         return;
  //       }
  //       console.log('first');
  //       try {
  //         console.log('register start');

  //         let x = await register(uplineaddress);
  //         const registerreceipt = await getTxn(x);
  //         if (!registerreceipt) {
  //           console.log('registration failed');
  //           return;
  //         }
  //         console.log('register End');
  //         console.log(x);
  //         console.log('📤 Registering with Address:', x);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //       navigate('/home')
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else {
  //     console.log('❌ Address not available!');
  //   }
  // };

  // const handleClick = async () => {
  //   setLoading(true);
  //   getAddress();
  //   setLoading(false);
  // };

  const handleConnect = (walletName) => {
    const connector = connectors.find(
      (c) => c.name.toLowerCase() === walletName.toLowerCase()
    );
    if (connector) {
      connect({ connector });
      setShowSidebar(false);
    }
  };

  useEffect(() => {
    const handlClickToAddress = () => {
      if (upline) {
        idToAddress(upline);
      } else {
        alert('please enter a valid address');
      }
    };
    handlClickToAddress();
  }, []);

  const wallets = [
    {
      id: 1,
      name: 'Trust Wallet',
      description: 'DApp in App',
      image: '/assets/AuthImages/trust.png',
    },
    {
      id: 2,
      name: 'TokenPocket',
      description: 'DApp in App',
      image: '/assets/AuthImages/pocket.png',
    },
    {
      id: 3,
      name: 'MetaMask',
      description: 'DApp in App',
      image: '/assets/AuthImages/Mask.png',
    },
    {
      id: 4,
      name: 'WalletConnect',
      description: 'Any Wallet and browser',
      image: '/assets/AuthImages/connect.png',
    },
  ];

  return (
    <>
      <div className='h-auto w-full relative overflow-hidden bg-gradient-to-tr from-gray-900 via-gray-900 to-blue-600 text-white flex justify-center gap-10 items-center md:p-6 px-2 py-6'>
        <div className='md:max-w-5xl w-full flex flex-col md:flex-row justify-between gap-16 p-6 rounded-xl md:gap-x-44'>
          <div className='flex-1 p-2 md:p-4 lg:p-2'>
            <div className='flex justify-end'>
              <p
                className='text-textColor3 inline-block text-xs px-3 py-2 rounded-full bg-textColor3 bg-opacity-30 w-[105px] overflow-x-scroll cursor-pointer'
                style={{
                  scrollbarWidth: 'none',
                }}
                onClick={handleConnectClick}
              >
                {!isConnected ? 'Connect Wallet' : address}
              </p>
            </div>
            <h1 className='text-2xl font-semibold mb-4'>
              Registration <br /> in Theeagles USDT
            </h1>
            <label className='block text-gray-400 mb-2'>Your upline</label>
            <input
              type='text'
              value={route ? modifiedRoute : upline}
              onChange={handleInputChange}
              className='w-full p-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <div className='mt-4 space-y-2'>
              <div
                className={`flex items-center gap-2 ${
                  isConnected ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {isConnected ? <FaRegCheckCircle /> : <MdOutlineErrorOutline />}
                Wallet: connected
              </div>
              <div
                className={`flex items-center gap-2 ${
                  isConnected ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {isConnected ? <FaRegCheckCircle /> : <MdOutlineErrorOutline />}{' '}
                Network: Smart chain
              </div>
              <div
                className={`flex items-center gap-2 ${
                  isConnected ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {isConnected ? <FaRegCheckCircle /> : <MdOutlineErrorOutline />}{' '}
                Registration: available
              </div>
              <div className={`flex items-center gap-2 text-white ${
                  receipt ? 'text-green-400' : 'text-red-400'
                }`}>
               {receipt ? <FaRegCheckCircle /> : <MdOutlineErrorOutline />}
                Balance: min 5 USDT and 0.001 BNB
              </div>
              <div className={`flex items-center gap-2 text-white ${
                  receipt ? 'text-green-400' : 'text-red-400'
                }`}>
               {receipt ? <FaRegCheckCircle /> : <MdOutlineErrorOutline />} Aprove USDT
              </div>
            </div>

            <button
              className={`mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center justify-center ${
                !isConnected || loading
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer'
              }`}
              disabled={!isConnected || loading}
              // onClick={handleClick}
            >
              {loading ? '...loading' : 'Registration'}
            </button>
            <button className='flex items-center justify-center p-2 mt-2 text-gray-500   rounded-lg gap-1'>
              Registration fee
              <span className='relative group'>
                <BsFillQuestionCircleFill className='text-textColor3 text-sm cursor-pointer' />

                <div className='absolute left-6 -top-9 w-[185px] text-justify bg-gray-800 text-white text-xs rounded-lg p-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none'>
                  <p>
                    Registration fee is charged once when enrolling on the
                    platform and is allocated to the maintenance and development
                    of theeagles ecosystem
                  </p>
                </div>
              </span>{' '}
            </button>
          </div>

          <div className='flex-1 p-6 bg-gray-800 rounded-lg shadow-md'>
            <div className='flex items-center gap-2 text-white'>
              <MdInfo /> <h3 className='text-lg font-semibold'>Information</h3>
            </div>
            <p className='text-gray-400 mt-2'>
              <span className='text-white font-semibold'>
                Insufficient balance for registration.
              </span>
              Registration requires <span className='text-white'>5 USDT</span>{' '}
              and at least
              <span className='text-white'> 0.001 BNB</span>. Your wallet
              balance:
              <span className='text-red-400 font-medium'> 0.00 USDT </span> and
              <span className='text-red-400 font-medium'> 0.000 BNB</span>.
            </p>
            <button className='mt-4 p-2 bg-red-600 hover:bg-red-700 rounded-lg'>
              Read guide
            </button>
            <div className='mt-4'>
              <video src='/Eagles.mp4' className='rounded-lg w-full' controls />
            </div>
            <div className='mt-4 flex items-center gap-2 text-gray-300'>
              <AiOutlineMessage />
              <p>
                Need help with registration? <br /> Talk to experts in
                <span className='text-blue-400 cursor-pointer'>
                  {' '}
                  support chat
                </span>
                .
              </p>
            </div>
          </div>
        </div>

        <div
          className={`absolute top-0 h-screen w-full bg-black py-4 px-3 transition-all duration-500 ${
            showSidebar ? 'right-0' : '-right-full'
          }`}
        >
          <div className='flex justify-end'>
            <div className='inline-block bg-Background p-2 rounded-full shadow-2xl'>
              <HiMiniXMark
                className='text-white text-3xl'
                onClick={() => setShowSidebar(false)}
              />
            </div>
          </div>

          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              onClick={() => handleConnect(wallet.name)}
              className='cursor-pointer mt-3 bg-zinc-900 text-textColor2 rounded-lg flex items-center gap-6 py-5 px-3'
            >
              <div className='h-16 w-16 bg-textColor3 rounded-full flex justify-center items-center'>
                <img
                  src={wallet.image}
                  alt={wallet.name}
                  className='h-[48px] w-[48px]'
                />
              </div>
              <div>
                <h1 className='text-2xl font-medium text-textColor3'>
                  {wallet.name}
                </h1>
                <p className='text-xs'>{wallet.description}</p>
              </div>
            </div>
          ))}

          <p className='text-textColor2 text-center mt-16 text-sm'>
            Got a Question?{' '}
            <span className='text-textColor3 font-medium'>Contact Support</span>
          </p>
        </div>
      </div>
      );
    </>
  );
};
export default Register;
