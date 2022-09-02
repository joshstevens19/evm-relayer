FROM flyway/flyway:6.3.1

COPY /server/migrations/* /flyway/sql/

CMD ["-X", "migrate", "-baselineOnMigrate=false"]
