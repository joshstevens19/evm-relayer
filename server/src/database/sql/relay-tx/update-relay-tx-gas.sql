UPDATE relay_tx_pending
SET gas_price = $<gasPrice>
    max_priority_fee_per_gas = $<maxPriorityFeePerGas>
    max_fee_per_gas = $<maxFeePerGas>
WHERE tx_id = $<txId>;