INSERT INTO enabled_network (name) VALUES ($<networkName>);

INSERT INTO enabled_network_nodes (name, provider_url)
SELECT $<networkName>, provider_url FROM unnest(ARRAY[$<providerUrls>]) AS provider_url;