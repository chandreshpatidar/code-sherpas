import { render, screen } from '@testing-library/react';
import TransactionItem, { TransactionItemProps } from './TransactionItem';

describe('TransactionItem Component', () => {
  const transactionData: TransactionItemProps = {
    type: 'DEPOSIT',
    amount: 100,
    created_at: '2024-12-06T10:00:00Z',
    balance_after_transaction: 500,
  };

  test('renders the transaction item correctly', () => {
    render(<TransactionItem {...transactionData} />);

    expect(screen.getByText('06/12/2024')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  test('displays the correct icon for DEPOSIT transaction type', () => {
    render(<TransactionItem {...transactionData} />);

    const icon = screen.getByTestId('arrow-down-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-green-500');
  });

  test('displays the correct icon for WITHDRAWAL transaction type', () => {
    render(<TransactionItem {...{ ...transactionData, type: 'WITHDRAWAL' }} />);

    const icon = screen.getByTestId('arrow-up-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-red-500');
  });

  test('displays the correct icon for TRANSFER_IN transaction type', () => {
    render(<TransactionItem {...{ ...transactionData, type: 'TRANSFER_IN' }} />);

    const icon = screen.getByTestId('move-down-left-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-blue-500');
  });

  test('displays the correct icon for TRANSFER_OUT transaction type', () => {
    render(<TransactionItem {...{ ...transactionData, type: 'TRANSFER_OUT' }} />);

    const icon = screen.getByTestId('move-up-right-icon');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('text-blue-500');
  });

  test('formats the date correctly', () => {
    render(<TransactionItem {...transactionData} />);
    expect(screen.getByText('06/12/2024')).toBeInTheDocument();
  });

  test('renders balance after transaction correctly', () => {
    render(<TransactionItem {...transactionData} />);
    expect(screen.getByText('500')).toBeInTheDocument();
  });

  test('displays the correct amount for withdrawal transaction', () => {
    render(<TransactionItem {...{ ...transactionData, type: 'WITHDRAWAL', amount: -50 }} />);
    expect(screen.getByText('-50')).toBeInTheDocument();
  });

  test('applies correct CSS classes for grid layout and styling', () => {
    const { container } = render(<TransactionItem {...transactionData} />);
    const gridDiv = container.firstChild;
    expect(gridDiv).toHaveClass('grid');
    expect(gridDiv).toHaveClass('bg-white');
  });
});
