import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import { Token } from '../types';
import useGetTokenList from '../hooks/useGetTokenList';
import TokenModal from './TokenModal';
import TokenInput from './TokenInput';
import TokenSwitch from './TokenSwitch';
import TokenSelect from './TokenSelect';

const CurrencySwap: React.FC = () => {
  const [tokenOneAmount, setTokenOneAmount] = useState<string | null>(null);
  const [tokenTwoAmount, setTokenTwoAmount] = useState<string | null>(null);
  const tokenList = useGetTokenList();
  const [tokenOne, setTokenOne] = useState<Token | null>(null);
  const [tokenTwo, setTokenTwo] = useState<Token | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [changeToken, setChangeToken] = useState<number>(1);

  const maxLength = 10;

  useEffect(() => {
    if (tokenList.length !== 0 && (!tokenOne || !tokenTwo)) {
      setTokenOne(tokenList[0]);
      setTokenTwo(tokenList[1]);
    }
  }, [tokenList, tokenOne, tokenTwo]);

  const changeAmountOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value) && value.length <= maxLength) {
      setTokenOneAmount(value);
      if (value && tokenOne?.price && tokenTwo?.price) {
        const ratio = tokenOne.price / tokenTwo.price;
        setTokenTwoAmount((parseFloat(value) * ratio).toFixed(2));
      } else {
        setTokenTwoAmount(null);
      }
    }
  };

  const changeAmountTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const regex = /^\d*\.?\d*$/;
    if (regex.test(value) && value.length <= maxLength) {
      setTokenTwoAmount(value);
      if (value && tokenOne?.price && tokenTwo?.price) {
        const ratio = tokenTwo.price / tokenOne.price;
        setTokenOneAmount((parseFloat(value) * ratio).toFixed(2));
      } else {
        setTokenOneAmount(null);
      }
    }
  };

  const switchTokens = () => {
    const one = tokenOne;
    const two = tokenTwo;
    const oneAmount = tokenOneAmount;
    const twoAmount = tokenTwoAmount;
    setTokenOne(two);
    setTokenTwo(one);
    setTokenOneAmount(twoAmount);
    setTokenTwoAmount(oneAmount);
  };

  const openModal = (asset: number) => {
    setChangeToken(asset);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const selectToken = (key: string) => {
    let token = tokenList.find((item) => item.currency === key) || null;
    if (changeToken === 1) {
      setTokenOne(token);
    } else {
      setTokenTwo(token);
    }
    setIsOpen(false);
    setTokenOneAmount(null);
    setTokenTwoAmount(null);
  };

  const handleSwap = () => {
    if (!tokenOne || !tokenTwo || !tokenOneAmount || !tokenTwoAmount) {
      message.error('Please enter valid amounts and select tokens.');
      return;
    }

    if (tokenOne.currency === tokenTwo.currency) {
      message.error('Cannot swap between the same tokens.');
      return;
    }

    // Simulate currency swap logic
    try {
      // Assume swap is always successful
      const isSuccessful = true;

      if (isSuccessful) {
        message.success(
          `Swapped ${tokenOneAmount} ${tokenOne.currency} to ${tokenTwoAmount} ${tokenTwo.currency}`
        );
      } else {
        message.error('Swap failed. Please try again.');
      }
    } catch (error) {
      message.error('An error occurred during the swap. Please try again.');
    }
  };

  return (
    <>
      <TokenModal
        isOpen={isOpen}
        tokenList={tokenList}
        onClose={closeModal}
        onSelectToken={selectToken}
        handleImageError={(event) => {
          event.currentTarget.src = '/default-icon.png';
        }}
      />
      <div className="tradeBox">
        <div className="tradeBoxHeader">
          <h4>Swap</h4>
        </div>
        <div className="inputs">
          <div className="inputBox">
            <TokenInput
              value={tokenOneAmount}
              onChange={changeAmountOne}
              maxLength={maxLength}
              disabled={!tokenOne?.price}
            />
            <TokenSelect token={tokenOne} onClick={() => openModal(1)} />
          </div>
          <div className="inputBox">
            <TokenInput
              value={tokenTwoAmount}
              onChange={changeAmountTwo}
              maxLength={maxLength}
              disabled={!tokenTwo?.price}
            />
            <TokenSelect token={tokenTwo} onClick={() => openModal(2)} />
          </div>

          <TokenSwitch onClick={switchTokens} />
        </div>
        <button
          className="swapButton"
          onClick={handleSwap}
          disabled={!tokenOneAmount && !tokenTwoAmount}
        >
          Swap
        </button>
      </div>
    </>
  );
};

export default CurrencySwap;
