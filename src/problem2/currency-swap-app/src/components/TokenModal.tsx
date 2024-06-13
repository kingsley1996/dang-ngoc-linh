import React, { useState, useEffect } from 'react';
import { Modal, Input } from 'antd';
import { Token } from '../types';

interface TokenModalProps {
  isOpen: boolean;
  tokenList: Token[];
  onClose: () => void;
  onSelectToken: (key: string) => void;
  handleImageError: (event: React.SyntheticEvent<HTMLImageElement>) => void;
}

const TokenModal: React.FC<TokenModalProps> = ({
  isOpen,
  tokenList,
  onClose,
  onSelectToken,
  handleImageError,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredTokens, setFilteredTokens] = useState<Token[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  useEffect(() => {
    setFilteredTokens(tokenList);
  }, [isOpen, tokenList]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filtered = tokenList.filter((token) =>
      token.currency.toLowerCase().includes(lowerCaseSearchTerm)
    );
    setFilteredTokens(filtered);
  }, [searchTerm, tokenList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Modal
      open={isOpen}
      footer={null}
      onCancel={onClose}
      title="Select a token"
    >
      <Input
        placeholder="Search token..."
        value={searchTerm}
        className="inputSearch"
        onChange={handleSearchChange}
      />
      <div className="modalContent">
        {filteredTokens.length === 0 ? (
          <p className="messageNotFound">No tokens found.</p>
        ) : (
          filteredTokens.map((token, index) => (
            <div
              className="tokenChoice"
              key={index}
              onClick={() => onSelectToken(token.currency)}
            >
              <img
                src={token.imgUrl}
                alt={token.currency}
                className="tokenLogo"
                onError={handleImageError}
              />
              <div className="tokenChoiceNames">
                <div className="tokenName">{token.currency}</div>
                <div className="tokenTicker">{token.currency}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </Modal>
  );
};

export default TokenModal;
