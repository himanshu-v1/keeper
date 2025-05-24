import './toast.scss';

function Toast({ toast }) {
  return (
    <>
        {
            // toast && 
            <div className="toast display-flex align-center justify-center">
                <span>{toast}</span>
            </div>
        }
    </>
  );
}

export default Toast;