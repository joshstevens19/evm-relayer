UPDATE relay
SET speed = $<speed>
WHERE id = $<relayId>
AND updated_on NOW();