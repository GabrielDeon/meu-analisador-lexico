import React from 'react'
import './LexicalGrid.css'

const ALFABETO = 'abcdefghijklmnopqrstuvwxyz'.split('')

const LexicalGrid = ({ analisador, caminho }) => {
  const dadosGrelha = analisador.obterNosPorNivel()

  const marcacoesAtivas = {}
  caminho.forEach((etapa, indice) => {
    const nivel = etapa.no?.nivel ?? indice // se não houver nó, use a posição da letra
    const chave = `${nivel}-${etapa.letra}`
    marcacoesAtivas[chave] = etapa.valido ? 'valida' : 'invalida'
  })

  const maiorNivel = Math.max(...Object.keys(dadosGrelha).map(Number), 0)

  return (
    <div className="lexical-grid">
      <table>
        <thead>
          <tr>
            <th>qN</th>
            {ALFABETO.map((letra) => (
              <th key={letra}>{letra.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: maiorNivel + 1 }).map((_, nivel) => (
            <tr key={nivel}>
              <td><strong>q{nivel}</strong></td>
              {ALFABETO.map((letra) => {
                const nos = dadosGrelha?.[nivel]?.[letra] || []
                const chaveCelula = `${nivel}-${letra}`

                let classeCelula = ''
                if (marcacoesAtivas[chaveCelula] === 'valida') classeCelula = 'valida'
                else if (marcacoesAtivas[chaveCelula] === 'invalida') classeCelula = 'invalida'

                return (
                  <td key={letra} className={classeCelula}>
                    {nos.map((n) => n.id).join(', ')}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LexicalGrid
