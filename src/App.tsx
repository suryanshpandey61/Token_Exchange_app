import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { exchangeTokens } from './services/TokenExchangeService';

const App: React.FC = () => {
    const [amount, setAmount] = useState('');
    const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null); // Corrected here

    useEffect(() => {
        if (typeof window !== 'undefined' && window.ethereum) {
            const { ethers } = require('ethers');
            const newProvider = new ethers.providers.Web3Provider(window.ethereum);
            setProvider(newProvider);
        } else {
            console.error('Please install MetaMask!');
            alert('MetaMask is not installed. Please install it to use this application.');
        }
    }, []);

    const handleExchange = async () => {
        if (!provider) {
            alert('Ethereum provider is not initialized.');
            return;
        }
        
        try {
            await exchangeTokens(amount);
            alert('Tokens exchanged successfully!');
        } catch (error) {
            console.error(error);
            alert('Token exchange failed.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Token Exchange</h1>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 mb-4"
                placeholder="Amount of Token A"
            />
            <button
                onClick={handleExchange}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Exchange
            </button>
        </div>
    );
};

export default App;
