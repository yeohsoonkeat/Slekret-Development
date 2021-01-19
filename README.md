docker-compose down --volumes  
docker exec -i slekret-development_postgres_1 psql -U postgres -d postgres < ./path_file.sql
docker exec -i container_name pg_dump -U postgres db_name > path_file.sql

Refactor

- [x] register
- [x] verify
- [ ] Refactor UI register
