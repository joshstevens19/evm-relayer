UPDATE relay
SET eip_1559_enabled = $<eip1559Status>
WHERE id = $<relayId>
AND updated_on NOW();