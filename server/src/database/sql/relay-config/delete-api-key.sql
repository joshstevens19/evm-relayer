 UPDATE relay_api_key 
 set deleted = true
 WHERE api_key = $<apiKey>
 AND relay_id = $<relayId>;