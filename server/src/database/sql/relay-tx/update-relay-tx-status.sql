UPDATE relay_tx_pending
SET tx_status = $<txStatus>
WHERE tx_id = $<txId>;