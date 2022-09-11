UPDATE relay
SET deleted = true
WHERE id = $<relayId>
AND updated_on NOW();