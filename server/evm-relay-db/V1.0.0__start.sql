CREATE TABLE "network" (
  "name" varchar(50) PRIMARY KEY not null,
  "chain_id" int not null
);

ALTER TABLE "network" ADD CONSTRAINT network_chain_id UNIQUE (chain_id);

-- TODO add some more!
INSERT INTO "network" ("name", "chain_id") VALUES ('POLYGON', 137), ('MUMBAI', 80001);

CREATE TABLE "enabled_network" (
  "name" varchar(50) PRIMARY KEY not null,
  "disabled" boolean DEFAULT FALSE not null,
  "updated_on" timestamp DEFAULT NOW() not null,
  "created_at" timestamp DEFAULT NOW() not null
);

ALTER TABLE "enabled_network" ADD CONSTRAINT "fk_enabled_network__name" FOREIGN KEY ("name") REFERENCES "network" ("name");

-- can have many providers per network to split the traffic between nodes
CREATE TABLE "enabled_network_nodes" (
  "name" varchar(50) not null,
  "provider_url" varchar(200) not null,
  "created_at" timestamp DEFAULT NOW() not null,
  PRIMARY KEY ("name", "provider_url")
);

ALTER TABLE "enabled_network_nodes" ADD CONSTRAINT "fk_enabled_network_nodes__name" FOREIGN KEY ("name") REFERENCES "enabled_network" ("name");

CREATE TABLE "relay_speed" (
   "name" varchar(50) PRIMARY KEY not null
);

INSERT INTO "relay_speed" ("name") VALUES ('SUPER'), ('FAST'), ('MEDIUM'), ('SLOW'), ('VERY_SLOW');

CREATE TABLE "relay" (
  "id" uuid PRIMARY KEY not null,
  "name" varchar(50) not null,
  "address" char(42) not null,
  "network" varchar(50) not null,
  "speed" varchar(50) not null,
  "max_gas_price_cap" varchar(100) null,
  "paused" boolean DEFAULT false not null,
  "eip_1559_enabled" boolean DEFAULT false not null,
  "deleted" boolean DEFAULT FALSE not null,
  "updated_on" timestamp DEFAULT NOW() not null,
  "created_at" timestamp DEFAULT NOW() not null
);

ALTER TABLE "relay" ADD CONSTRAINT "fk_relay__network" FOREIGN KEY ("name") REFERENCES "enabled_network" ("name");
ALTER TABLE "relay" ADD CONSTRAINT "fk_relay__speed" FOREIGN KEY ("speed") REFERENCES "relay_speed" ("name");

CREATE TABLE "relay_audit_log" (
  "id" uuid not null,
  "name" varchar(50) not null,
  "address" char(42) not null,
  "network" varchar(50) not null,
  "speed" varchar(50) not null,
  "max_gas_price_cap" varchar(50) null,
  "paused" boolean DEFAULT false not null,
  "eip_1559_enabled" boolean DEFAULT false not null,
  "deleted" boolean DEFAULT FALSE not null,
  "created_at" timestamp DEFAULT NOW() not null
);

CREATE OR REPLACE FUNCTION relay_change()
  RETURNS trigger AS
$$
BEGIN
     INSERT INTO relay_audit_log(id, name, address, network, speed, max_gas_price_cap, paused, eip_1559_enabled, deleted)
      VALUES (NEW.id, NEW.name, NEW.address, NEW.network, NEW.speed, NEW.max_gas_price_cap, NEW.paused, NEW.eip_1559_enabled, NEW.deleted);

    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER insert_relay
  AFTER INSERT
  ON relay
  FOR EACH ROW
  EXECUTE PROCEDURE relay_change();

CREATE TRIGGER update_relay
  AFTER UPDATE
  ON relay
  FOR EACH ROW
  EXECUTE PROCEDURE relay_change();

CREATE TABLE "relay_api_key" (
  "api_key" char(32) PRIMARY KEY not null,
  "relay_id" uuid not null,
  "deleted" boolean DEFAULT FALSE not null,
  "created_at" timestamp DEFAULT NOW() not null
);

ALTER TABLE "relay_api_key" ADD CONSTRAINT "fk_relay_api_key__relay_id" FOREIGN KEY ("relay_id") REFERENCES "relay" ("id");

CREATE TABLE "relay_whitelisted_address" (
  "address" char(42) not null,
  "relay_id" uuid not null,
  "created_at" timestamp DEFAULT NOW() not null,
   PRIMARY KEY ("address", "relay_id")
);

ALTER TABLE "relay_whitelisted_address" ADD CONSTRAINT "fk_relay_whitelisted_address__relay_id" FOREIGN KEY ("relay_id") REFERENCES "relay" ("id");

CREATE TABLE "relay_tx_status" (
   "status" varchar(50) PRIMARY KEY not null
);

INSERT INTO "relay_tx_status" ("status") VALUES ('PENDING'), ('SENT'), ('SUBMITTED'), ('INMEMPOOL'), ('MINED'), ('CONFIRMED'), ('FAILED');

CREATE TABLE "relay_tx_pending" (
  "tx_id" uuid PRIMARY KEY not null,
  "relay_id" uuid not null,
  "api_key" char(32) not null,
  "tx_hash" char(66) null,
  "to" char(42) not null,
  "nonce" bigint not null,
  "data" varchar(3000) not null,
  "value" varchar(66) not null,
  "gas_price" varchar(66) null,
  "max_priority_fee_per_gas" number null,
  "max_fee_per_gas" number null,
  "gas_limit" varchar(66) not null,
  "expiration_time" timestamp not null,
  "speed" varchar(30) not null,
  "tx_status" varchar(50) not null,
  "tx_sent_at" timestamp not null,
  "created_at" timestamp DEFAULT NOW() not null,
  "updated_on" timestamp DEFAULT NOW() not null
);

ALTER TABLE "relay_tx_pending" ADD CONSTRAINT "fk_relay_tx_pending__relay_id" FOREIGN KEY ("relay_id") REFERENCES "relay" ("id");
ALTER TABLE "relay_tx_pending" ADD CONSTRAINT "fk_relay_tx_pending__speed" FOREIGN KEY ("speed") REFERENCES "relay_speed" ("name");
ALTER TABLE "relay_tx_pending" ADD CONSTRAINT "fk_relay_tx_pending__status" FOREIGN KEY ("tx_status") REFERENCES "relay_tx_status" ("status");

CREATE TABLE "relay_tx_pending_audit_log" (
  "tx_id" uuid PRIMARY KEY not null,
  "relay_id" uuid not null,
  "api_key" char(32) not null,
  "tx_hash" char(66) null,
  "to" char(42) not null,
  "nonce" bigint not null,
  "data" varchar(3000) not null,
  "value" varchar(66) not null,
  "gas_price" varchar(66) null,
  "max_priority_fee_per_gas" number null,
  "max_fee_per_gas" number null,
  "gas_limit" varchar(66) not null,
  "expiration_time" timestamp not null,
  "speed" varchar(30) not null,
  "tx_status" varchar(50) not null,
  "tx_sent_at" timestamp not null,
  "created_at" timestamp DEFAULT NOW() not null
);

ALTER TABLE "relay_tx_pending_audit_log" ADD CONSTRAINT "fk_relay_tx_pending_audit_log__relay_id" FOREIGN KEY ("relay_id") REFERENCES "relay" ("id");
ALTER TABLE "relay_tx_pending_audit_log" ADD CONSTRAINT "fk_relay_tx_pending_audit_log__speed" FOREIGN KEY ("speed") REFERENCES "relay_speed" ("name");
ALTER TABLE "relay_tx_pending_audit_log" ADD CONSTRAINT "fk_relay_tx_pending_audit_log__status" FOREIGN KEY ("tx_status") REFERENCES "relay_tx_status" ("status");

CREATE OR REPLACE FUNCTION relay_tx_change()
  RETURNS trigger AS
$$
BEGIN
      INSERT INTO relay_tx_pending_audit_log(tx_id, relay_id, api_key, tx_hash, to, nonce, data, value, gas_price, max_priority_fee_per_gas, max_fee_per_gas, gas_limit, expiration_time, speed, tx_status, tx_sent_at)
      VALUES (NEW.tx_id, NEW.relay_id, NEW.api_key, NEW.tx_hash, NEW.to, NEW.nonce, NEW.data, NEW.value, NEW.gas_price, NEW.max_priority_fee_per_gas, NEW.max_fee_per_gas, NEW.gas_limit, NEW.expiration_time, NEW.speed, NEW.tx_status, NEW.tx_sent_at);

    RETURN NEW;
END;
$$
LANGUAGE 'plpgsql';

CREATE TRIGGER insert_relay_tx
  AFTER INSERT
  ON relay
  FOR EACH ROW
  EXECUTE PROCEDURE relay_tx_change();

CREATE TRIGGER update_relay_tx
  AFTER UPDATE
  ON relay
  FOR EACH ROW
  EXECUTE PROCEDURE relay_tx_change();


CREATE TABLE "relay_tx_completed" (
  "tx_id" uuid PRIMARY KEY not null,
  "relay_id" uuid not null,
  "to" char(42) not null,
  "nonce" bigint not null,
  "data" varchar(3000) not null,
  "value" varchar(66) not null,
  "gas_price" varchar(66) not null,
  "max_priority_fee_per_gas" number null,
  "max_fee_per_gas" number null,
  "gas_limit" varchar(66) not null,
  "tx_index" int not null,
  "block_hash" char(66) not null,
  "block_number" bigint not null,
  "gas_used" varchar(66) not null,
  "status" boolean not null,
  "expiration_time" timestamp not null,
  "speed" varchar(30) not null,
  "tx_status" varchar(50) not null,
  "tx_sent_at" timestamp not null,
  "tx_completed_at" timestamp not null,
  "date_completed" timestamp not null,
  "created_at" timestamp DEFAULT NOW() not null
);

ALTER TABLE "relay_tx_completed" ADD CONSTRAINT "fk_relay_tx_completed__relay_id" FOREIGN KEY ("relay_id") REFERENCES "relay" ("id");
ALTER TABLE "relay_tx_completed" ADD CONSTRAINT "fk_relay_tx_completed__speed" FOREIGN KEY ("speed") REFERENCES "relay_speed" ("name");
ALTER TABLE "relay_tx_completed" ADD CONSTRAINT "fk_relay_tx_completed__status" FOREIGN KEY ("tx_status") REFERENCES "relay_tx_status" ("status");

