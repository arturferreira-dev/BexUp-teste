# Comandos para rodar via docker
docker build -t app .
docker run -dp --name app 3000:3000 app

- Obs: não ta com volumes criados - a cada modificação tem que refazer o build

# Para executar fora do docker

yarn -> para instalação das dependencias
yarn dev -> para executar o ambiente de dev