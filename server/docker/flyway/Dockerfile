FROM flyway/flyway:6.3.1

COPY /server/evm-relay-db/* /flyway/sql/

CMD ["-X", "migrate", "-baselineOnMigrate=false"]
