import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Formik, Form } from 'formik';
import FormikSelect from './FormikSelect';

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

describe('FormikSelect Component', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  const initialValues = { testField: '' };

  const renderFormikSelect = () => {
    return render(
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
      >
        <Form>
          <FormikSelect
            name='testField'
            label='Test Label'
            placeholder='Select an option'
            options={options}
          />
        </Form>
      </Formik>
    );
  };

  test('renders the select component with label and placeholder', () => {
    renderFormikSelect();

    expect(screen.getByText('Test Label')).toBeInTheDocument();

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveTextContent('Select an option');
  });

  test('displays options when the dropdown is opened', async () => {
    renderFormikSelect();

    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    await waitFor(() => {
      options.forEach((option) => {
        expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument();
      });
    });
  });

  test('selects an option and updates the form value', async () => {
    renderFormikSelect();

    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    const option = screen.getByRole('option', { name: 'Option 1' });
    fireEvent.click(option);

    expect(screen.getByRole('combobox')).toHaveTextContent('Option 1'); // Checking value update
  });

  test('displays an error message when validation fails', async () => {
    render(
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
        validate={() => ({ testField: 'This field is required' })}
      >
        <Form>
          <FormikSelect
            name='testField'
            label='Test Label'
            placeholder='Select an option'
            options={options}
          />
          <button type='submit'>Submit</button>
        </Form>
      </Formik>
    );

    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('This field is required')).toBeInTheDocument();
    });
  });

  test('renders the select component with disabled state', () => {
    render(
      <Formik
        initialValues={initialValues}
        onSubmit={() => {}}
      >
        <Form>
          <FormikSelect
            name='testField'
            label='Test Label'
            placeholder='Select an option'
            options={options}
            disabled
          />
        </Form>
      </Formik>
    );

    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    const dropdown = screen.queryByRole('listbox');
    expect(dropdown).not.toBeInTheDocument();
  });
});
