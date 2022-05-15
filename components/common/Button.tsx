import styled, { css } from 'styled-components';
import openColor from '../../styles/openColor';

interface Props {
  type: 'submit' | 'button' | 'reset';
  size: 'small' | 'medium' | 'large';
  color?: keyof typeof openColor;
  children: React.ReactNode;
  outline?: boolean;
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function Button({
  className,
  children,
  size,
  color,
  outline,
  fullWidth,
  ...rest
}: Props) {
  return (
    <StyledButton
      className={className}
      color={color}
      size={size}
      fullWidth={fullWidth}
      outline={outline}
      {...rest}
    >
      {children}
    </StyledButton>
  );
}

const colorStyles = css<Props>`
  ${({ color, outline }) => {
    if (!color) return;
    const selected = openColor[color];
    return css`
      background-color: ${selected};
      ${outline &&
      css`
        background-color: inherit;
        color: ${selected};
        border: 1.5px solid ${selected};
        &:hover {
          color: white;
          * {
            color: white;
          }
          background-color: ${selected};
        }
      `}
    `;
  }}
`;

const fullWidthStyle = css<Props>`
  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      & + & {
        margin-left: 0;
      }
    `}
`;

const sizes = {
  small: {
    height: '2.8rem',
    fontSize: '1.4rem',
  },
  medium: {
    height: '3.6rem',
    fontSize: '1.6rem',
  },
  large: {
    height: '4.8rem',
    fontSize: '1.8rem',
  },
};

const sizeStyles = css<Props>`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const StyledButton = styled.button<Props>`
  display: inline-flex;
  align-items: center;
  outline: none;
  border: none;
  border-radius: 0.4rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  transition: background-color 0.2s, color 0.2s ease-in-out;
  font-family: JetBrainsMono, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  & + & {
    margin-left: 1rem;
  }
  &:disabled {
    opacity: 0.6;
  }
  ${colorStyles}
  ${sizeStyles}
  ${fullWidthStyle}
`;
