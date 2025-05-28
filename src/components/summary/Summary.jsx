import { useSelector, useDispatch } from 'react-redux';
import Table from '../../common/table/Table';
import { removeExpense } from '../../store/expenseSlice';
import { useContext } from 'react';
import { EditContext } from '../../global/js/Contexts';
import './summary.css';

function Summary() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense);
  const editContext = useContext(EditContext);

  const handleEdit = (id) => {
    const expense = expenses.find(i => i.id === id);
    editContext.addEditData(expense);
  }

  const handleDelete = (id) => {
    dispatch(removeExpense({ id }));
  }

  const getActions = () => {
    return [
      {
        type: 'icon',
        action: 'edit',
        handleClick: handleEdit,
      },
      {
        type: 'icon',
        action: 'trash',
        handleClick: handleDelete,
      }
    ];
  } 

  return (
    <div className="summary">
      {expenses.length === 0 ? (
        <p className='no-expenses'>No Expenses Found</p>
      ) : (
        <>
          <Table data={expenses} buttons={getActions()} />
        </>
      )}
    </div>
  );
}

export default Summary;