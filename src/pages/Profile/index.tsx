import React, { useCallback, useRef } from 'react';
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import { useToast } from '~/hooks/ToastContext';

import { useAuth } from '~/hooks/AuthContext';

import api from '~/services/api';
import getValidationErrors from '~/utils/getValidationErrors';

import Input from '~/components/Input';
import Button from '~/components/Button';

import { Container, Content, AvatarInput } from './styles';

const Profile: React.FC = () => {
  const { user } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { addToast } = useToast();

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
          onSubmit={() => {}}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <button type="button">
              <FiCamera />
            </button>
          </AvatarInput>

          <h1>Meu perfil</h1>

          <Input name="name" placeholder="Nome" icon={FiUser} />
          <Input name="email" type="email" placeholder="E-mail" icon={FiMail} />

          <Input
            containerStyle={{ marginTop: 24 }}
            name="old_password"
            type="password"
            placeholder="Senha Atual"
            icon={FiLock}
          />
          <Input
            name="password"
            type="password"
            placeholder="Nova Senha"
            icon={FiLock}
          />
          <Input
            name="password_confirmation"
            type="password"
            placeholder="Confirmar Senha"
            icon={FiLock}
          />

          <Button type="submit">Confirmar Mudanças</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;