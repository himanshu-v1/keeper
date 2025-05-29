import { useSelector, useDispatch } from 'react-redux';
import Table from '../../common/table/Table';
import { removeExpense } from '../../store/expenseSlice';
import { useContext } from 'react';
import { EditContext, ToastContext } from '../../global/js/Contexts';
import { removeData } from "../../services/backendService";
import './summary.scss';

function Summary() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expense);
  const editContext = useContext(EditContext);
  const { addToast } = useContext(ToastContext);

  const handleEdit = (id) => {
    const expense = expenses.find(i => i._id === id);
    editContext.addEditData(expense);
  }

  const handleDelete = (_id) => {
    // Remove from DB
    removeData(_id).then(() => { 
        dispatch(removeExpense({ _id }));
        addToast("Expense removed!!");
      }).catch((err) => {
        console.log(err);
        addToast("Something went wrong");
      });
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