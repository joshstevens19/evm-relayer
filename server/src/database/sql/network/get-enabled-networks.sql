SELECT 
    en.name,
    en.provider_url,
    n.chain_id
FROM enabled_network en
INNER JOIN network n ON en.name = n.name;