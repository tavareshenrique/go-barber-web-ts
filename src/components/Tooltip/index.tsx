import React from 'react';

import ITooltipProps from './interfaces/ITooltipProps';

import { Container } from './styles';

const Tooltip: React.FC<ITooltipProps> = ({
  title,
  className = '',
  children,
}) => {
  return (
    <Container className={className}>
      {children}
      <span>{title}</span>
    </Container>
  );
};

export default Tooltip;
