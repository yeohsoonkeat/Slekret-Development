docker-compose down --volumes  
docker exec -i slekret-development_postgres_1 psql -U postgres -d postgres < ./path_file.sql
docker exec -i slekret-development_postgres_1 pg_dump -U postgres postgres > path_file.sql

[ ] login with github
[ ] store img,id,
[ ] send token,img,id back to front-end
