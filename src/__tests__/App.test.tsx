import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders LoginComponent as default page', () => {
    const { container } = render(<App />);

    const loginComponent = container.querySelector('.login-component');

    expect(loginComponent).toBeDefined();

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeDefined();
  });
});