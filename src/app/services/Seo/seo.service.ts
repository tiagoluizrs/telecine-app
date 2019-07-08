import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private meta: Meta,
    private titleService: Title
    ) {
    }
  
  // Método que serve para adicionar o título de página html
  setTitlePage(title: string): void{
    this.titleService.setTitle(title)
  }

  // Método para pegar uma metatag pelo seu nome
  getMetaTags(tag_name: string) {
    let els: HTMLMetaElement[];

    try {
      els = this.meta.getTags(tag_name);
      return els;
    } catch (error) {
      console.log(`[[SeoService | getMetaTags]] >> Um erro ocorreu durante o get da tag ${tag_name}. Descrição do erro: ${error}`);
      return {
        'name': undefined,
        'content': undefined
      }
    }
  } 

  /* Método para criar uma ou mais metatags
    Passe um array com os objetos json desejados no parâmetro data. Force forçará a criação da metatag.
    
    Exemplos:
    data = [
      {httpEquiv: 'value', content: 'value'}
      {property: 'value', content: 'value'}
      {name: 'value', content: 'value'}
    ]
  */
  setMetaTag(data: any, force: boolean): void{
    try {
      this.meta.addTags(data, force);
    } catch (error) {
      console.log(`[[SeoService | setMetaTag]] >> Um erro ocorreu durante a criação das meta tags. Descrição do erro: ${error}`);
    } 
  }

  /* Método para atualizar uma ou mais metatags
    Passe o objeto json que deseje atualizar no parâmetro data. 
    Se alguma metatag não existir, a mesma será criada.
    
    Exemplos:
    data = [
      {httpEquiv: 'value', content: 'value'}
      {property: 'value', content: 'value'}
      {name: 'value', content: 'value'}
    ]
  */
  updateMetaTags(data: any): void{
    try {
      this.meta.updateTag(data);
    } catch (error) {
      console.log(`[[SeoService | updateMetaTags]] >> Um erro ocorreu durante a atualização da meta tag '${data.name}'. Descrição do erro: ${error}`);
    } 
  }

  /* Método para remover uma metatag
    Passe o nome da chave dessa metatag. 
  */
  removeMetaTags(meta_tag: string): void{
    try {
      this.meta.removeTag(`name = "${meta_tag}"`);
    } catch (error) {
      console.log(`[[SeoService | removeMetaTags]] >> Um erro ocorreu durante a remoção da meta tag '${meta_tag}'. Descrição do erro: ${error}`);
    } 
  } 
}
