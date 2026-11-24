
import { Wifi, CreditCard } from "lucide-react";

function VirtualCard() {
  return (
    <section className="virtual-card">

      <div className="card-top">
        <h2>ViniBank</h2>
        <Wifi size={28} />
      </div>

      <div className="card-chip">
        <CreditCard size={35} />
      </div>

      <div className="card-number">
        4532  ••••  ••••  7890
      </div>

      <div className="card-bottom">

        <div>
          <span>Card Holder</span>
          <strong>VINICIUS</strong>
        </div>

        <div>
          <span>Expires</span>
          <strong>12/29</strong>
        </div>

        <strong className="card-brand">VISA</strong>

      </div>

    </section>
  );
}

export default VirtualCard;
