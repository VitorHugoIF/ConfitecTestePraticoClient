export class User {
  id?: number;
  nome?: string
  sobrenome?: string
  email?: string
  dataNascimento: string;
  escolaridade: number;

  constructor(init?: Partial<User>) {
    if (init?.id) this.id = init?.id;
    if (init?.nome) this.nome = init?.nome;
    if (init?.sobrenome) this.sobrenome = init?.sobrenome;
    if (init?.email) this.email = init?.email;
    if (init?.dataNascimento) this.dataNascimento = init?.dataNascimento;
    if (init?.escolaridade) this.escolaridade = init?.escolaridade;
  }
}
