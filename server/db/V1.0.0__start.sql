CREATE TABLE "network" (
  "name" varchar(50) PRIMARY KEY not null,
  -- TODO: look at PK for this
  "chain_id" int not null
);

-- TODO add some more!
INSERT INTO "network" ("name", "chain_id") VALUES ('mainnet', 1);

CREATE TABLE "enabled_network" (
  "name" varchar(50) PRIMARY KEY not null,
  "provider_url" varchar(200) not null,
  -- "gas_price_api_key" varchar(100) not null,
);

ALTER TABLE "enabled_network" ADD CONSTRAINT "fk_enabled_network__name" FOREIGN KEY ("network") REFERENCES "network" ("name");

-- can have many providers per network to split the traffic between nodes
CREATE TABLE "enabled_network_nodes" (
  "name" varchar(50) PRIMARY KEY not null,
  "provider_url" varchar(200) not null,
  PRIMARY KEY ("name", "provider_url")
);

ALTER TABLE "enabled_network_nodes" ADD CONSTRAINT "fk_enabled_network_nodes__name" FOREIGN KEY ("enabled_network") REFERENCES "enabled_network" ("name");

CREATE TABLE "relay" (
  "id" uuid PRIMARY KEY not null,
  "name" varchar(50) not null,
  "address" char(42) not null,
  "network" varchar(50) not null,
  "is_deleted" boolean DEFAULT FALSE not null,
  "updated_on" timestamp DEFAULT now() not null,
  "created_at" timestamp DEFAULT now() not null
);

ALTER TABLE "relay" ADD CONSTRAINT "fk_relay__network" FOREIGN KEY ("enabled_network") REFERENCES "enabled_network" ("name");

CREATE TABLE "relay_api_key" (
  "api_key" varchar(500) PRIMARY KEY not null,
  "relay_id" uuid not null,
  "updated_on" timestamp DEFAULT now() not null,
  "created_at" timestamp DEFAULT now() not null
);

ALTER TABLE "relay_api_key" ADD CONSTRAINT "fk_relay_api_key__relay_id" FOREIGN KEY ("relay") REFERENCES "relay" ("id");

CREATE TABLE "relay_whitelisted_contracts" (
  "address" char(42) not null,
  "relay_id" uuid not null,
  "updated_on" timestamp DEFAULT now() not null,
  "created_at" timestamp DEFAULT now() not null,
   PRIMARY KEY ("address", "relay_id")
);

ALTER TABLE "relay_whitelisted_contracts" ADD CONSTRAINT "fk_relay_whitelisted_contracts__relay_id" FOREIGN KEY ("relay") REFERENCES "relay" ("id");

CREATE TABLE "relay_settings" (
  "relay_id" uuid PRIMARY KEY not null,
  "max_gas_price_cap" varchar(100) null,
  "paused" boolean DEFAULT false not null,
  "eip_1559_enabled" boolean DEFAULT false not null,
  "updated_on" timestamp DEFAULT now() not null,
);

ALTER TABLE "relay_settings" ADD CONSTRAINT "fk_relay_settings__relay_id" FOREIGN KEY ("relay") REFERENCES "relay" ("id");

CREATE TABLE "relay_speed" (
   "name" varchar(50) PRIMARY KEY not null
);

INSERT INTO "relay_speed" ("name") VALUES ('SUPER'), ('FAST'), ('MEDIUM'), ('SLOW'), ('VERY_SLOW');

CREATE TABLE "relay_tx_status" (
   "status" varchar(50) PRIMARY KEY not null
);

INSERT INTO "relay_tx_status" ("status") VALUES ('pending'), ('sent'), ('submitted'), ('inmempool'), ('mined'), ('confirmed'), ('failed');

CREATE TABLE "relay_tx_pending" (
  "tx_id" uuid PRIMARY KEY not null,
  "relay_id" uuid not null,
  "tx_hash" char(66) null,
  "to" char(42) not null,
  "nonce" bigint not null,
  "data" varchar(3000) not null,
  "value" varchar(66) not null,
  "gas_price" varchar(66) not null,
  "gas_limit" varchar(66) not null,
  "tx_sent_at" timestamp not null,
  "expiration_time" timestamp not null,
  "speed" varchar(30) not null,
  "status" varchar(50) not null,
  "created_at" timestamp DEFAULT now() not null,
  "updated_on" timestamp DEFAULT now() not null
);

ALTER TABLE "relay_tx_pending" ADD CONSTRAINT "fk_relay_tx_pending__relay_id" FOREIGN KEY ("relay") REFERENCES "relay" ("id");
ALTER TABLE "relay_tx_pending" ADD CONSTRAINT "fk_relay_tx_pending__speed" FOREIGN KEY ("relay_speed") REFERENCES "relay_speed" ("name");
ALTER TABLE "relay_tx_pending" ADD CONSTRAINT "fk_relay_tx_pending__status" FOREIGN KEY ("relay_tx_status") REFERENCES "relay_tx_status" ("name");

CREATE TABLE "relay_tx_pending_audit_log" (
  "tx_id" uuid PRIMARY KEY not null,
  "relay_id" uuid not null,
  "tx_hash" char(66) null,
  "to" char(42) not null,
  "nonce" bigint not null,
  "data" varchar(3000) not null,
  "value" varchar(66) not null,
  "gas_price" varchar(66) not null,
  "gas_limit" varchar(66) not null,
  "expiration_time" timestamp not null,
  "speed" varchar(30) not null,
  "status" varchar(50) not null,
  "created_at" timestamp DEFAULT now() not null
);

ALTER TABLE "relay_tx_pending_audit_log" ADD CONSTRAINT "fk_relay_tx_pending_audit_log__relay_id" FOREIGN KEY ("relay") REFERENCES "relay" ("id");
ALTER TABLE "relay_tx_pending_audit_log" ADD CONSTRAINT "fk_relay_tx_pending_audit_log__speed" FOREIGN KEY ("relay_speed") REFERENCES "relay_speed" ("name");
ALTER TABLE "relay_tx_pending_audit_log" ADD CONSTRAINT "fk_relay_tx_pending_audit_log__status" FOREIGN KEY ("relay_tx_status") REFERENCES "relay_tx_status" ("name");

CREATE TABLE "relay_tx_completed" (
  "tx_id" uuid PRIMARY KEY not null,
  "relay_id" uuid not null,
  "to" char(42) not null,
  "nonce" bigint not null,
  "data" varchar(3000) not null,
  "value" varchar(66) not null,
  "gas_price" varchar(66) not null,
  "gas_limit" varchar(66) not null,
  "tx_index" int not null,
  "block_hash" char(66) not null,
  "block_number" bigint not null,
  "gas_used" varchar(66) not null,
  "status" boolean not null,
  "expiration_time" timestamp not null,
  "speed" varchar(30) not null,
  "status" varchar(50) not null,
  "date_completed" timestamp not null,
  "created_at" timestamp DEFAULT now() not null
);

ALTER TABLE "relay_tx_completed" ADD CONSTRAINT "fk_relay_tx_completed__relay_id" FOREIGN KEY ("relay") REFERENCES "relay" ("id");
ALTER TABLE "relay_tx_completed" ADD CONSTRAINT "fk_relay_tx_completed__speed" FOREIGN KEY ("relay_speed") REFERENCES "relay_speed" ("name");
ALTER TABLE "relay_tx_completed" ADD CONSTRAINT "fk_relay_tx_completed__status" FOREIGN KEY ("relay_tx_status") REFERENCES "relay_tx_status" ("name");

