import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';

import logoImg from '~/assets/logo.svg';

import Input from '~/components/Input';
import Button from '~/components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
  <Container>
    <Content>
      <img src={logoImg} alt="Go Barber" />

      <form>
        <h1>Faça seu logon</h1>

        <Input name="email" type="email" placeholder="E-mail" icon={FiMail} />
        <Input
          name="password"
          type="password"
          placeholder="Senha"
          icon={FiLock}
        />

        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="login">
        <FiLogIn />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default SignIn;
