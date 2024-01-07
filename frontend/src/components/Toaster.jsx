import { Toaster } from 'react-hot-toast';
import "./Toaster.css"
function Toast() {
    return (
        <div>
            <Toaster
                position="top-right"
                className="toast-message"
                toastOptions={{
                    success: {
                        theme: {
                            primary: '#4aed88',
                        },
                    },
                    error: {
                        theme: {
                            primary: '#ff0000'

                        }
                    }
                }}
            ></Toaster>
        </div>
    )
}

export default Toast