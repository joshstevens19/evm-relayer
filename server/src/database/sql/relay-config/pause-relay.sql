UPDATE relay
SET paused = true
WHERE id = $<relayId>
AND updated_on NOW();