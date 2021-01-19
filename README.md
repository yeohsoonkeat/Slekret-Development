docker-compose down --volumes

# Generate dump data file to database

docker exec -i slekret-development_postgres_1 psql -U postgres -d postgres < ./path_file.sql

# Generate dump data from database to file path_file.sql

docker exec -i container_name pg_dump -U postgres db_name > path_file.sql
