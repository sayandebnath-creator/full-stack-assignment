from fastapi import FastAPI, BackgroundTasks, Depends
from sqlalchemy.orm import Session
from datetime import datetime

from db import Base, engine, SessionLocal
from models import Transaction, Status
from worker import process_transaction

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def health():
    return {
        "status": "HEALTHY",
        "current_time": datetime.utcnow().isoformat()
    }

@app.post("/v1/webhooks/transactions", status_code=202)
def receive_webhook(payload: dict, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    txn_id = payload["transaction_id"]

    txn = db.query(Transaction).filter_by(transaction_id=txn_id).first()
    if not txn:
        txn = Transaction(
            transaction_id=txn_id,
            source_account=payload["source_account"],
            destination_account=payload["destination_account"],
            amount=payload["amount"],
            currency=payload["currency"],
            status=Status.PROCESSING
        )
        db.add(txn)
        db.commit()

        background_tasks.add_task(process_transaction, db, txn_id)

    return {"accepted": True}

@app.get("/v1/transactions/{transaction_id}")
def get_transaction(transaction_id: str, db: Session = Depends(get_db)):
    txn = db.query(Transaction).filter_by(transaction_id=transaction_id).first()
    return txn
