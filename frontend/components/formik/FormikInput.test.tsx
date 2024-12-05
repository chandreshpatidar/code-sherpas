import { render, screen, fireEvent } from '@testing-library/react';
import FormikInput from './FormikInput';
import { Formik, Form } from 'formik';

describe('FormikInput Component', () => {
  const renderComponent = (props = {}) => {
    return render(
      <Formik
        initialValues={{ testInput: '' }}
        onSubmit={() => {}}
        initialErrors={{ testInput: 'Required' }}
        initialTouched={{ testInput: true }}
      >
        <Form>
          <FormikInput
            name='testInput'
            label='Test Input'
            {...props}
          />
        </Form>
      </Formik>
    );
  };

  it('renders input and label correctly', () => {
    renderComponent();
    expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    renderComponent({ placeholder: 'Enter text' });
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    renderComponent();
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('applies custom class names', () => {
    renderComponent({
      labelClassName: 'custom-label',
      fieldClassName: 'custom-field',
    });
    expect(screen.getByText('Test Input')).toHaveClass('custom-label');
    expect(screen.getByRole('textbox')).toHaveClass('custom-field');
  });

  it('disables input when `disabled` is true', () => {
    renderComponent({ disabled: true });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('handles different input types', () => {
    renderComponent({ type: 'email' });
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
  });

  it('handles input changes', () => {
    renderComponent();
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'New Value' } });
    expect(input).toHaveValue('New Value');
  });
});
