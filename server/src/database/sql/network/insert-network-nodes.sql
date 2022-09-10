 DELETE FROM enabled_network_nodes 
 WHERE provider_url = ANY ($<providerUrls>) 
 AND name = $<networkName>;
