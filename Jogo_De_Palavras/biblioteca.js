

var bibliotecaPalavras = {
    animais: [
      'elefante',
      'girafa',
      'leão',
      'tigre',
      'macaco',
      'cobra',
      'gato',
      'cachorro',
      'pássaro',
      'peixe'
    ],
    transportes: [
      'carro',
      'ônibus',
      'bicicleta',
      'avião',
      'navio',
      'trem',
      'moto',
      'caminhão',
      'helicóptero',
      'barco'
    ],
    frutas: [
      'maçã',
      'banana',
      'laranja',
      'uva',
      'abacaxi',
      'morango',
      'melancia',
      'pera',
      'kiwi',
      'manga'
    ],
  };


  function obterCategoriaAleatoria() {
    const categorias = Object.keys(bibliotecaPalavras);
    const indiceAleatorio = Math.floor(Math.random() * categorias.length);
    return categorias[indiceAleatorio];
  }

  function obterPalavraAleatoria(categoria) {
    const listaPalavras = bibliotecaPalavras[categoria];
    if (!listaPalavras) {
      console.error(`Categoria '${categoria}' não encontrada na biblioteca.`);
      return null;
    }
    
    const indiceAleatorio = Math.floor(Math.random() * listaPalavras.length);
    return listaPalavras[indiceAleatorio];
  }

  const categoriaEscolhida = obterCategoriaAleatoria();
  const palavraEscolhida = obterPalavraAleatoria(categoriaEscolhida);

  if (palavraEscolhida !== null) {
    const tituloCategoria = document.getElementById('categoria-titulo');
    tituloCategoria.textContent = `Categoria: ${categoriaEscolhida}`;
    
    const tituloPalavra = document.getElementById('palavra-titulo');
    tituloPalavra.textContent = `Palavra: ${palavraEscolhida}`;

    document.title = `Jogo de Palavras - Categoria: ${categoriaEscolhida} - Palavra: ${palavraEscolhida}`;
  }