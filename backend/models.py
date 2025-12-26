from sqlalchemy import Column, String, Integer, DateTime, Enum
from datetime import datetime
from db import Base
import enum

class Status(str, enum.Enum):
    PROCESSING = "PROCESSING"
    PROCESSED = "PROCESSED"

class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id = Column(String, primary_key=True, index=True)
    source_account = Column(String)
    destination_account = Column(String)
    amount = Column(Integer)
    currency = Column(String)
    status = Column(Enum(Status))
    created_at = Column(DateTime, default=datetime.utcnow)  
    processed_at = Column(DateTime, nullable=True)
