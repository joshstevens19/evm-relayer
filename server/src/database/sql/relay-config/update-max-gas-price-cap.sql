UPDATE relay
SET max_gas_price_cap = $<maxGasPriceCap>
WHERE id = $<relayId>
AND updated_on NOW();