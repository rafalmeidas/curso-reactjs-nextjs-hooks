import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '.';

describe('<Button />', () => {
  it('should render the button with the text "Load More"', () => {
    render(<Button text="Load more" />);
    expect.assertions(1);

    const button = screen.getByRole('button', { name: /load more/i });
    expect(button).toBeInTheDocument();
  });

  it('should all function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Load more" onClick={fn} />);

    const button = screen.getByRole('button', { name: /load more/i });
    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled is true', () => {
    render(<Button text="Load more" disable={true} />);

    expect(screen.getByRole('button', { name: /load more/i })).toBeDisabled();
  });

  it('should be enabled when disabled is false', () => {
    render(<Button text="Load more" disable={false} />);

    expect(screen.getByRole('button', { name: /load more/i })).toBeEnabled();
  });

  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(
      <Button text="Load more" onClick={fn} disable={false} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
