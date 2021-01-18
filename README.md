docker-compose down --volumes  
docker exec -i slekret-development_postgres_1 psql -U postgres -d postgres < ./path_file.sql
docker exec -i container_name pg_dump -U postgres db_name > path_file.sql

[ ] login with github
[ ] store img,id,
[ ] send token,img,id back to front-end
