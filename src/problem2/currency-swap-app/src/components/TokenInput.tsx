import React from 'react';
import { Input } from 'antd';

interface TokenInputProps {
  value: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength: number;
  disabled: boolean;
}

const TokenInput: React.FC<TokenInputProps> = ({
  value,
  onChange,
  maxLength,
  disabled,
}) => {
  return (
    <Input
      placeholder="0"
      value={value || ''}
      onChange={onChange}
      onKeyPress={(e) => {
        if (!/[0-9.]/.test(e.key)) {
          e.preventDefault();
        }
      }}
      maxLength={maxLength}
      disabled={disabled}
    />
  );
};

export default TokenInput;
