# Banco de dados Arkiv — alinhamento ao DER

## Tabelas mapeadas
| Tabela | Modelo Django |
|---|---|
| usuarios | authentication.Usuario |
| planos | planos.Plano |
| modulos | planos.Modulo |
| avaliacoes | planos.Avaliacao |
| comentarios | planos.Comentario |
| planos_andamento | planos.PlanoAndamento |
| planos_criados | planos.PlanoCriado |
| planos_salvos | planos.PlanoSalvo |
| tags | planos.Tag |
| plano_tags | planos.PlanoTag |

As FKs usam os nomes de coluna representados no diagrama: `id_autor`,
`id_usuario`, `id_plano`, `usuario_id`, `plano_id` e `id_tag`.

`usuarios.password_hash` foi incluída por necessidade de autenticação. O campo
guarda hash produzido pelo sistema de autenticação do Django, nunca senha pura.

As entidades `Capitulo`, `Conteudo` e `ProgressoConteudo` foram retiradas porque
não aparecem no DER fornecido. O andamento agora é registrado por plano na
tabela `planos_andamento`.
