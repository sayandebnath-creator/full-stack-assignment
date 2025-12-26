import time
from datetime import datetime
from sqlalchemy.orm import Session
from models import Transaction, Status

def process_transaction(db: Session, transaction_id: str):
    time.sleep(30)

    txn = db.query(Transaction).filter_by(transaction_id=transaction_id).first()
    if not txn or txn.status == Status.PROCESSED:
        return

    txn.status = Status.PROCESSED
    txn.processed_at = datetime.utcnow()
    db.commit()
