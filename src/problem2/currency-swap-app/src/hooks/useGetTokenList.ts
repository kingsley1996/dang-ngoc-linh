import { useState, useEffect } from 'react';
import axios from 'axios';
import { Token } from '../types';

const useGetTokenList = () => {
  const [tokenList, setTokenList] = useState<Token[]>([]);

  useEffect(() => {
    const fetchTokenList = async () => {
      try {
        const response = await axios.get<Token[]>(
          'https://interview.switcheo.com/prices.json'
        );

        const tokenMap = new Map<string, Token>();

        response.data.forEach((token) => {
          const existingToken = tokenMap.get(token.currency);
          if (
            !existingToken ||
            new Date(token.date) > new Date(existingToken.date)
          ) {
            tokenMap.set(token.currency, token);
          }
        });

        const tokensWithImgUrl = Array.from(tokenMap.values()).map((token) => ({
          ...token,
          imgUrl: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`,
        }));

        setTokenList(tokensWithImgUrl);
      } catch (error) {
        console.error('Error fetching token list:', error);
      }
    };

    fetchTokenList();
  }, []);

  return tokenList;
};

export default useGetTokenList;
