pg_dump.exe -U postgres -h localhost -p 54321 -n public --data-only --column-inserts med_track > "src/main/resources/backup/backup_data.sql"
