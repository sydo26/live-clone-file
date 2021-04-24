# live-clone-file

O `live-clone-file` copia um determinado arquivo e cria a cópia do arquivo em um determinado diretório. O pacote é experimental, fiz apenas para quebrar um galho pois estava precisando aqui.

## Instalação

`npm install -g @sydo26/live-clone-file`

ou

`yarn global add @sydo26/live-clone-file`

### Argumentos

<table>
    <thead>
        <th># Argumento</th>
        <th># Descrição</th>
    </thead>
    <tbody>
        <tr>
            <td>
                --path ou -p
            </td>
            <td>
                Define o arquivo que irá ser escutado. Obrigatório!
            </td>
        </tr>
        <tr>
            <td>
                --clone ou -c
            </td>
            <td>
                Define o local onde o arquivo clonado será salvado. Obrigatório!
            </td>
        </tr>
        <tr>
            <td>
                --config
            </td>
            <td>
                Define o nome da configuração a ser usada. O padrão é criar uma nova configuração.
            </td>
        </tr>
        <tr>
            <td>
                --no-save
            </td>
            <td>
                Não cria uma nova configuração.
            </td>
        </tr>
        <tr>
            <td>
                --configs
            </td>
            <td>
                Mostra a lista de todas as configurações salvas.
            </td>
        </tr>
    </tbody>
</table>

### Utilização

Caso não queira utilizar os argumentos, basta digitar `livecf` que já irá funcionar, porém será necessário responder aos inputs.

Ex:

```
~ $ livecf

? Qual configuração você deseja usar? Criar nova configuração
? Qual o arquivo que você deseja escutar? ex.txt
? Qual o diretório que você deseja salvar a cópia do arquivo? ex2.txt

Escutando: C:\Users\sydo26\ex.txt

Copiando para: C:\Users\sydo26\ex2.txt
```

Utilizando os argumentos:

```
~ $ livecf -p ex.txt -c ex2.txt

Escutando: C:\Users\sydo26\ex.txt

Copiando para: C:\Users\sydo26\ex2.txt
```

## Créditos

[GITHUB](https://github.com/sydo26)
