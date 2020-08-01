import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const LoginButton = styled.button`
  outline: none;
  display: inline-block;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  width: 230px;
  height: 40px;
  padding: 8px 16px;

  &:hover,
  :focus {
    background-color: #ffffffe0;
  }
`;

const IconField = styled.span`
  display: table-cell;
  vertical-align: middle;
`;

const Icon = styled.img`
  padding-top: 2px;
  width: 20px;
`;

const TextField = styled.span`
  padding-left: 10px;
  display: table-cell;
  vertical-align: middle;
  font-size: 14px;
`;
const Text = styled(Typography)`
  white-space: nowrap;
  font-weight: medium;
  color: #757575;
`;

type GoogleLoginButton = {
  onLogin: () => void;
};

const GoogleLoginButton: React.FC<GoogleLoginButton> = ({ onLogin }) => {
  return (
    <LoginButton
      type="button"
      onClick={onLogin}
      data-testid="googleLoginButton"
    >
      <IconField>
        <Icon src="./google.svg" alt="google" />
      </IconField>
      <TextField>
        <Text>Googleでログイン</Text>
      </TextField>
    </LoginButton>
  );
};

export { GoogleLoginButton };