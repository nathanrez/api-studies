# Metodos HTTP mais comuns:
# GET    -> Retorna dados
# POST   -> Insere dados
# PUT    -> Atualiza completamente um recurso
# PATCH  -> Atualiza parcialmente um recurso

import requests  # Biblioteca para fazer requisicoes HTTP em Python


# Funcao para buscar dados de uma API
def fetch_data(endpoint, filters=None):
    
    # Evita usar objeto mutavel como valor padrao
    # Se filters nao for passado, inicializa como dicionario vazio
    if filters is None:
        filters = {}

    # Monta a URL base + endpoint dinamico
    # Exemplo final: https://rickandmortyapi.com/api/character
    url = f"https://rickandmortyapi.com/api/{endpoint}"

    # Faz requisicao GET
    # params=filters adiciona query params automaticamente na URL
    # Exemplo: ?name=Rick
    response = requests.get(url, params=filters)

    # Verifica se a resposta foi bem-sucedida (status code 200)
    # Se for 200, retorna os dados convertidos para JSON
    # Caso contrario, retorna None
    return response.json() if response.status_code == 200 else None


# Chamando a funcao:
# endpoint = "character"
# filtro = {'name': 'Rick'}  -> vira ?name=Rick
characters = fetch_data("character", {'name': 'Rick'})


# Verifica se houve retorno valido
if characters:
    print(characters)
else:
    print('Failed to fetch data')


# Apenas imprimindo novamente para visualizar o conteudo
print(characters)


# Query Params:
# Sao parametros adicionados na URL apos o ?
# Exemplo:
# /character?name=Rick&status=alive
#
# No requests, usamos:
# requests.get(url, params={'name': 'Rick'})
# Ele monta a URL automaticamente.
