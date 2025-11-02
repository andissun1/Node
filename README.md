# Приложение для сбора заявок

> Приложение на React, Node, MongoDB для демонстрации навыков работы с бэкендом

## Настрйка

Перед запуском необходимо создать контейнер с БД.  

Команда для быстрого запуска контейнера: 
```bash
docker run -d \
  --name mongo \
  -p 27017:27017 \
  -v mongo_data:/data/db \
  -e MONGO_INITDB_DATABASE=testdb \
  -e MONGO_INITDB_ROOT_USERNAME=user \
  -e MONGO_INITDB_ROOT_PASSWORD=mongopass \
  mongo:latest
```
Можно устанавливать завсимости. Будет удобно настроить два терминала для фронта и бэка.
Выбираем фронт: 
```bash
cd client
npm install
npm run dev
```

Выбираем бэк: 
```bash
cd server
npm install
nodemon app
```
Можно проверить приложение на http://localhost:5173 

Поздравляю, всё готово к работе 🎉
