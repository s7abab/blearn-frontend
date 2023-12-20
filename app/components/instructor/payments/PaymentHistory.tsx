import { IPaymentHistory } from '@/@types/interfaces/payment/payment.interface'
import { styles } from '@/app/styles/style'
import { formatDate } from '@/app/utils/date-convertor'

interface Props  {
    withdrawals: IPaymentHistory[]
}

const PaymentHistory = ({withdrawals}: Props) => {

  return (
    <div className={`${styles.blue_btn} mt-5`}>
    <h2 className="text-2xl font-semibold mb-4">Payment History</h2>
    <ul>
      {withdrawals?.map((payment) => (
        <li key={payment.txid} className="mb-4">
          <p className="text-lg font-semibold">
            {formatDate(payment?.date)}
          </p>
          <p className="text-gray-600">txid: tx{payment.txid}</p>
          <p className="text-gray-300">Amount: ${payment.amount}</p>
          <p
            className={`${
              payment.status === "pending"
                ? "text-red-700"
                : "text-green-700"
            }`}
          >
            {payment.status}
          </p>
          <hr />
        </li>
      ))}
    </ul>
  </div>
  )
}

export default PaymentHistory