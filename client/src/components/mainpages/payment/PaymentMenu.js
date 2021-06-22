import React, {useState} from 'react'

function PaymentMenu() {

    const [paymentState, setPaymentState] = useState(false);
/*
    return (
        <div>
            <div className="payment-menu">
                <select
                    className="payment-select"
                    value={paymentState}
                    onChange={(e) => {
                        const selectedMethod = e.target.value;
                        setPaymentState(selectedMethod)
                    }}
                >
                    <option value="bank receipt">Bank Receipt</option>
                    <option value="paypal">paypal</option>
                </select>
                {paymentState}
            </div>
        </div>
    )
    */
   return (
       <div>
           Payment
       </div>
   )
}

export default PaymentMenu