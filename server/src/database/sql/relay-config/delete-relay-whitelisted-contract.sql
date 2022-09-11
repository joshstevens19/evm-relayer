 DELETE FROM relay_whitelisted_address 
 WHERE address = $<address>
 AND relay_id = $<relayId>;