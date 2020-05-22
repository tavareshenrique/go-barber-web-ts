import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useHistory, useLocation } from 'react-router-dom';

import * as Yup from 'yup';
import getValidationErrors from '~/utils/getValidationErrors';

import api from '~/services/api';

import { useToast } from '~/hooks/ToastContext';

import Input from '~/components/Input';
import Button from '~/components/Button';

import logoImg from '~/assets/logo.svg';

import { Container, Content, AnimationContainer, Background } from './styles';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const location = useLocation();

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          password: Yup.string().required('Senha obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), null],
            'Confirmação inválida',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description:
            'Ocorreu um erro ao resetar a sua senha, tente novamente.',
        });
      }
    },
    [location.search, history, addToast],
  );

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="Go Barber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar Senha</h1>

            <Input
              name="password"
              type="password"
              placeholder="Informe a Nova Senha"
              icon={FiLock}
            />

            <Input
              name="password_confirmation"
              type="password"
              placeholder="Confirmação da Nova Senha"
              icon={FiLock}
            />

            <Button type="submit">Alterar Senha</Button>
          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
