UPDATE relay
SET name = $<name>
WHERE id = $<relayId>
AND updated_on NOW();