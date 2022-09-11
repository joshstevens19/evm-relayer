UPDATE relay
SET paused = false
WHERE id = $<relayId>
AND updated_on NOW();