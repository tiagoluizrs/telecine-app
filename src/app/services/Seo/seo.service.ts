import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  users: any;

  constructor(private meta: Meta) {
    
  }

  getMetaTags(tag_name: string) {
    let els: HTMLMetaElement[];

    try {
      els = this.meta.getTags(tag_name);
      return els;
    } catch (error) {
      console.log(`[[SeoService | getMetaTags]] >> Um erro ocorreu durante a criação das meta tags. Descrição do erro: ${error}`);
      return {
        'name': undefined,
        'content': undefined
      }
    }
  } 

  setMetaTag(data: any, force: boolean){
    try {
      this.meta.addTags(data, force);
    } catch (error) {
      console.log(`[[SeoService | setMetaTag]] >> Um erro ocorreu durante a criação das meta tags. Descrição do erro: ${error}`);
    } 
  }

  updateMetaTags(data: any){
    try {
      this.meta.updateTag(data);
    } catch (error) {
      console.log(`[[SeoService | updateMetaTags]] >> Um erro ocorreu durante a atualização da meta tag '${data.name}'. Descrição do erro: ${error}`);
    } 
  }

  removeMetaTags(meta_tag: string) {
    try {
      this.meta.removeTag(`name = "${meta_tag}"`);
    } catch (error) {
      console.log(`[[SeoService | removeMetaTags]] >> Um erro ocorreu durante a remoção da meta tag '${meta_tag}'. Descrição do erro: ${error}`);
    } 
  } 
}
