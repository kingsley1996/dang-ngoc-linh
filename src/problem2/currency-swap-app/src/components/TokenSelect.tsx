import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Token } from '../types';

interface TokenSelectProps {
  token: Token | null;
  onClick: () => void;
}

const TokenSelect: React.FC<TokenSelectProps> = ({ token, onClick }) => {
  return (
    <div className="assetOne" onClick={onClick}>
      {token && (
        <>
          <img
            src={token.imgUrl}
            alt="assetOneLogo"
            className="assetLogo"
            onError={(e) => {
              e.currentTarget.src = '/default-icon.png';
            }}
          />
          {token.currency}
          <DownOutlined />
        </>
      )}
    </div>
  );
};

export default TokenSelect;
