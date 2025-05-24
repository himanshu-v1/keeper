import { useSelector } from 'react-redux';
import Table from '../common/table/Table';
import './summary.css';

function Summary() {
  const expenses = useSelector((state) => state.expense);

  return (
    <div className="summary">
      {expenses.length === 0 ? (
        <p>No Expenses Found</p>
      ) : (
        <>
          <Table data={expenses} />
        </>
      )}
    </div>
  );
}

export default Summary;