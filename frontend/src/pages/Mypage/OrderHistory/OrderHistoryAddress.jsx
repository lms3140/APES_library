import style from "./OrderHistoryAddress.module.css";
export function OrderHistoryAddress({ address }) {
  return (
    <div className={style.AddressContainer}>
      <div className={style.title}>
        <p>
          {address.recipientName}({address.addressName})
        </p>
      </div>
      <div className={style.phone}>{address.phone}</div>
      <div>
        <p className={style.addressLine}>
          {address.addressLine1} {address.addressLine2}
          <br />({address.zipCode})
        </p>
      </div>
    </div>
  );
}
