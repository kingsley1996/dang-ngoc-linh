import React from 'react';
import { ArrowDownOutlined } from '@ant-design/icons';

interface TokenSwitchProps {
  onClick: () => void;
}

const TokenSwitch: React.FC<TokenSwitchProps> = ({ onClick }) => {
  return (
    <div className="switchButton" onClick={onClick}>
      <ArrowDownOutlined className="switchArrow" />
    </div>
  );
};

export default TokenSwitch;
